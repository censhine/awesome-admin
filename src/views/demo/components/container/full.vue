<template>
  <aw-container>
    <aw-demo-article/>
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
