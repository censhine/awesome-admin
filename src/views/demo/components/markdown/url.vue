<template>
  <aw-container>
    <template slot="header">异步加载文件</template>
    <aw-markdown url="markdown/demo.md"/>
  </aw-container>
</template>

<script>
export default {
  data () {
    return {
      filename: __filename
    }
  }
}
</script>
