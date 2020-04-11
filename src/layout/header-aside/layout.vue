<template>
  <div class="aw-layout-header-aside-group" :style="styleLayoutMainGroup" :class="{grayMode: grayActive}">
    <!-- 半透明遮罩 -->
    <div class="aw-layout-header-aside-mask"></div>
    <!-- 主体内容 -->
    <div class="aw-layout-header-aside-content" flex="dir:top">
      <!-- 顶栏 -->
      <div class="aw-theme-header" :style="{ opacity: this.searchActive ? 0.5 : 1 }" flex-box="0" flex>
        <router-link to="/index" class="logo-group" :style="{width: asideCollapse ? asideWidthCollapse : asideWidth}" flex-box="0">
          <img v-if="asideCollapse" :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/icon-only.png`">
          <img v-else :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/all.png`">
        </router-link>
        <div class="toggle-aside-btn" @click="handleToggleAside" flex-box="0">
          <aw-icon name="bars"/>
        </div>
        <aw-menu-header flex-box="1"/>
        <!-- 顶栏右侧 -->
        <div class="aw-header-right" flex-box="0">
          <!-- 如果你只想在开发环境显示这个按钮请添加 v-if="$env === 'development'" -->
          <aw-header-search @click="handleSearchClick"/>
          <aw-header-log/>
          <aw-header-fullscreen/>
          <aw-header-theme/>
          <aw-header-size/>
          <aw-header-locales/>
          <aw-header-color/>
          <aw-header-user/>
        </div>
      </div>
      <!-- 下面 主体 -->
      <div class="aw-theme-container" flex-box="1" flex>
        <!-- 主体 侧边栏 -->
        <div flex-box="0" ref="aside" class="aw-theme-container-aside" :style="{ width: asideCollapse ? asideWidthCollapse : asideWidth, opacity: this.searchActive ? 0.5 : 1 }">
          <aw-menu-side/>
        </div>
        <!-- 主体 -->
        <div class="aw-theme-container-main" flex-box="1" flex>
          <!-- 搜索 -->
          <transition name="fade-scale">
            <div v-if="searchActive" class="aw-theme-container-main-layer" flex>
              <aw-panel-search ref="panelSearch" @close="searchPanelClose"/>
            </div>
          </transition>
          <!-- 内容 -->
          <transition name="fade-scale">
            <div v-if="!searchActive" class="aw-theme-container-main-layer" flex="dir:top">
              <!-- tab -->
              <div class="aw-theme-container-main-header" flex-box="0">
                <aw-tabs/>
              </div>
              <!-- 页面 -->
              <div class="aw-theme-container-main-body" flex-box="1">
                <transition :name="transitionActive ? 'fade-transverse' : ''">
                  <keep-alive :include="keepAlive">
                    <router-view/>
                  </keep-alive>
                </transition>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import awMenuSide from './components/menu-side'
import awMenuHeader from './components/menu-header'
import awTabs from './components/tabs'
import awHeaderFullscreen from './components/header-fullscreen'
import awHeaderLocales from './components/header-locales'
import awHeaderSearch from './components/header-search'
import awHeaderSize from './components/header-size'
import awHeaderTheme from './components/header-theme'
import awHeaderUser from './components/header-user'
import awHeaderLog from './components/header-log'
import awHeaderColor from './components/header-color'
import { mapState, mapGetters, mapActions } from 'vuex'
import mixinSearch from './mixins/search'
export default {
  name: 'aw-layout-header-aside',
  mixins: [
    mixinSearch
  ],
  components: {
    awMenuSide,
    awMenuHeader,
    awTabs,
    awHeaderFullscreen,
    awHeaderLocales,
    awHeaderSearch,
    awHeaderSize,
    awHeaderTheme,
    awHeaderUser,
    awHeaderLog,
    awHeaderColor
  },
  data () {
    return {
      // [侧边栏宽度] 正常状态
      asideWidth: '200px',
      // [侧边栏宽度] 折叠状态
      asideWidthCollapse: '65px'
    }
  },
  computed: {
    ...mapState('awadmin', {
      keepAlive: state => state.page.keepAlive,
      grayActive: state => state.gray.active,
      transitionActive: state => state.transition.active,
      asideCollapse: state => state.menu.asideCollapse
    }),
    ...mapGetters('awadmin', {
      themeActiveSetting: 'theme/activeSetting'
    }),
    /**
     * @description 最外层容器的背景图片样式
     */
    styleLayoutMainGroup () {
      return this.themeActiveSetting.backgroundImage
        ? { backgroundImage: `url('${this.$baseUrl}${this.themeActiveSetting.backgroundImage}')` }
        : {}
    }
  },
  methods: {
    ...mapActions('awadmin/menu', [
      'asideCollapseToggle'
    ]),
    /**
     * 接收点击切换侧边栏的按钮
     */
    handleToggleAside () {
      this.asideCollapseToggle()
    }
  }
}
</script>

<style lang="scss">
// 注册主题
@import '~@/assets/style/theme/register.scss';
</style>
