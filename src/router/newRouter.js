import Vue from 'vue'
import Router from 'vue-router'
//import { Layout,Content }  from "../layout/header-aside/layout"; // 页面整体布局
import Layout from "../layout/header-aside/layout"; // 页面整体布局
import { topRouterMap } from "./topRouter";
import menuAside from './routes'
import layoutHeaderAside from "@/layout/header-aside";

process.env.NODE_ENV === "development" ? Vue.use(Router) : null;

function filterTopRouterMap(name){
  let router = topRouterMap.find((item) => {
    return item.parentName === name;
  });
  return router.data; // arr
}
const meta = {icon:''}
/**
 * 1、roles:后台返回的权限结构;
 *
 */
//手动跳转的页面白名单
const whiteList = [
  '/'
];
/**
 * path:''与path:'*'的区别：
 * 1、path:'*', 会匹配所有路径
 * 2、path:''，也是会匹配到路由
 *
 */
//默认不需要权限的页面
export const constantRouterMap = [
  {
    path: '',
    redirect: '/index/index',
    hidden:true
  },
  { path: '/login',name: 'login',component:() => import('@/views/system/login'),hidden: true},
  { path: '/404', component: () => import('@/views/system/error/404'), hidden: true },
  { path: '/401', component: () => import('@/views/system/error/404'), hidden: true },
  {
    path: '/aw/applications',
    name: '资料审核管理',
    meta:{
      title:'资料审核管理',
      icon: '',
    },
    children:[
      {
        path:'age',
        name: '代理商资料审核',
        meta:{
          title:'品牌管理',
          icon:'el-icon-s-home',
          routerType:'leftmenu'
        },
        component: () => import('@/views/aw/applications/age'),
      },
      {
        path:'sup',
        name: '供应商商资料审核',
        meta:{
          title:'品牌管理',
          icon:'el-icon-s-home',
          routerType:'leftmenu'
        },
        component: () => import('@/views/aw/applications/sup'),
      },
      {
        path:'layer',
        name: '律师资料审核',
        meta:{
          title:'品牌管理',
          icon:'el-icon-s-home',
          routerType:'leftmenu'
        },
        component: () => import('@/views/aw/applications/layer'),
      },
    ]
  },
  {
    path: '/aw/goods',
    name: '商品管理',
    meta:{
      title:'商品管理',
      icon: '',
    },
    children:[
      {
        path:'category',
        name: '分类管理',
        meta:{
          title:'分类管理',
          icon:'el-icon-s-home',
          routerType:'leftmenu'
        },
        component: () => import('@/views/aw/goods/category'),
      },
      {
        path:'brand',
        name: '品牌管理',
        meta:{
          title:'品牌管理',
          icon:'el-icon-s-home',
          routerType:'leftmenu'
        },
        component: () => import('@/views/aw/goods/brand'),
      },
      {
        path:'spec',
        name: '规格管理',
        meta:{
          title:'规格管理',
          icon:'el-icon-s-home',
          routerType:'leftmenu'
        },
        component: () => import('@/views/aw/goods/spec'),
      },
      {
        path:'comments',
        name: '评论管理',
        meta:{
          title:'评论管理',
          icon:'el-icon-s-home',
          routerType:'leftmenu'
        },
        component: () => import('@/views/aw/goods/comments'),
      },
    ]
  },
  {
    path: '/aw/circles',
    name: '商圈管理',
    meta:{
      icon:'',
      title: '商圈管理'
    },
    children: [
      {
        path: 'banner',
        name: '轮播图管理',
        component: ()=>import('@/views/aw/circles/banner'),
        meta: {
          title: '轮播图管理',
          icon:'el-icon-s-home',
          routerType:'leftmenu'
        }
      },
      {
        path: 'banner/view',
        name: `申请详情`,
        component: ()=>import('@/views/aw/circles/banner/view'),
        hidden:true,
        meta: {
          title: '申请详情'
        }
      },
      {
        path: 'store',
        name: `官方店铺管理`,
        component: ()=>import('@/views/aw/circles/store'),
        meta: {
          title: '官方店铺管理',
          icon:'el-icon-s-home',
          routerType:'leftmenu'
        }
      },
      {
        path: 'store/detail',
        name: `店铺详情`,
        component: ()=>import('@/views/aw/circles/store/detail'),
        hidden: true,
        meta: {
          title: '店铺详情'
        }
      },
      {
        path: 'goods',
        name: `本地推荐管理`,
        component: ()=>import('@/views/aw/circles/goods'),
        meta: {
          title: '本地推荐管理',
          icon:'el-icon-s-home',
          routerType:'leftmenu'
        }
      },
      {
        path: 'brand',
        name: `品牌推荐管理`,
        component: () => import('@/views/aw/circles/brand'),
        meta: {
          title: '品牌推荐管理',
          icon: 'el-icon-s-home',
          routerType: 'leftmenu'
        }
      }
    ]
  },
  {
    path: '/aw/user',
    name: '用户管理',
    meta:{
      title:'用户管理',
      icon: '',
    },
    children:[
      {
        path:'list',
        name: '用户列表',
        meta:{
          title:'用户列表',
          icon:'el-icon-s-home',
          routerType:'leftmenu'
        },
        component: () => import('@/views/aw/user/list'),
      },
      {
        path:'log',
        name: '登录日志',
        meta:{
          title:'登录日志',
          icon:'el-icon-s-home',
          routerType:'leftmenu'
        },
        component: () => import('@/views/aw/user/log'),
      },
    ]
  },
  {
    path: '/aw/goods-verify', name: '商品审核管理', component: ()=>import('@/views/aw/goods-verify/index'),
    meta:{title:'商品审核管理', icon: '',},
    children:[{path:'index', name: '审核列表', meta:{title:'审核列表', icon:'el-icon-s-home', routerType:'leftmenu'}, component: () => import('@/views/aw/goods-verify/index'),}]
  },
  {
    path: '/aw/contract-verify',
    name: '合同管理',
    meta: {title:'合同管理', icon:''},
    children:  [
      { path: 'index', name: `合同列表`, component: ()=>import('@/views/aw/contract-verify/index'), meta: { icon:'', title: '合同列表',routerType: 'leftmenu' } },
      { path: 'detail', name: `合同详情`, component: ()=>import('@/views/aw/contract-verify/detail'), hidden:true, meta: { icon:'', title: '合同详情' } },
      { path: 'add', name: `添加合同`, component: ()=>import('@/views/aw/contract-verify/add'),hidden:true, meta: { icon:'', title: '添加合同',routerType: 'leftmenu' } },
      { path: 'setting', name: `合同设置`, component: ()=>import('@/views/aw/contract-verify/setting'), meta: { icon:'', title: '合同设置',routerType: 'leftmenu' } },
      { path: 'sign', name: `电子签名`, component: ()=>import('@/views/aw/contract-verify/sign'), meta: { icon:'', title: '电子签名',routerType: 'leftmenu' } },
    ]
  },
  {
    path: '/aw/oper-tpl',
    name: '微店运营模板',
    meta: {
      icon:'',
      title: '微店运营模板'
    },
    children: [
      {
        path: 'index',
        name: `运营模版列表`,
        component: ()=>import('@/views/aw/oper-tpl/index'),
        meta: {
          icon:'',
          title: '运营模版列表'
        }
      },

          {
            path: 'tpl3',
            name: `微店运营模板`,
            component: ()=>import('@/views/aw/oper-tpl/tpl3'),
            meta: {
              icon:'',
              title: '微店运营模板'
            }
          },
          {
            path: 'tpl2',
            name: `大礼包模板`,
            component: ()=>import('@/views/aw/oper-tpl/tpl2'),
            meta: {
              icon:'',
              title: '大礼包模板'
            }
          },
          {
            path: 'tpl',
            name: `掌柜礼包`,
            component: ()=>import('@/views/aw/oper-tpl/tpl'),
            meta: {
              icon:'',
              title: '掌柜礼包'
            }
          },

      {
        path: 'setting',
        name: `平台设置`,
        component: ()=>import('@/views/aw/oper-tpl/setting'),
        meta: {
          icon:'',
          title: '平台设置'
        }
      },
    ]
  },
  {
    path: '/aw/inventory',
    name: '库存管理',
    meta:{
      title: '库存管理',
      icon:''
    },
    children: [
      { path: 'inventory-list', name: `库存列表`, component: ()=>import('@/views/aw/inventory/inventory-list'), meta: { meta, title: '库存列表' } },
      { path: 'inventory-warning-list', name: `库存预警列表`, component: ()=>import('@/views/aw/inventory/inventory-warning-list'), meta: { meta, title: '库存预警列表' } },
    ]
  },
  {
    path: '/aw/industry',
    name: '行业列表',
    meta:{
      icon: '',
      title: '行业列表'
    },
    component: layoutHeaderAside,
    children:  [
      {
        path: 'index',
        name: `行业列表`,
        component: ()=>import('@/views/aw/industry/index'),
        meta: {
          ...meta,
          title: '行业列表'
        }
      },
      {
        path: 'add',
        name: `添加行业`,
        hidden: true,
        component: ()=>import('@/views/aw/industry/add'),
        meta: {
          ...meta,
          title: '添加行业'
        }
      },
      {
        path: 'edit',
        name: `编辑行业`,
        hidden: true,
        component: ()=>import('@/views/aw/industry/edit'),
        meta: {
          ...meta,
          title: '编辑行业'
        }
      },
    ]
  },
  {
    path: '/aw/financial',
    name: '财务管理',
    meta:{
      icon: '',
      title:'财务管理'
    },
    children: [
      { path: 'index', name: `平台流水`, component: ()=>import('@/views/aw/financial/index'), meta: { ...meta, title: '平台流水' } },
      { path: 'user', name: `个人流水`, component: ()=>import('@/views/aw/financial/user'), meta: { ...meta, title: '个人流水' } },
    ]
  },
  {
    path: '/aw/freight-tp',
    name: '运费模板管理',
    meta:{
      icon:'',
      title:'运费模板管理'
    },
    children: [
      { path: 'index', name: `运费模板`, component: ()=>import('@/views/aw/freight-tp/index'), meta: { ...meta, title: '运费模板' } },
      { path: `company`,name:`物流公司`,component: ()=>import('@/views/aw/freight-tp/company'), meta: { ...meta,title: '物流公司'} },
    ]
  },
  {
    path: '/aw/order-dispose',
    name: '订单处理',
    meta:{
      icon:'',
      title:'订单处理'
    },
    children:  [
      { path: 'confirm-list', name: `确认收货列表`, component: ()=>import('@/views/aw/order-dispose/confirm-list'), meta: { ...meta, title: '确认收货列表' } },
      { path: 'order-setting', name: `订单设置`, component: ()=>import('@/views/aw/order-dispose/order-setting'), meta: { ...meta, title: '订单设置' } },
      { path: 'apply-return-goods', name: `退货申请处理`, component: ()=>import('@/views/aw/order-dispose/apply-return-goods'), meta: { ...meta, title: '退货申请处理' } },
      { path: 'apply-return-goods/detail', name: `退货详情`, hidden:true, component: ()=>import('@/views/aw/order-dispose/apply-return-goods/detail'), meta: { ...meta, title: '退货详情' } },
      { path: 'apply-refund', name: `退款申请处理`, component: ()=>import('@/views/aw/order-dispose/apply-refund'), meta: { ...meta, title: '退款申请处理' } },
      { path: 'apply-refund/detail', name: `退款详情`, hidden:true,component: ()=>import('@/views/aw/order-dispose/apply-refund/detail'), meta: { ...meta, title: '退款详情' } },
      { path: 'return-goods-setting', name: `退货原因设置`, component: ()=>import('@/views/aw/order-dispose/return-goods-setting'), meta: { ...meta, title: '退货原因设置' } },
      { path: 'detail', name: `订单详情`, hidden:true,component: ()=>import('@/views/aw/order-dispose/confirm-list/detail'), meta: { ...meta, title: '订单详情' }},
    ]
  },
  {
    path: '/aw/order-manger',
    name: '订单管理',
    meta:{
      icon:'',
      title:'订单管理'
    },
    children: [
      { path: 'purchase-list', name: `商家进货订单`, component: ()=>import('@/views/aw/order-manger/purchase-list'), meta: { ...meta, title: '商家进货订单' }},
      { path: 'order-list', name: `商家代发订单`, component: ()=>import('@/views/aw/order-manger/order-list'), meta: { ...meta, title: '商家代发订单' } },
      { path: 'logistics', name: `物流跟踪`, component: ()=>import('@/views/aw/order-manger/logistics'), meta: { ...meta, title: '物流跟踪' }},
    ]
  },
  {
    path: '/aw/shopmanage',
    name: '商家管理',
    meta:{
      title:'商家管理',
      icon:''
    },
    children:  [
      { path: 'index', name: `商家列表`, component: ()=>import('@/views/aw/shopmanage/index'), meta: { ...meta, title: '商家列表' } },
      { path: 'detail', name: `商家详情`, component: ()=>import('@/views/aw/shopmanage/detail'), hidden: true, meta: { ...meta, title: '商家详情' } }
    ]
  },
  /*{
    path: '/aw/order-list',
    name: '订单管理-通用',
    meta:{
      title:'订单管理-通用',
      icon:''
    },
    children:  [
      { path: 'index', name: `商品订单列表`, component: ()=>import('@/views/aw/order-list/index'),hidden:true, meta: { ...meta, title: '商品订单列表' }},
      { path: 'detail', name: `订单详情`, component: ()=>import('@/views/aw/order-list/detail'),hidden:true, meta: { ...meta, title: '订单详情' }},
    ]
  },*/
  {
    path: '/aw/setting',
    name: '设置管理',
    meta:{
      icon:'',
      title:'设置管理'
    },
    children:  [
      {
        path: 'payment',
        name: `支付设置`,
        component: ()=>import('@/views/aw/setting/payment'),
        meta: {
          ...meta,
          title: '支付设置'
        }
      },
      {
        path: 'area',
        name: `区域设置`,
        component: ()=>import('@/views/aw/setting/area'),
        meta: {
          ...meta,
          title: '区域设置'
        }
      },
      {
        path: 'payment-edit',
        name: `支付编辑`,
        component: ()=>import('@/views/aw/setting/payment-edit'),
        meta: {
          ...meta,
          title: '支付编辑'
        }
      },
    ]
  },
  {
    path: '/aw/rights',
    name: '权限设置',
    meta:{
      icon:'',
      title:'权限设置'
    },
    children: [
      {
        path: 'depart',
        name: `部门管理`,
        component: ()=>import('@/views/aw/rights/depart'),
        meta: {
          ...meta,
          title: '部门管理'
        }
      },
      {
        path: 'member',
        name: `成员管理`,
        component: ()=>import('@/views/aw/rights/member'),
        meta: {
          ...meta,
          title: '成员管理'
        }
      },
      {
        path: 'service',
        name: `客服管理`,
        component: ()=>import('@/views/aw/rights/service'),
        meta: {
          ...meta,
          title: '客服管理'
        }
      },
      {
        path: 'detail',
        name: `客服详情`,
        hidden: true,
        component: ()=>import('@/views/aw/rights/service/detail'),
        meta: {
          ...meta,
          title: '客服详情'
        }
      },
      {
        path: 'log',
        name: `操作日志`,
        component: ()=>import('@/views/aw/rights/log'),
        meta: {
          ...meta,
          title: '操作日志'
        }
      },
      {
        path: 'setting',
        name: `权限设置`,
        hidden: true,
        component: ()=>import('@/views/aw/rights/depart/setting'),
        meta: {
          ...meta,
          title: '权限设置'
        }
      },
    ]
  }
]
//concat(menuAside)

