export default {
  path: '/aw/goods',
  title: '商品管理',
  icon: 'flask',
  children: (pre => [
    {
      title: '分类管理',
      path: `${pre}category`
    },
    {
      title: '品牌管理',
      path: `${pre}brand`
    },
    { path: `${pre}index`, title: '分类管理2' },
    { path: `${pre}spec`, title: '规格管理' },
  ])('/aw/goods/')
}
