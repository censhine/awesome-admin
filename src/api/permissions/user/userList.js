import request from '@/plugin/axios/request'
const baeseUrl = '/supply/web/childUser'

//新增用户
export function addUser (data) {
  return request({
    url: `${baeseUrl}/insert`,
    method: 'post',
    data
  })
}

//编辑用户
export function updateUser (data) {
  return request({
    url: `${baeseUrl}/update`,
    method: 'post',
    data
  })
}

//获取用户列表
export function getUserList (data,params={}) {
  return request({
    url: `${baeseUrl}/findPage`,
    method: 'post',
    data,
 	params
  })
}

//获取用户详细信息
export function getUserInfo (params={}) {
  return request({
    url: `${baeseUrl}/getEntity`,
    method: 'get',
    params
  })
}

//删除用户
export function delUser (params={}) {
  return request({
    url: `${baeseUrl}/delete`,
    method: 'get',
    params
  })
}

//重置密码
export function resetPassword (params={}) {
  return request({
    url: `${baeseUrl}/updatePassword`,
    method: 'get',
    params
  })
}