//console.log('menuAside',menuAside)

//注册路由
export default new Router({
  mode:'history', // 默认为'hash'模式
  //base: '/permission/', // 添加跟目录,对应服务器部署子目录
  routes: constantRouterMap
})

//异步路由（需要权限的页面）
export const asyncRouterMap = [
  /*
  {
    path:'/userManage',
    name: 'userManage',
    meta: {
      title:'用户管理',
      icon: 'el-icon-s-platform',
    },
    component:Layout,
    children:[{
      path:'userList',
      name:'userList',
      meta: {
          title:'用户列表',
          icon: 'el-icon-s-fold',
          routerType:'leftmenu'
      },
      component: () => import('@/page/userManage/userList'),
      }]
  },
  */
  {
    path:'/shop',
    name: 'shop',
    meta: {
      title:'我的店铺',
      icon: 'el-icon-s-platform',
    },
    component:Layout,
    children:[{
      path:'shopList',
      name:'shopList',
      meta: {
        title:'审核1',
        icon: 'el-icon-s-fold',
        routerType:'leftmenu'
      },
      component: () => import('@/views/aw/applications/age'),
    },
      {
        path:'shopDetail',
        name:'shopDetail',
        meta: {
          title:'审核2',
          icon: 'el-icon-s-fold',
          routerType:'leftmenu'
        },
        component: () => import('@/views/aw/applications/sup'),
      },
      {
        path:'albumList',
        name:'albumList',
        meta: {
          title:'审核3',
          icon: 'el-icon-s-fold',
          routerType:'leftmenu'
        },
        component: () => import('@/views/aw/applications/layer'),
      }
    ],
  },
  {
    path: '/error',
    component: Layout,
    name: 'errorPage',
    meta: {
      title: '错误页面',
      icon: 'iconError'
    },
    children: [
      {
        path: '401',
        name: 'page401',
        component: () => import('@/views/system/error/404'),
        meta: {
          title: '401',
          noCache: true
        }
      },
      {
        path: '404',
        name: 'page404',
        component: () => import('@/views/system/error/404'),
        meta: {
          title: '404',
          noCache: true
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
];

/**
 *  路由设置要求：
 * 1、该路由有子菜单,可以设置多层嵌套路由children;如果没有子菜单,不需要设置children;通过item.children.length来判断路由的级数;
 * 2、登录成功后,定位到系统首页时,需要加载页面整体布局组件Layout并进行子路由定向加载;
 *
 * 按需加载路由组件的2种方法：
 * 1、component: () => import('@/page/login')
 * 2、component:resolve => require(['@/page/fundPosition'], resolve)

 * 什么情况下，路由会定位到404页面?
 * 路由中redirect:'',不起作用？
 * 三级子菜单要在顶部展示？

 */
