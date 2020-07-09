import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/zis/permissions',
  name: 'zis-permissions',
  meta,
  component: layoutHeaderAside,
  children: (pre => [
  	 { path: 'user', name: `${pre}user`, component: _import('zis/permissions/user'), meta: { ...meta, title: '用户管理' } },
  	 { path: 'logList', name: `${pre}logList`, component: _import('zis/permissions/user/logList'), meta: { ...meta, title: '登陆日志' } },
  	 { path: 'role', name: `${pre}role`, component: _import('zis/permissions/role'), meta: { ...meta, title: '角色管理' } },
  	 { path: 'role/create', name: `${pre}create`, component: _import('zis/permissions/role/create'), meta: { ...meta, title: '添加角色' } },
  	 { path: 'role/edit', name: `${pre}edit`, component: _import('zis/permissions/role/edit'), meta: { ...meta, title: '编辑角色' } },
  ])('zis-permissions-')
}