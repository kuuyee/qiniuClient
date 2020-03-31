// 统一请求路径前缀在libs/axios.js中修改
import { getRequest, postRequest, putRequest, deleteRequest, importRequest, getRequestWithNoToken } from '../libs/axios';

// 文件上传接口
export const uploadFile = "/gomk/upload/file"
// 验证码渲染图片接口
export const drawCodeImage = "http://116.196.76.171/gomk/common/captcha/draw/"
// 获取菜单
export const getMenuList = "/permission/getMenuList"
// 获取数据字典
export const getDictData = "/dictData/getByType/"
// Websocket
export const ws = "/gomk/ws"


// 登陆
export const login = (params) => {
    return postRequest('/login', params)
}
// 获取用户登录信息
export const userInfo = (params) => {
    return getRequest('/user/info', params)
}
// 注册
export const regist = (params) => {
    return postRequest('/user/regist', params)
}
// 初始化验证码
export const initCaptcha = (params) => {
    return getRequestWithNoToken('/common/captcha/init', params)
}
// 发送登录短信验证码
export const sendLoginSms = (mobile, params) => {
    return getRequest(`/common/captcha/sendLoginSms/${mobile}`, params)
}
// 发送注册短信验证码
export const sendRegistSms = (mobile, params) => {
    return getRequest(`/common/captcha/sendRegistSms/${mobile}`, params)
}
// 发送重置密码短信验证码
export const sendResetSms = (mobile, params) => {
    return getRequest(`/common/captcha/sendResetSms/${mobile}`, params)
}
// 发送修改绑定手机短信验证码
export const sendEditMobileSms = (mobile, params) => {
    return getRequest(`/common/captcha/sendEditMobileSms/${mobile}`, params)
}
// 通过手机重置密码
export const resetByMobile = (params) => {
    return postRequest('/user/resetByMobile', params)
}
// 发送重置密码邮件验证码
export const sendResetEmail = (email, params) => {
    return getRequest(`/email/sendResetCode/${email}`, params)
}
// 发送修改绑定邮件验证码
export const sendEditEmail = (email, params) => {
    return getRequest(`/email/sendEditCode/${email}`, params)
}
// 通过邮件重置密码
export const resetByEmail = (params) => {
    return postRequest('/email/resetByEmail', params)
}
// 短信验证码登录
export const smsLogin = (params) => {
    return postRequest('/user/smsLogin', params)
}
// IP天气信息
export const ipInfo = (params) => {
    return getRequest('/common/ip/info', params)
}
// 个人中心编辑
export const userInfoEdit = (params) => {
    return postRequest('/user/edit', params)
}
// 个人中心发送修改邮箱验证邮件
export const sendCodeEmail = (email, params) => {
    return getRequest(`/email/sendCode/${email}`, params)
}
// 个人中心发送修改邮箱验证邮件
export const editEmail = (params) => {
    return postRequest('/email/editEmail', params)
}
// 个人中心修改密码
export const changePass = (params) => {
    return postRequest('/user/modifyPass', params)
}
// 个人中心修改手机
export const changeMobile = (params) => {
    return postRequest('/user/changeMobile', params)
}
// 解锁
export const unlock = (params) => {
    return postRequest('/user/unlock', params)
}


// github登录
export const githubLogin = (params) => {
    return getRequestWithNoToken('/social/github/login', params)
}
// qq登录
export const qqLogin = (params) => {
    return getRequestWithNoToken('/social/qq/login', params)
}
// 微博登录
export const weiboLogin = (params) => {
    return getRequestWithNoToken('/social/weibo/login', params)
}
// 微信登录
export const wechatLogin = (params) => {
    return getRequestWithNoToken('/social/wechat/login', params)
}
// 绑定账号
export const relate = (params) => {
    return postRequest('/social/relate', params)
}
// 获取JWT
export const getJWT = (params) => {
    return getRequest('/social/getJWT', params)
}



// 获取绑定账号信息
export const relatedInfo = (username, params) => {
    return getRequest(`/relate/getRelatedInfo/${username}`, params)
}
// 解绑账号
export const unRelate = (params) => {
    return postRequest('/relate/delByIds', params)
}
// 分页获取绑定账号信息
export const getRelatedListData = (params) => {
    return getRequest('/relate/findByCondition', params)
}



