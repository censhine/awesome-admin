import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/aw/{{MODULES}}',
  name: 'aw-{{MODULES}}',
  meta,
  redirect: { name: 'aw-{{MODULES}}-index' },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: '{{C_PATH1}}',
      name: `${pre}{{C_PATH1}}`,
      component: _import('aw/{{MODULES}}/{{C_PATH1}}'),
      meta: {
        ...meta,
        title: '{{C_TITLE1}}'
      }
    },
    {
      path: '{{C_PATH2}}',
      name: `${pre}{{C_PATH2}}`,
      component: _import('aw/{{MODULES}}/{{C_PATH2}}'),
      meta: {
        ...meta,
        title: '{{C_TITLE2}}'
      }
    },
    {
      path: '{{C_PATH3}}',
      name: `${pre}{{C_PATH3}}`,
      component: _import('aw/{{MODULES}}/{{C_PATH3}}'),
      meta: {
        ...meta,
        title: '{{C_TITLE3}}'
      }
    },
  ])('aw-{{MODULES}}-')
}
