export default {
  path: '/aw/{{MODULES}}',
  title: '{{TITLE}}',
  icon: 'flask',
  children: (pre => [
    {
      title: '{{C_TITLE1}}',
      path: `${pre}{{C_PATH1}}`
    },
    {
      title: '{{C_TITLE2}}',
      path: `${pre}{{C_PATH2}}`
    },
    {
      title: '{{C_TITLE3}}',
      path: `${pre}{{C_PATH3}}`
    }
  ])('/aw/{{MODULES}}/')
}
