<template>
  <aw-container type="card" better-scroll>
    <template slot="header">Header</template>
    <aw-demo-article/>
    <template slot="footer">Footer</template>
  </aw-container>
</template>

<script>
import awDemoArticle from './components/aw-demo-article'
export default {
  components: {
    'aw-demo-article': awDemoArticle
  },
  data () {
    return {
      filename: __filename
    }
  }
}
</script>
