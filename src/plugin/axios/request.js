import store from '@/store'
import qs from 'qs'
import axios from 'axios'
import { Message,MessageBox } from 'element-ui'
import Vue from 'vue'
import VueRouter from 'vue-router'
import serviceConfig from './serviceConfig'
import util from '@/libs/util'
import router from "@/router";

Vue.use(VueRouter)
// 创建一个错误
function errorCreate (msg) {
  const error = new Error(msg)
  errorLog(error)
  throw error
}

// 记录和显示错误
function errorLog (error) {
  // 添加到日志
  store.dispatch('d2admin/log/push', {
    message: '数据请求异常',
    type: 'danger',
    meta: {
      error
    }
  })
  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    util.log.danger('>>>>>> Error >>>>>>')
    console.log(error)
  }
  // 显示提示
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
}

// 创建一个 axios 实例
const service = axios.create({
  baseURL: serviceConfig.VUE_SUP_API,
  timeout: 5000, // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在请求发送之前做一些处理

    const token = util.cookies.get('token')
    if(token!=undefined){
      config.headers['token'] = token
    }
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改

    config.headers['Content-Type'] = 'application/json;charset=utf-8'
//  if(config.method=='post'){
//  	config.data = qs.stringify(config.data)
//  }
    return config
  },
  error => {
    // 发送失败
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data
    // 这个状态码是和后端约定的
    const { code } = dataAxios
    // 根据 code 进行判断
    if (code === undefined) {
      // 如果没有 code 代表这不是项目后端开发的接口 比如可能是 D2Admin 请求最新版本
      return dataAxios
    } else {
      // 有 code 代表这是一个后端接口 可以进行进一步的判断
      switch (code) {
        case '100':
          // [ 示例 ] code === 0 代表没有错误
          return dataAxios
        case '500':
        reAuthorize()
          // [ 示例 ] 其它和后台约定的 code
//        errorCreate(`[ code: xxx ] ${dataAxios.msg}: ${response.config.url}`)
          break
        default:
          // 不是正确的 code ${response.config.url}
          errorCreate(`${dataAxios.tip}`)
          break
      }
    }
  },
  error => {
    if(error.toString().includes(403)){
      MessageBox('您的授权已过期,需重新登录！').then(() => {
        router.push({name:'login'})
      }).catch(() => {
        router.push({name:'login'})
      });
      return
    }
    if (error && error.response) {
      switch (error.response.status) {
        case 400: error.message = '请求错误'; break
        case 401: error.message = '未授权，请登录'; break
        case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
        case 408: error.message = '请求超时'; break
//      case 500: error.message = '服务器内部错误'; break
        case 501: error.message = '服务未实现'; break
        case 502: error.message = '网关错误'; break
        case 503: error.message = '服务不可用'; break
        case 504: error.message = '网关超时'; break
        case 505: error.message = 'HTTP版本不受支持'; break
        default: break
      }
    }
    errorLog(error)
    return Promise.reject(error)
  }
)

// 重新授权确认
function reAuthorize() {
  MessageBox.confirm('您的授权已过期或在其他地方登录，是否重新登录？', '授权过期', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      util.cookies.remove('token')
      util.cookies.remove('uuid')
      location.reload()
    })
    .catch(() => {
    })
}

export default service
