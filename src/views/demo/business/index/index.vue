<template>
  <aw-container type="ghost">
    <aw-module-index-banner slot="header" v-bind="banner"/>
    <aw-module-index-menu :menu="menu"/>
  </aw-container>
</template>

<script>
import menu from '@/menu/modules/demo-business'
export default {
  data () {
    return {
      menu,
      banner: {
        title: 'DEMOS',
        subTitle: '提供借鉴和参考的页面'
      }
    }
  }
}
</script>
