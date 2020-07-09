import request from '@/plugin/axios/request'
const BASE_URL_API = '/operate/web/'
import axios from 'axios'
import util from '@/utils/util'
/**
 * 供应商通用API
 * @param path
 * @param data
 * @param params
 * @param method
 * @returns {AxiosPromise}
 */
export function getAxiosApi(path,data={},params={},method='post') {
  return request({
    url: path,
    method: method,
    data,
    params
  })
}

export function getUploadUrl() {
  return axios.get('http://192.168.1.136:8094/config',{
    headers:{
      "Content-type":"multipart/form-data",
      "token": localStorage.getItem('token')
    },
    withCredentials: false
  })
}

/**
 * 获取列表
 * @param {String} module 模块
 * @param {Object} params 分页数据
 * @param {Object} data JSONObject数据
 * @param {String} method
 * @returns
 */
export function findPageList(module,data = {},params={},method='post') {
  return request({
    url: BASE_URL_API+module+'/findPage',
    method: method,
    params,
    data
  })
}

/**
 * 获取单一信息
 * @param {String} module 模块
 * @param {Object} params
 * @param {Object} data
 * @param {String} method
 * @returns
 */
export function getEntityInfo(module, data = {},params={},method='post') {
  return request({
    url: BASE_URL_API+module+'/getEntity',
    method: method,
    params,
    data
  })
}

/**
 * 新增信息
 * @param {String} module 模块
 * @param {Object} params
 * @param {Object} data
 * @param {String} method
 * @returns
 */
export function insertInfo(module,data = {},params={},method='post') {
  return request({
    url: BASE_URL_API+module+'/insert',
    method: method,
    params,
    data
  })
}

/**
 * 编辑信息
 * @param {String} module 模块
 * @param {Object} params
 * @param {Object} data
 * @param {String} method
 * @returns
 */
export function updateInfo(module,data= {},params = {},method='post') {
  return request({
    url: BASE_URL_API+module+'/update',
    method: method,
    params,
    data
  })
}

/**
 * 删除信息
 * @param {String} module 模块
 * @param {Object} params
 * @param {Object} data
 * @param {String} method
 * @returns
 */
export function deleteInfo(module,data= {},params = {},method='post') {
  return request({
    url: BASE_URL_API+module+'/delete',
    method: method,
    params,
    data
  })
}

/**
 * 获取子集数据
 * @param {String} module
 * @param {Object} data
 * @param {Object} params
 * @param {String} method
 * @returns
 */
export function getListByParentId(module, data = {}, params={},method='post') {
  return request({
    url: BASE_URL_API+module+'/getListByParentId',
    method: method,
    params,
    data
  })
}

/**
 * 获取树数据
 * @param {String} module
 * @param {Object} data
 * @param {Object} params
 * @param {String} method
 * @returns
 */
export function getTreeList(module, data = {}, params={},method='post') {
  return request({
    url: BASE_URL_API+module+'/tree?status=1',
    method: method,
    params,
    data
  })
}

/**
 * 重置密码
 * @param {String} module
 * @param {Object} data
 * @param {Object} params
 * @param {String} method
 * @returns
 */
export function resetPassword(module, data = {}, params={},method='post') {
  return request({
    url: BASE_URL_API+module+'/resetPassword',
    method: method,
    params,
    data
  })
}

/**
 * 修改密码
 * @param {String} module
 * @param {Object} data
 * @param {Object} params
 * @param {String} method
 * @returns
 */
export function changePassword(module,data={},params={},method='post') {
  return request({
    url: '/operate/web/user/update',
    method: method,
    params,
    data
  })
}

/**
 * 登录
 * @param {String} module
 * @param {Object} data
 * @param {Object} params
 * @param {String} method
 * @returns
 */
export function userLogin(module, data = {}, params={},method='post') {
  return request({
    url: '/operate/web/user/login',
    method: method,
    params,
    data
  })
}

/**
 * 登录
 * @param {String} module
 * @param {Object} data
 * @param {Object} params
 * @param {String} method
 * @returns
 */
export function getUserInfo(module, data = {}, params={},method='post') {
  return axios.get(util.serverConfig.BASE_API+'/operate/web/user/getUserInfo',{
    timeout: 30000,
    // 默认使用简单请求,避免复杂请求(多一次OPTIONS请求)
    // 如有特殊需求或协议不同,可修改为例如"application/x-www-form-urlencoded"
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'token': params.token
    },
    // 启用跨域访问携带Cookie
    withCredentials: true,
    crossDomain: true,
    changeOrigin: true
  })
}

/**
 * 登录
 * @param {String} module
 * @param {Object} data
 * @param {Object} params
 * @param {String} method
 * @returns
 */
export function logoutUser(module, data = {}, params={},method='post') {
  return axios.get(util.serverConfig.BASE_API+'/operate/web/user/loginOut',{
    timeout: 30000,
    // 默认使用简单请求,避免复杂请求(多一次OPTIONS请求)
    // 如有特殊需求或协议不同,可修改为例如"application/x-www-form-urlencoded"
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'token': params.token
    },
    // 启用跨域访问携带Cookie
    withCredentials: true,
    crossDomain: true,
    changeOrigin: true
  })
}

/**
 * 登录
 * @param {String} module
 * @param {Object} data
 * @param {Object} params
 * @param {String} method
 * @returns
 */
export function getCategory(module, data = {}, params={},method='post') {
  return request({
    url: '/operate/web/category/getCategory',
    method: method,
    params,
    data
  })
}

/**
 * 插入子分类
 * @param {String} module
 * @param {Object} data
 * @param {Object} params
 * @param {String} method
 * @returns
 */
export function insertCategoryGroup(module, data = {}, params={},method='post') {
  return request({
    url: BASE_URL_API+module+'/insertCategoryGroup',
    method: method,
    params,
    data
  })
}

/**
 * 开启关闭
 * @param {String} module
 * @param {Object} data
 * @param {Object} params
 * @param {String} method
 * @returns
 */
export function setStatus(module, data = {}, params={},method='post') {
  return request({
    url: BASE_URL_API+module+'/static',
    method: method,
    params,
    data
  })
}

/**
 * 开启关闭
 * @param {String} module
 * @param {Object} data
 * @param {Object} params
 * @param {String} method
 * @returns
 */
export function startOrClose(module, data = {}, params={},method='post') {
  return request({
    url: BASE_URL_API+module+'/startOrClose',
    method: method,
    params,
    data
  })
}

/**
 * 请求数据
 * @param {String} path
 * @param {Object} data
 * @param {Object} params
 * @param {String} method
 * @returns
 */
export function getAxios(path, data, params,method='post') {
  return request({
    url: BASE_URL_API+path,
    method: method,
    params,
    data
  })
}

/**
 * 请求公共接口数据
 * @param {String} path
 * @param {Object} data
 * @param {Object} params
 * @param {String} method
 * @returns
 */
export function getPublicApi(path, data, params,method='post') {
  return request({
    url: path,
    method: method,
    params,
    data
  })
}
