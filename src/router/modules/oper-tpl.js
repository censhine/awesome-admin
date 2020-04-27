import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/aw/oper-tpl',
  name: 'aw-oper-tpl',
  meta,
  redirect: { name: 'aw-oper-tpl-index' },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'index',
      name: `${pre}index`,
      component: _import('aw/oper-tpl/index'),
      meta: {
        ...meta,
        title: '运营模版列表'
      }
    },
    {
      path: 'tpl3',
      name: `${pre}tpl3`,
      component: _import('aw/oper-tpl/tpl3'),
      meta: {
        ...meta,
        title: '微店运营模板'
      }
    },
    {
      path: 'tpl2',
      name: `${pre}tpl2`,
      component: _import('aw/oper-tpl/tpl2'),
      meta: {
        ...meta,
        title: '大礼包模板'
      }
    },
    {
      path: 'tpl',
      name: `${pre}tpl`,
      component: _import('aw/oper-tpl/tpl'),
      meta: {
        ...meta,
        title: '掌柜礼包'
      }
    },
    {
      path: 'setting',
      name: `${pre}setting`,
      component: _import('aw/oper-tpl/setting'),
      meta: {
        ...meta,
        title: '平台设置'
      }
    },
  ])('aw-oper-tpl-')
}
