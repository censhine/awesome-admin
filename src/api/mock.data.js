import request from '@/plugin/axios/request'

const VERSION = '/v1'
const CIRCLE_MODULE_BASE_URL = VERSION+'/circle'

/**
 * 商圈管理
 * @param {Object} data
 * @returns
 */
export function getCircleList(data) {
  return new Promise((r)=>{
    const json = {
      "status": 200,
      "message": "success",
      "data": {
        "items": [{
          "id":10001,
          "title":"广告1",
          "link":"http:\/\/www.zis.mobi",
          "sort":121,
          "status":1,
          "logo":"http:\/\/www.zis.mobi\/images\/new\/a.png"
      },
      {
          "id":10002,
          "title":"广告2",
          "link":"http:\/\/www.zis.mobi",
          "sort":122,
          "status":0,
          "logo":"http:\/\/www.zis.mobi\/images\/new\/b.png"
      },
      {
        "id":10003,
          "title":"广告3",
          "link":"http:\/\/www.zis.mobi",
          "sort":123,
          "status":1,
          "logo":"http:\/\/www.zis.mobi\/images\/new\/c.png"
      }],
          "total_result":20
      }}
    r(json)
  })
}

export function getStoreList(data) {
  return new Promise((r)=>{
    const json =  {"status":200,"message":"success","data":{"items":[{"id":10001,"store_name":"店铺1","store_owner":"张山","phone":13111111111,"status":1,"groups":"群1，群2","online_source":500,"month_amount":10000},{"id":10002,"store_name":"店铺2","store_owner":"李四","phone":13111111111,"status":1,"groups":"群8，群9","online_source":1500,"month_amount":18000},{"id":10003,"store_name":"店铺3","store_owner":"王二","phone":13111111111,"status":1,"groups":"群3，群4","online_source":2500,"month_amount":16000}],"total_result":20}}
    r(json)
  })
}

export function getGoodsList(data) {
  return new Promise((r) => {
    const json = {
      "status": 200,
      "message": "success",
      "data": {
        "items": [{
          "id": 10001,
          "goods_name": "华为手机pro 30",
          "price": "1860",
          "sales_num": 120,
          "is_recommend": 0,
          "sort":11,
          "status": 1,
        }, {
          "id": 10001,
          "goods_name": "华为手机pro 30",
          "price": "1860",
          "sales_num": 120,
          "is_recommend": 1,
          "sort":11,
          "status": 1,
        }, {
          "id": 10001,
          "goods_name": "华为手机pro 30",
          "price": "1860",
          "sales_num": 120,
          "is_recommend": 1,
          "sort":11,
          "status": 1,
        }, {
          "id": 10001,
          "goods_name": "华为手机pro 30",
          "price": "1860",
          "sales_num": 120,
          "is_recommend": 1,
          "sort":11,
          "status": 1,
        }, {
          "id": 10001,
          "goods_name": "华为手机pro 30",
          "price": "1860",
          "sales_num": 120,
          "is_recommend": 1,
          "sort":11,
          "status": 1,
        }, {
          "id": 10001,
          "goods_name": "华为手机pro 30",
          "price": "1860",
          "sales_num": 120,
          "is_recommend": 1,
          "sort":11,
          "status": 1,
        }, {
          "id": 10001,
          "goods_name": "华为手机pro 30",
          "price": "1860",
          "sales_num": 120,
          "is_recommend": 1,
          "sort":11,
          "status": 1,
        }, {
          "id": 10001,
          "goods_name": "华为手机pro 30",
          "price": "1860",
          "sales_num": 120,
          "is_recommend": 1,
          "sort":11,
          "status": 1,
        }, {
          "id": 10001,
          "goods_name": "华为手机pro 30",
          "price": "1860",
          "sales_num": 120,
          "is_recommend": 1,
          "sort":11,
          "status": 1,
        }, {
          "id": 10001,
          "goods_name": "华为手机pro 30",
          "price": "1860",
          "sales_num": 120,
          "is_recommend": 1,
          "sort":11,
          "status": 1,
        }, {
          "id": 10001,
          "goods_name": "华为手机pro 30",
          "price": "1860",
          "sales_num": 120,
          "is_recommend": 1,
          "sort":11,
          "status": 1,
        }, {
          "id": 10001,
          "goods_name": "华为手机pro 30",
          "price": "1860",
          "sales_num": 120,
          "is_recommend": 1,
          "sort":11,
          "status": 1,
        }
        ], "total_result": 20
      }
    }
    r(json)
  })
}

export function getBrandList(data) {
  return new Promise((r) => {
    const json = {
      "status": 200,
      "message": "success",
      "data": {
        "items": [{
          "id": 10001,
          "brand_name": "Victoria's Secret",
          "is_recommend": 0,
          "sort":11,
          "status": 1,
        }, {
          "id": 10002,
          "brand_name": "Victoria's Secret",
          "is_recommend": 1,
          "sort":11,
          "status": 1,
        }, {
          "id": 10003,
          "brand_name": "Victoria's Secret",
          "is_recommend": 1,
          "sort":11,
          "status": 0,
        }], "total_result": 20
      }
    }
    r(json)
  })
}
