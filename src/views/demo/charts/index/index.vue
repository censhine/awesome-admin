<template>
  <aw-container type="ghost">
    <aw-module-index-banner slot="header" v-bind="banner"/>
    <aw-module-index-menu :menu="menu"/>
  </aw-container>
</template>

<script>
import menu from '@/menu/modules/demo-charts'
export default {
  data () {
    return {
      menu,
      banner: {
        title: 'CHARTS',
        subTitle: '图表示例'
      }
    }
  }
}
</script>
