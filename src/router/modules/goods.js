import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/aw/goods',
  name: 'aw-goods',
  meta,
  redirect: { name: 'aw-goods-index' },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'index',
      name: `${pre}index`,
      component: _import('aw/goods/index'),
      meta: {
        ...meta,
        title: '商品类别'
      }
    },
    {
      path: 'category',
      name: `${pre}category`,
      component: _import('aw/goods/category'),
      meta: {
        ...meta,
        title: '商品分类'
      }
    },
    {
      path: 'category/add',
      name: `${pre}category-add`,
      component: _import('aw/goods/category/add'),
      meta: {
        ...meta,
        title: '添加分类'
      }
    },
    {
      path: 'brand',
      name: `${pre}brand`,
      component: _import('aw/goods/brand'),
      meta: {
        ...meta,
        title: '品牌管理'
      }
    },
    {
      path: 'spec',
      name: `${pre}spec`,
      component: _import('aw/goods/spec'),
      meta: {
        ...meta,
        title: '规格管理'
      }
    },
    {
      path: 'comments',
      name: `${pre}comments`,
      component: _import('aw/goods/comments'),
      meta: {
        ...meta,
        title: '评论管理'
      }
    },
    {
      path: 'comments/detail',
      name: `${pre}comments-detail`,
      component: _import('aw/goods/comments/detail'),
      meta: {
        ...meta,
        title: '查看评论'
      }
    }
  ])('aw-goods-')
}
