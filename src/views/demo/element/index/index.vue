<template>
  <aw-container type="ghost">
    <aw-module-index-banner slot="header" v-bind="banner"/>
    <aw-module-index-menu :menu="menu"/>
  </aw-container>
</template>

<script>
import menu from '@/menu/modules/demo-element'
export default {
  data () {
    return {
      menu,
      banner: {
        title: 'ElementUI',
        subTitle: 'awadmin 集成由饿了么出品的 ElementUI',
        link: 'http://element.eleme.io'
      }
    }
  }
}
</script>
