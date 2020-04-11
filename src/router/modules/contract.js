import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/aw/contract',
  name: 'aw-contract',
  meta,
  redirect: { name: 'aw-contract-index' },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'index',
      name: `${pre}index`,
      component: _import('aw/contract/index'),
      meta: {
        ...meta,
        title: '签约合同'
      }
    }
  ])('aw-contract-')
}
