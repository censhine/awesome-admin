<template>
  <aw-container type="ghost">
    <aw-module-index-banner slot="header" v-bind="banner"/>
    <aw-module-index-menu :menu="menu"/>
  </aw-container>
</template>

<script>
import menu from '@/menu/modules/demo-playground'
export default {
  data () {
    return {
      menu,
      banner: {
        title: 'PLAYGROUND',
        subTitle: '在这里可以测试一些 awadmin 的系统功能'
      }
    }
  }
}
</script>
