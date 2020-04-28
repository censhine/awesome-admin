// import playground from './modules/playground'
// import frame from './modules/frame'
// import awCrud from './modules/aw-crud'
// import plugins from './modules/plugins'
// import charts from './modules/charts'
// import components from './modules/components'
// import element from './modules/element'
// import business from './modules/business'
import goods from "./modules/goods";
import applications from "./modules/applications";

import circles from "./modules/circles";
import user from './modules/user'

import goodsVerify from "./modules/goods-verify";
import financial from "./modules/financial";
import contractVerify from "./modules/contract-verify";
import freightTp from './modules/freight-tp'
import inventory from "./modules/inventory";
import orderDispose from './modules/order-dispose'
import orderManger from './modules/order-manger'
import shopmanage from "./modules/shopmanage";
import operTpl from "./modules/oper-tpl"
import rights from "./modules/rights"

//订单管理(通用)
import order from './modules/order-list'

import Setting from './modules/setting'

import industry from "./modules/industry";

import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: 'index',
        name: 'index',
        meta: {
          title: '系统首页',
          auth: true
        },
        component: _import('system/index')
      },
      // 系统 前端日志
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日志',
          auth: true
        },
        component: _import('system/log')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: _import('system/function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('system/function/redirect')
      }
    ]
  },
  //playground,
  //frame,
  //d2Crud,
  //plugins,
  //charts,
  //components,
  //element,
  //business,
  goods,
  applications,
  user,
  circles,
  goodsVerify,
  industry,
  contractVerify,
  operTpl,
  inventory,
  financial,
  freightTp,
  orderDispose,
  orderManger,
  shopmanage,
  order,
  Setting,
  rights
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('system/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
