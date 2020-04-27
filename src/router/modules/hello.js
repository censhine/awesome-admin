import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/aw/gogogo',
  name: 'aw-gogogo',
  meta,
  redirect: { name: 'aw-gogogo-index' },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'cls',
      name: `${pre}cls`,
      component: _import('aw/gogogo/cls'),
      meta: {
        ...meta,
        title: 'gogogo1'
      }
    },
    {
      path: 'pls',
      name: `${pre}pls`,
      component: _import('aw/gogogo/pls'),
      meta: {
        ...meta,
        title: 'gogogo2'
      }
    },
    {
      path: 'gls',
      name: `${pre}gls`,
      component: _import('aw/gogogo/gls'),
      meta: {
        ...meta,
        title: 'gogogo3'
      }
    },
  ])('aw-gogogo-')
}
