import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/aw/applications',
  name: 'aw-applications',
  meta,
  redirect: { name: 'aw-applications-age' },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'age',
      name: `${pre}age`,
      component: _import('aw/applications/age'),
      meta: {
        ...meta,
        title: '商家资料审核'
      }
    },
    {
      path: 'age/view',
      name: `${pre}age-view`,
      component: _import('aw/applications/age/view'),
      meta: {
        ...meta,
        title: '申请详情'
      }
    },
    {
      path: 'sup',
      name: `${pre}sup`,
      component: _import('aw/applications/sup'),
      meta: {
        ...meta,
        title: '供应商资料审核'
      }
    },
    {
      path: 'layer',
      name: `${pre}layer`,
      component: _import('aw/applications/layer'),
      meta: {
        ...meta,
        title: '律师资料审核'
      }
    }
  ])('aw-applications-')
}
