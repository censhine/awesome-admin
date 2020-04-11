<template>
  <aw-container type="ghost">
    <div class="aw-pt aw-pb">
      <el-card shadow="never" class="aw-card" style="width: 400px;">
        <aw-demo-article/>
      </el-card>
    </div>
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
