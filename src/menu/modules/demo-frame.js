export default {
  path: '/demo/frame',
  title: '内嵌网页',
  icon: 'globe',
  children: (pre => [
    { path: `${pre}index`, title: 'Frame ', icon: 'home' },
    { path: `${pre}aw-doc`, title: 'awadmin 中文文档', iconSvg: 'aw-admin' },
    { path: `${pre}html`, title: '静态 HTML', icon: 'code' }
  ])('/demo/frame/')
}
