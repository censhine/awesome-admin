<template>
  <aw-container>
    <template slot="header">图标</template>
    <h1 class="aw-mt-0">
      awadmin 已经集成 FontAwesome 图表库，提供约 1,000 个图标；并且准备好了图标组件
    </h1>
    <p>如果你愿意，你还可以随意使用 SVG 图标</p>
    <el-button-group>
      <el-button @click="$router.push({ path: '/demo/components/icon/list' })">
        <aw-icon name="link"/>
        图标列表
      </el-button>
      <el-button @click="$router.push({ path: '/demo/components/icon/icon' })">
        <aw-icon name="link"/>
        图标组件
      </el-button>
      <el-button @click="$router.push({ path: '/demo/components/icon/svg' })">
        <aw-icon name="link"/>
        svg 图标组件
      </el-button>
    </el-button-group>
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
