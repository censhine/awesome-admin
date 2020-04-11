<template>
  <aw-container type="ghost">
    <aw-module-index-banner slot="header" v-bind="banner"/>
    <aw-module-index-menu :menu="menu"/>
  </aw-container>
</template>

<script>
import menu from '@/menu/modules/demo-plugins'
export default {
  data () {
    return {
      menu,
      banner: {
        title: 'PLUGIN',
        subTitle: 'awadmin 集成了许多实用插件'
      }
    }
  }
}
</script>
