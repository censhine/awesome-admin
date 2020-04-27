import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/aw/order-dispose',
  name: 'aw-order-dispose',
  meta,
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'confirm-list', name: `${pre}confirm-list`, component: _import('aw/order-dispose/confirm-list'), meta: { ...meta, title: '确认收货列表' } },
    { path: 'order-setting', name: `${pre}order-setting`, component: _import('aw/order-dispose/order-setting'), meta: { ...meta, title: '订单设置' } },
    { path: 'apply-return-goods', name: `${pre}apply-return-goods`, component: _import('aw/order-dispose/apply-return-goods'), meta: { ...meta, title: '退货申请处理' } },
    { path: 'apply-return-goods/detail', name: `${pre}apply-return-goods/detail`, component: _import('aw/order-dispose/apply-return-goods/detail'), meta: { ...meta, title: '退货详情' } },
    { path: 'apply-refund', name: `${pre}apply-refund`, component: _import('aw/order-dispose/apply-refund'), meta: { ...meta, title: '退款申请处理' } },
    { path: 'apply-refund/detail', name: `${pre}apply-refund/detail`, component: _import('aw/order-dispose/apply-refund/detail'), meta: { ...meta, title: '退款详情' } },
    { path: 'return-goods-setting', name: `${pre}return-goods-setting`, component: _import('aw/order-dispose/return-goods-setting'), meta: { ...meta, title: '退货原因设置' } },
    { path: 'confirm-list/detail', name: `${pre}-detail`, component: _import('aw/order-dispose/confirm-list/detail'), meta: { ...meta, title: '订单详情' }},
  ])('aw-order-dispose-')
}
