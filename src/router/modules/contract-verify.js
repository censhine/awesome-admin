import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/aw/contract-verify',
  name: 'aw-contract-verify',
  meta,
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'index', name: `${pre}index`, component: _import('aw/contract-verify/index'), meta: { ...meta, title: '合同列表' } },
    { path: 'detail', name: `${pre}detail`, component: _import('aw/contract-verify/detail'), meta: { ...meta, title: '合同详情' } },
    { path: 'add', name: `${pre}add`, component: _import('aw/contract-verify/add'), meta: { ...meta, title: '添加合同' } },
    { path: 'setting', name: `${pre}setting`, component: _import('aw/contract-verify/setting'), meta: { ...meta, title: '合同设置' } },
    { path: 'sign', name: `${pre}sign`, component: _import('aw/contract-verify/sign'), meta: { ...meta, title: '电子签名' } },
  ])('aw-contract-verify-')
}
