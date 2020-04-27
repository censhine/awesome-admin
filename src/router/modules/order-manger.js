import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/aw/order-manger',
  name: 'aw-order-manger',
  meta,
  redirect: { name: 'aw-order-manger-index' },
  component: layoutHeaderAside,
  children: (pre => [
  	{ path: 'purchase-list', name: `${pre}purchase-list`, component: _import('aw/order-manger/purchase-list'), meta: { ...meta, title: '商家进货订单' }},
    { path: 'order-list', name: `${pre}order-list`, component: _import('aw/order-manger/order-list'), meta: { ...meta, title: '商家代发订单' } },
    { path: 'logistics', name: `${pre}logistics`, component: _import('aw/order-manger/logistics'), meta: { ...meta, title: '物流跟踪' }},
  ])('aw-order-manger-')
}
