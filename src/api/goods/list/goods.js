import request from '@/plugin/axios/request'
const baeseUrl = '/supply/web/product'

//获取商品列表
export function getGoodsList (data,params) {
  return request({
    url: `${baeseUrl}/findPage`,
    method: 'post',
    data,
    params
  })
}

//设置分享商品分成
export function setDivided (params) {
  return request({
    url: `${baeseUrl}/forwardInstall`,
    method: 'post',
    params
  })
}

//删除商品 （批量删除）
export function deleteGoods (params) {
  return request({
    url: `${baeseUrl}/deletes`,
    method: 'post',
    params
  })
}

//上下架商品 （批量上下架）
export function upDownGoods (params) {
  return request({
    url: `${baeseUrl}/productUpDown`,
    method: 'post',
    params
  })
}

//获取品牌列表
export function getBrandList () {
  return request({
    url: `${baeseUrl}/getBand`,
    method: 'post'
  })
}

//获取服务
export function getService () {
  return request({
    url: `${baeseUrl}/getServer`,
    method: 'post'
  })
}

//添加商品
export function saveGoods (data) {
  return request({
    url: `${baeseUrl}/sava`,
    method: 'post',
    data
  })
}

//编辑商品
export function updateGoods (data) {
  return request({
    url: `${baeseUrl}/update`,
    method: 'post',
    data
  })
}


//查看商品信息
export function getGoodsDetail (params) {
  return request({
    url: `${baeseUrl}/findById`,
    method: 'get',
    params
  })
}



//获取分类
export function getCate () {
  return request({
    url: `${baeseUrl}/getCategoryList`,
    method: 'post',
  })
}


