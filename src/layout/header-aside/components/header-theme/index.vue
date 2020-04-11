<template>
  <div>
    <el-tooltip
      effect="dark"
      content="主题"
      placement="bottom">
      <el-button
        class="aw-ml-0 aw-mr btn-text can-hover"
        type="text"
        @click="dialogVisible = true">
        <aw-icon
          name="diamond"
          style="font-size: 16px"/>
      </el-button>
    </el-tooltip>
    <el-dialog
      title="主题"
      width="600px"
      :visible.sync="dialogVisible"
      :append-to-body="true">
      <aw-theme-list style="margin-top: -25px;"/>
    </el-dialog>
  </div>
</template>

<script>
import themeList from './components/aw-theme-list'
export default {
  components: {
    'aw-theme-list': themeList
  },
  data () {
    return {
      dialogVisible: false
    }
  }
}
</script>
