// Vue
import Vue from 'vue'
import i18n from './i18n'
import App from './App'
// 核心插件
import awadmin from '@/plugin/awadmin'
// store
import store from '@/store/index'

import serverConfig from "@/plugin/axios/serverConfig";

// 菜单和路由设置
import router from './router'
import { menuHeader, menuAside } from '@/menu'
import { frameInRoutes } from '@/router/routes'

// 核心插件
Vue.use(awadmin)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created () {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('awadmin/page/init', frameInRoutes)
    // 设置顶栏菜单
    this.$store.commit('awadmin/menu/headerSet', menuHeader)
    // 初始化菜单搜索功能
    this.$store.commit('awadmin/search/init', menuHeader)
  },
  mounted () {
    // 展示系统信息
    this.$store.commit('awadmin/releases/versionShow')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('awadmin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('awadmin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('awadmin/fullscreen/listen')
  },
  watch: {
    // 检测路由变化切换侧边栏内容
    '$route.matched': {
      handler (matched) {
        if (matched.length > 0) {
          const _side = menuAside.filter(menu => menu.path === matched[0].path)
          this.$store.commit('awadmin/menu/asideSet', _side.length > 0 ? _side[0].children : [])
        }
      },
      immediate: true
    }
  }
}).$mount('#app')
