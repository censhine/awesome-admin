import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/aw/inventory',
  name: 'aw-inventory',
  meta,
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'inventory-list', name: `${pre}inventory-list`, component: _import('aw/inventory/inventory-list'), meta: { ...meta, title: '库存列表' } },
    { path: 'inventory-warning-list', name: `${pre}inventory-warning-list`, component: _import('aw/inventory/inventory-warning-list'), meta: { ...meta, title: '库存预警列表' } },
  ])('aw-inventory-')
}
