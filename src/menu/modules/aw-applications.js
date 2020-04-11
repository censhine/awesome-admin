export default {
  path: '/aw/applications',
  title: '资料审核管理',
  icon: 'flask',
  children: (pre => [
    { path: `${pre}index`, title: '资料审核管理', icon: 'home' },
    {
      title: '商家资料审核',
      icon: 'table',
      path: `${pre}age`
    },
    {
      title: '供应商资料审核',
      icon: 'table',
      path: `${pre}sup`
    },
    {
      path: `${pre}layer`,
      title: '律师资料审核',
      icon: 'table'
    }
  ])('/aw/applications/')
}
