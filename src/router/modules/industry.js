import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/aw/industry',
  name: 'aw-industry',
  meta,
  redirect: { name: 'aw-industry-index' },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'index',
      name: `${pre}index`,
      component: _import('aw/industry/index'),
      meta: {
        ...meta,
        title: '行业列表'
      }
    },
    {
      path: 'add',
      name: `${pre}add`,
      component: _import('aw/industry/add'),
      meta: {
        ...meta,
        title: '添加行业'
      }
    },
    {
      path: 'edit',
      name: `${pre}edit`,
      component: _import('aw/industry/edit'),
      meta: {
        ...meta,
        title: '编辑行业'
      }
    },
  ])('aw-industry-')
}
