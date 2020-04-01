// 统一请求路径前缀在libs/axios.js中修改
import { downloadRequest, getRequest, postRequest, putRequest, deleteRequest, importRequest, getRequestWithNoToken } from '../libs/axios';

/**
 * 网盘API
 * /setting/
 */

// 分页获取文件数据
export const getFileListData = (params) => {
    return getRequest('/file/getByCondition', params)
}
// 复制文件
export const copyFile = (params) => {
    return postRequest('/file/copy', params)
}
// 重命名文件
export const renameFile = (params) => {
    return postRequest('/file/rename', params)
}
// 删除文件
export const deleteFile = (ids, params) => {
    return deleteRequest(`/file/delete/${ids}`, params)
}
// 下载文件
export const aliDownloadFile = (fKey, params) => {
    return getRequest(`/file/ali/download/${fKey}`, params)
}

// 获取MINIO配置
export const getMinioSetting = (serviceName, accessToken, params) => {
    return getRequest(`/setting/oss/${serviceName}`, accessToken, params)
}
// 获取用户网盘分配及使用情况
export const getUserNetdiskInfo = (accessToken) => {
    return getRequest('/oh/netdisk/user/size', accessToken)
}
// 获取左侧目录树，默认只过去2级
export const getNetdiskAllDir = (accessToken, params) => {
    return getRequest('/oh/netdisk/left/list', accessToken, params)
}
// 获取指定目录id下的子目录
export const getNetdiskSubDir = (fid, accessToken, params) => {
    return getRequest(`/oh/netdisk/${fid}/dir`, accessToken, params)
}
// 获取当前目录的全路径
export const getNetdiskFolderFullpath = (fid, accessToken) => {
    return getRequest(`/oh/netdisk/${fid}/fullpath`, accessToken)
}
//创建文件夹目录
export const addNetdiskFolder = (parentId, accessToken, params) => {
    return postRequest(`/oh/netdisk/${parentId}/dir`, accessToken, params)
}
//编辑目录
export const editNetdiskFolder = (fid, accessToken, params) => {
    return putRequest(`/oh/netdisk/dir/${fid}`, accessToken, params)
}
// 创建在线文档
export const addNetdiskOnlineDoc = (accessToken, params) => {
    return postRequest('/oh/netdisk/md', accessToken, params)
}

//获取指定目录信息
export const getNetdiskFolderInfo = (fid, accessToken) => {
    return getRequest(`/oh/netdisk/dir/info/${fid}`, accessToken)
}
// 分页获取网盘指定目录下文件列表
export const getNetdiskListData = (fid, accessToken, params) => {
    return getRequest(`/oh/netdisk/${fid}/list`, accessToken, params)
}

// 回收站列表（分页）
export const getShareList = (accessToken, params) => {
    console.log(params);
    return getRequest('/oh/netdisk/share/my/list', accessToken, params)
}
// 创建分享
export const addNetdiskShare = (accessToken, params) => {
    return postRequest('/oh/netdisk/share/add', accessToken, params)
}
// 提取文件
export const fetchNetdiskShare = (params) => {
    return postRequest('/oh/netdisk/share/search/verify', params)
}
// 提取分享文件列表
export const fetchNetdiskShareFile = (sid, params) => {
    return getRequest(`/oh/netdisk/share/${sid}/search`, params)
}
// 分享下载
export const downloadNetdiskShareFile = (sid, params) => {
    return getRequest(`/oh/netdisk/share/download/${sid}`, params)
}
// 取消分享
export const deleteNetdiskShare = (accessToken, params) => {
    return deleteRequest('/oh/netdisk/share/delete', accessToken, params)
}

// 预览
export const previewNetdiskFile = (fid, accessToken) => {
    return getRequest(`/oh/netdisk/preview/${fid}`, accessToken)
}
// 下载
export const downloadNetdiskFile = (fid, accessToken) => {
    return getRequest(`/oh/netdisk/download/${fid}`, accessToken)
}
// 删除文件
export const deleteNetdiskFile = (fids, accessToken, params) => {
    return deleteRequest(`/oh/netdisk/file/${fids}`, accessToken, params)
}

// 回收站列表（分页）
export const getRecycleList = (accessToken, params) => {
    console.log(params);
    return getRequest('/oh/netdisk/recycle/files', accessToken, params)
}
// 回收站彻底删除文件或者目录
export const deleteRecycleFile = (fids, accessToken, params) => {
    return deleteRequest(`/oh/netdisk/recycle/file/${fids}`, accessToken, params)
}
// 回收站还原文件或者目录
export const restoreRecycleFile = (fids, accessToken, params) => {
    return putRequest(`/oh/netdisk/restore/files/${fids}`, accessToken, params)
}
// 清空回收站
export const recycleEmpty = (accessToken) => {
    return deleteRequest('/oh/netdisk/recycle/all', accessToken)
}
// 网盘全文检索
export const netdiskFullTextSearch = (accessToken, params) => {
    return getRequest('/oh/netdisk/es/search', accessToken, params)
}
// 热搜前十位关键字
export const searchHotword = (accessToken) => {
    return getRequest('/oh/netdisk/es/hotword', accessToken)
}