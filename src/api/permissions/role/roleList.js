import request from '@/plugin/axios/request'
const baeseUrl = '/supply/web/role'

//新增角色
export function addRole (data) {
  return request({
    url: `${baeseUrl}/insert`,
    method: 'post',
    data
  })
}

//编辑角色
export function updateRole (data) {
  return request({
    url: `${baeseUrl}/update`,
    method: 'post',
    data
  })
}

//获取角色列表
export function getRoleList (data,params={}) {
  return request({
    url: `${baeseUrl}/findPage`,
    method: 'post',
    data,
 		params
  })
}

//获取角色详细信息
export function getRoleInfo (params={}) {
  return request({
    url: `${baeseUrl}/getEntity`,
    method: 'post',
    params
  })
}

//删除角色
export function delRole (params={}) {
  return request({
    url: `${baeseUrl}/delete`,
    method: 'post',
    params
  })
}


//获取权限列表
export function getTreeList (params={}) {
  return request({
    url: 'supply/web/menu/tree',
    method: 'get',
    params
  })
}