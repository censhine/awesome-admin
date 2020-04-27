import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/aw/financial',
  name: 'aw-financial',
  meta,
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'index', name: `${pre}index`, component: _import('aw/financial/index'), meta: { ...meta, title: '平台流水' } },
    { path: 'user', name: `${pre}user`, component: _import('aw/financial/user'), meta: { ...meta, title: '个人流水' } },
  ])('aw-financial-')
}
