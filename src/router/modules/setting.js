import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/aw/setting',
  name: 'aw-setting',
  meta,
  redirect: { name: 'aw-setting-index' },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'payment',
      name: `${pre}payment`,
      component: _import('aw/setting/payment'),
      meta: {
        ...meta,
        title: '支付设置'
      }
    },
    {
      path: 'area',
      name: `${pre}area`,
      component: _import('aw/setting/area'),
      meta: {
        ...meta,
        title: '区域设置'
      }
    },
    {
      path: 'payment-edit',
      name: `${pre}payment-edit`,
      component: _import('aw/setting/payment-edit'),
      meta: {
        ...meta,
        title: '支付编辑'
      }
    },
  ])('aw-setting-')
}
