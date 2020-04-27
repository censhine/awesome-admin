import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/aw/rights',
  name: 'aw-rights',
  meta,
  redirect: { name: 'aw-rights-index' },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'depart',
      name: `${pre}depart`,
      component: _import('aw/rights/depart'),
      meta: {
        ...meta,
        title: '部门管理'
      }
    },
    {
      path: 'member',
      name: `${pre}member`,
      component: _import('aw/rights/member'),
      meta: {
        ...meta,
        title: '成员管理'
      }
    },
    {
      path: 'service',
      name: `${pre}service`,
      component: _import('aw/rights/service'),
      meta: {
        ...meta,
        title: '客服管理'
      }
    },
    {
      path: 'service/detail',
      name: `${pre}service-detail`,
      component: _import('aw/rights/service/detail'),
      meta: {
        ...meta,
        title: '客服详情'
      }
    },
    {
      path: 'log',
      name: `${pre}log`,
      component: _import('aw/rights/log'),
      meta: {
        ...meta,
        title: '操作日志'
      }
    },
    {
      path: 'setting',
      name: `${pre}depart-setting`,
      component: _import('aw/rights/depart/setting'),
      meta: {
        ...meta,
        title: '权限设置'
      }
    },
  ])('aw-rights-')
}
