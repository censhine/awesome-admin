<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true" plain round>
      <aw-icon name="question-circle-o" class="aw-mr-5"/>
      需要帮助吗
    </el-button>
    <el-dialog
      title="帮助"
      width="600px"
      :visible.sync="dialogVisible"
      :append-to-body="true">
      <div style="margin-top: -25px;">
        <h2 class="aw-mt-0">
          这里有一些参考资料
        </h2>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false
    }
  }
}
</script>

<style lang="scss" scoped>
.aw-help--qr-info {
  background-color: #f4f4f5;
  color: #909399;
  width: 100%;
  padding: 8px 16px;
  margin: 0;
  box-sizing: border-box;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  opacity: 1;
  display: flex;
  align-items: center;
  transition: opacity .2s;
}
</style>
