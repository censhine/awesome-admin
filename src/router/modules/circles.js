import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/aw/circles',
  name: 'aw-circles',
  meta,
  redirect: { name: 'aw-circles-banner' },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'banner',
      name: `${pre}banner`,
      component: _import('aw/circles/banner'),
      meta: {
        ...meta,
        title: '轮播图管理'
      }
    },
    {
      path: 'banner/view',
      name: `${pre}banner-view`,
      component: _import('aw/circles/banner/view'),
      meta: {
        ...meta,
        title: '申请详情'
      }
    },
    {
      path: 'store',
      name: `${pre}store`,
      component: _import('aw/circles/store'),
      meta: {
        ...meta,
        title: '官方店铺管理'
      }
    },
    {
      path: 'store/detail',
      name: `${pre}store-detail`,
      component: _import('aw/circles/store/detail'),
      meta: {
        ...meta,
        title: '店铺详情'
      }
    },
    {
      path: 'goods',
      name: `${pre}goods`,
      component: _import('aw/circles/goods'),
      meta: {
        ...meta,
        title: '本地推荐管理'
      }
    },
    {
      path: 'brand',
      name: `${pre}brand`,
      component: _import('aw/circles/brand'),
      meta: {
        ...meta,
        title: '品牌推荐管理'
      }
    },
  ])('aw-circles-')
}
