<template>
  <aw-container>
    <aw-mde
      v-model="text"
      class="mde"/>
    <el-card shadow="never" class="aw-card">
      <pre>{{text}}</pre>
    </el-card>
  </aw-container>
</template>

<script>
import text from './text'
export default {
  data () {
    return {
      text
    }
  }
}
</script>

<style lang="scss" scoped>
.mde {
  margin-bottom: -16px;
}
</style>
