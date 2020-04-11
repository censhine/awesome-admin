import Vue from 'vue'

import awContainer from './aw-container'
import awContainerFrame from './aw-container-frame'
import awLinkBtn from './aw-link-btn'
import awsContainer from './aws-container'

// 注意 有些组件使用异步加载会有影响
Vue.component('aw-container', awContainer)
Vue.component('aws-container', awsContainer)
Vue.component('aw-container-frame', awContainerFrame)
Vue.component('aw-link-btn', awLinkBtn)
Vue.component('aw-count-up', () => import('./aw-count-up'))
Vue.component('aw-highlight', () => import('./aw-highlight'))
Vue.component('aw-icon', () => import('./aw-icon'))
Vue.component('aw-icon-svg', () => import('./aw-icon-svg/index.vue'))
Vue.component('aw-icon-select', () => import('./aw-icon-select/index.vue'))
Vue.component('aw-icon-svg-select', () => import('./aw-icon-svg-select/index.vue'))
Vue.component('aw-markdown', () => import('./aw-markdown'))
Vue.component('aw-mde', () => import('./aw-mde'))
Vue.component('aw-module-index-banner', () => import('./aw-module-index-banner'))
Vue.component('aw-module-index-menu', () => import('./aw-module-index-menu'))
Vue.component('aw-quill', () => import('./aw-quill'))
Vue.component('aw-ueditor', () => import('./aw-ueditor'))
