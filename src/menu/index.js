// 插件
import demoPlugins from './modules/demo-plugins'
// 组件
import demoComponents from './modules/demo-components'
// 组件
import demoCharts from './modules/demo-charts'
// 组件库
import demoElement from './modules/demo-element'
// 试验台
import demoPlayground from './modules/demo-playground'
// 示例
import demoBusiness from './modules/demo-business'
// CRUD
import demoAWCrud from './modules/demo-aw-crud'
// 第三方网页
import demoFrame from './modules/demo-frame'

// 商品模块
import awGoods from './modules/aw-goods'

// 商圈管理
import awCircles from './modules/aw-circles'

// 商品模块
import awApplications from './modules/aw-applications'

// 签约管理
import awContract from './modules/aw-contract'

// 菜单 侧边栏
export const menuAside = [
  demoComponents,
  demoPlugins,
  demoCharts,
  demoElement,
  demoPlayground,
  demoBusiness,
  demoAWCrud,
  demoFrame,
  awGoods,
  awApplications,
  awContract,
  awCircles
]

// 菜单 顶栏
export const menuHeader = [
  {
    path: '/index',
    title: '系统首页',
    icon: 'home',
    children: [
      { path: '/index', title: '系统首页', icon: 'home' },
      { path: '/log', title: '登录日志', icon: 'globe' },
    ]
  },
  {
    title: '平台功能',
    icon: 'puzzle-piece',
    children: [
      awApplications,
      awGoods,
      awCircles,
      awContract,
      demoAWCrud,
      demoComponents,
      demoElement,
      demoCharts,
      demoPlugins,
      demoFrame,
      {
        title: '新窗口打开链接',
        icon: 'link',
        children: [

        ]
      }
    ]
  },
  demoPlayground,
  demoBusiness
]
