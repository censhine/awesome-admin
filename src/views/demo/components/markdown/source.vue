<template>
  <aw-container>
    <template slot="header">指定资源</template>
    <aw-markdown :source="doc" highlight/>
  </aw-container>
</template>

<script>
import doc from './md/doc.md'
export default {
  data () {
    return {
      doc
    }
  }
}
</script>
