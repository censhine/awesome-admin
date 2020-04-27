import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/aw/user',
  name: 'aw-user',
  meta,
  redirect: { name: 'aw-user-index' },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'list',
      name: `${pre}list`,
      component: _import('aw/user/list'),
      meta: {
        ...meta,
        title: '用户列表'
      }
    },
    {
      path: 'list/view',
      name: `${pre}list-view`,
      component: _import('aw/user/list/view'),
      meta: {
        ...meta,
        title: '查看用户详情'
      }
    },
    {
      path: 'log',
      name: `${pre}log`,
      component: _import('aw/user/log'),
      meta: {
        ...meta,
        title: '登录日志'
      }
    }
  ])('aw-user-')
}
