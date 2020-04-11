<template>
  <aw-container type="ghost">
    <aw-module-index-banner slot="header" v-bind="banner"/>
    <aw-module-index-menu :menu="menu"/>
  </aw-container>
</template>

<script>
import menu from '@/menu/modules/demo-frame'
export default {
  data () {
    return {
      menu,
      banner: {
        title: 'FRAME',
        subTitle: '在 awadmin 中嵌入其它页面'
      }
    }
  }
}
</script>
