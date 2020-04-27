import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/aw/order-list',
  name: 'aw-order-list',
  meta,
  component: layoutHeaderAside,
  children: (pre => [
  	{ path: 'index', name: `${pre}index`, component: _import('aw/order-list/index'), meta: { ...meta, title: '商品订单列表' }},
  	{ path: 'detail', name: `${pre}detail`, component: _import('aw/order-list/detail'), meta: { ...meta, title: '订单详情' }},
  ])('aw-order-list-')
}
