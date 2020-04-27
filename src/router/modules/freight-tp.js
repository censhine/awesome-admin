import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/aw/freight-tp',
  name: 'aw-freight-tp',
  meta,
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'index', name: `${pre}index`, component: _import('aw/freight-tp/index'), meta: { ...meta, title: '运费模板' } },
    { path: `company`,name:`${pre}company`,component: _import('aw/freight-tp/company'), meta: { ...meta,title: '物流公司'} },
  ])('aw-freight-tp-')
}
