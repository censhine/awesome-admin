export default {
  path: '/aw/contract',
  title: '合同管理',
  icon: 'flask',
  children: (pre => [
    {
      title: '签约合同',
      icon: 'table',
      path: `${pre}index`
    }
  ])('/aw/contract/')
}
