const path = require('path');
const fs = require('fs-extra');
const klaw = require('klaw-sync');
const log4js = require('log4js');
const util = require('../util.js');

import * as Constants from '../../renderer/service/constants';
import brand from '../../renderer/cos/brand';


/**
 *
 * @param localDir       local指定目录
 * @param cloudFiles    待匹配的云存储文件列表
 * @param platformType  platformType    平台名称
 * @param mergeType     mergeType   0：普通 1：以云为基准,本地对应不上的文件会被删除 2：以本地为基准,云对应不上的文件会被删除
 * @returns {Promise<{uploads: Array, downloads: Array}>}
 */
export async function diff(localDir, cloudFiles = [], platformType = brand.qiniu.key, mergeType = 0) {
    log4js.configure({
        appenders: {
            node: {
                type: 'file',
                filename: path.join(localDir, 'diffLog.log')
            }
        },
        categories: {
            "default": {
                appenders: ['node'],
                level: 'all'
            }
        }
    });
    const logger = log4js.getLogger();
    logger.level = 'all';
    let keys = [];

    let uploads = [];
    let downloads = [];
    let deletes = [];

    logger.info('文件夹同步 star');
    logger.info(`同步参数:localDir:${localDir}-platformType:${platformType}-mergeType:${mergeType}`);

    logger.info(`cloud ----> local`);
    for (let file of cloudFiles) {
        let filePath = path.join(localDir, file.key);
        keys.push(file.key);

        if (fs.existsSync(filePath)) {
            let tag = await util.getEtag(filePath, platformType);
            if (tag !== file.ETag) {
                logger.info(`${tag}--${file.ETag}`);
                if (fs.statSync(filePath).mtimeMs > file.putTime) {
                    logger.info('[上传]:本地文件变更,更新云文件', filePath);
                    uploads.push({path: filePath, dir: localDir, key: filePath.replace(localDir + Constants.DELIMITER, '')});
                } else {
                    //filePath移动至 old 文件夹
                    logger.info('[下载]:云文件变更,更新本地文件', file.key);
                    downloads.push(file);
                }
            } else {
                logger.info('[不处理]', file.key);
            }
        } else {
            if (mergeType === Constants.mergeType.coverCloud) {
                logger.info('[删除]:云盘文件未对应本地文件', file.key);
                deletes.push(file);
            } else {
                logger.info('[下载]:本地文件不存在', file.key);
                downloads.push(file);
            }
        }
    }

    logger.info('local ----> cloud');
    let files = klaw(localDir, {
        nodir: true, //return only files
        filter: function (item) {
            return !/\.(log|delete|DS_Store)$/.test(item.path);
        }
    });
    for (let file of files) {
        let _path = util.convertPath(file.path).replace(util.convertPath(localDir) + '/', '');
        if (keys.indexOf(_path) === -1) {
            if (mergeType === Constants.mergeType.coverLocal) {
                logger.info('[删除]:本地文件未对应云盘文件', file.path);
                fs.moveSync(file.path, file.path + '.delete');
            } else {
                logger.info('[上传]:云文件不存在', file.path);
                let path = util.convertPath(file.path);
                let dir = util.convertPath(localDir);
                let key = path.replace(dir + Constants.DELIMITER, '');
                uploads.push({path, dir, key});
            }
        }
    }

    logger.info('文件夹同步 end');
    return {uploads, downloads, deletes, baseDir: localDir};
}
