<template>
  <aw-container type="ghost">
    <aw-module-index-banner slot="header" v-bind="banner"/>
    <aw-module-index-menu :menu="menu"/>
  </aw-container>
</template>

<script>
import menu from '@/menu/modules/demo-components'
export default {
  data () {
    return {
      menu,
      banner: {
        title: 'COMPONENTS',
        subTitle: 'awadmin 为你提供了一些上手即用的组件'
      }
    }
  }
}
</script>
