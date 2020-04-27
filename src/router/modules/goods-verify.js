import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/aw/goods-verify',
  name: 'aw-goods-verify',
  meta,
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'index',
      name: `${pre}index`,
      component: _import('aw/goods-verify/index'),
      meta: {
        ...meta,
        title: '商品审核列表'
      }
    },
    {
      path: 'add',
      name: `${pre}add`,
      component: _import('aw/goods-verify/add'),
      meta: {
        ...meta,
        title: '添加商品'
      }
    },
    {
      path: 'detail',
      name: `${pre}detail`,
      component: _import('aw/goods-verify/detail'),
      meta: {
        ...meta,
        title: '商品详情'
      }
    },
  ])('aw-goods-verify-')
}
