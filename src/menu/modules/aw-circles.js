export default {
  path: '/aw/circles',
  title: '商圈管理',
  children: (pre => [
    { path: `${pre}index`, title: '资料审核管理', icon: 'home' },
    {
      title: '轮播图管理',
      path: `${pre}banner`,
      icon: ''
    },
    {
      title: '官方店铺管理',
      icon: '',
      path: `${pre}store`,
    },
    {
      path: `${pre}goods`,
      title: '本地推荐管理',
      icon: ''
    },
    {
      path: `${pre}brand`,
      title: '品牌推荐管理',
      icon: ''
    }
  ])('/aw/circles/')
}