// 获取全部角色数据
export const getAllRoleList = (params) => {
    return getRequest('/role/getAllList', params)
}
// 分页获取角色数据
export const getRoleList = (params) => {
    return getRequest('/role/getAllByPage', params)
}
// 添加角色
export const addRole = (params) => {
    return postRequest('/role/save', params)
}
// 编辑角色
export const editRole = (params) => {
    return postRequest('/role/edit', params)
}
// 设为或取消注册角色
export const setDefaultRole = (params) => {
    return postRequest('/role/setDefault', params)
}
// 分配角色权限
export const editRolePerm = (params) => {
    return postRequest('/role/editRolePerm', params)
}
// 分配角色数据权限
export const editRoleDep = (params) => {
    return postRequest('/role/editRoleDep', params)
}
// 删除角色
export const deleteRole = (ids, params) => {
    return deleteRequest(`/role/delAllByIds/${ids}`, params)
}


// 获取全部权限数据
export const getAllPermissionList = (params) => {
    return getRequest('/permission/getAllList', params)
}
// 添加权限
export const addPermission = (params) => {
    return postRequest('/permission/add', params)
}
// 编辑权限
export const editPermission = (params) => {
    return postRequest('/permission/edit', params)
}
// 删除权限
export const deletePermission = (ids, params) => {
    return deleteRequest(`/permission/delByIds/${ids}`, params)
}
// 搜索权限
export const searchPermission = (params) => {
    return getRequest('/permission/search', params)
}



// 获取全部字典
export const getAllDictList = (params) => {
    return getRequest('/dict/getAll', params)
}
// 添加字典
export const addDict = (params) => {
    return postRequest('/dict/add', params)
}
// 编辑字典
export const editDict = (params) => {
    return postRequest('/dict/edit', params)
}
// 删除字典
export const deleteDict = (ids, params) => {
    return deleteRequest(`/dict/delByIds/${ids}`, params)
}
// 搜索字典
export const searchDict = (params) => {
    return getRequest('/dict/search', params)
}
// 获取全部字典数据
export const getAllDictDataList = (params) => {
    return getRequest('/dictData/getByCondition', params)
}
// 添加字典数据
export const addDictData = (params) => {
    return postRequest('/dictData/add', params)
}
// 编辑字典数据
export const editDictData = (params) => {
    return postRequest('/dictData/edit', params)
}
// 删除字典数据
export const deleteData = (ids, params) => {
    return deleteRequest(`/dictData/delByIds/${ids}`, params)
}
// 通过类型获取字典数据
export const getDictDataByType = (type, params) => {
    return getRequest(`/dictData/getByType/${type}`, params)
}


// 获取other配置
export const getOtherSet = (params) => {
    return getRequest('/setting/other', params)
}
// 编辑other配置
export const editOtherSet = (params) => {
    return postRequest('/setting/other/set', params)
}


// 分页获取消息数据
export const getMessageData = (params) => {
    return getRequest('/message/getByCondition', params)
}
// 获取单个消息详情
export const getMessageDataById = (id, params) => {
    return getRequest(`/message/get/${id}`, params)
}
// 添加消息
export const addMessage = (params) => {
    return postRequest('/message/add', params)
}
// 编辑消息
export const editMessage = (params) => {
    return postRequest('/message/edit', params)
}
// 删除消息
export const deleteMessage = (ids, params) => {
    return deleteRequest(`/message/delByIds/${ids}`, params)
}
// 分页获取消息推送数据
export const getMessageSendData = (params) => {
    return getRequest('/messageSend/getByCondition', params)
}
// 编辑发送消息
export const editMessageSend = (params) => {
    return putRequest('/messageSend/update', params)
}
// 删除发送消息
export const deleteMessageSend = (ids, params) => {
    return deleteRequest(`/messageSend/delByIds/${ids}`, params)
}


// 表格生成
export const generateTable = (name, rowNum, params) => {
    return importRequest(`/generate/table/${name}/${rowNum}`, params)
}
// 树生成
export const generateTree = (name, rowNum, params) => {
    return importRequest(`/generate/tree/${name}/${rowNum}`, params)
}
// 通过实体类生成Vue代码Json数据
export const getEntityData = (path, params) => {
    return getRequest(`/generate/getEntityData/${path}`, params)
}
