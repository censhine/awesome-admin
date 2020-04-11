<template>
  <aw-container>
    <template slot="header">代码高亮组件</template>
    <el-card shadow="never" class="aw-mb">
      <p slot="title">javascript</p>
      <aw-highlight :code="codeJavascript"/>
    </el-card>
    <el-card shadow="never" class="aw-mb">
      <p slot="title">css</p>
      <aw-highlight :code="codeCSS"/>
    </el-card>
    <el-card shadow="never" class="aw-mb">
      <p slot="title">scss</p>
      <aw-highlight :code="codeSCSS"/>
    </el-card>
    <el-card shadow="never">
      <p slot="title">html</p>
      <aw-highlight :code="codeHTML"/>
    </el-card>
  </aw-container>
</template>

<script>
import codeJavascript from './code/javascript'
import codeCSS from './code/css'
import codeSCSS from './code/scss'
import codeHTML from './code/html'
export default {
  data () {
    return {
      codeJavascript,
      codeCSS,
      codeSCSS,
      codeHTML
    }
  }
}
</script>
