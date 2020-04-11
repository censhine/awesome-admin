<template>
  <aw-container>
    <el-table
      :data="log"
      size="mini"
      style="width: 100%"
      empty-text="暂无日志信息"
      stripe>
      <!-- 时间 -->
      <el-table-column
        prop="id"
        label="编号"
        width="140">
      </el-table-column>
      <!-- 信息 -->
      <el-table-column
        prop="addTime"
        label="时间">
      </el-table-column>
      <!-- 触发页面 -->
      <el-table-column
        prop="ipAddress"
        label="IP"
        align="center"
        min-width="200">
      </el-table-column>
      <!-- 触发组件 -->
      <el-table-column
        prop="area"
        label="地区"
        align="center"
        min-width="120">
      </el-table-column>
      <!--设备-->
      <el-table-column
        prop="device"
        label="设备"
        align="center"
        min-width="120">
      </el-table-column>
    </el-table>

    <aw-crud
      :columns="columns"
      :data="log"
      :loading="loading"
      :pagination="pagination"
      @pagination-current-change="paginationCurrentChange"/>

    <el-button style="display: none"
      slot="footer"
      type="primary"
      size="mini"
      :loading="uploading"
      @click="handleUpload">
      <aw-icon name="cloud-upload"/>
      Upload {{log.length}} log data
    </el-button>
  </aw-container>
</template>

<script>
import { mapState } from 'vuex'
import { get } from 'lodash'
export default {
  data () {
    return {
      uploading: false,
      log: [{
        id: 1,
        addTime: '2020-03-30',
        ipAddress: '192.168.101.188',
        device: 'chromePC浏览器',
        area: '广东深圳'
      },
        {
          id: 2,
          addTime: '2020-03-30',
          ipAddress: '192.168.101.188',
          device: 'chromePC浏览器',
          area: '广东深圳'
        }
      ]
    }
  },
  computed: {
    // ...mapState('awadmin/log', [
    //   'log'
    // ])
  },
  methods: {
    get,
    handleShowMore (log) {
      // 打印一条日志的所有信息到控制台
      this.$notify({
        type: 'info',
        title: '日志详情',
        message: '完整的日志内容已经打印到控制台'
      })
      this.$log.capsule('awadmin', 'handleShowMore', 'primary')
      console.group(log.message)
      console.log('time: ', log.time)
      console.log('type: ', log.type)
      console.log(log.meta)
      console.groupEnd()
    },
    // 日志上传
    handleUpload () {
      this.uploading = true
      this.$notify({
        type: 'info',
        title: '日志上传',
        message: `开始上传${this.log.length}条日志`
      })
      setTimeout(() => {
        this.uploading = false
        this.$notify({
          type: 'success',
          title: '日志上传',
          message: '上传成功'
        })
      }, 3000)
    }
  }
}
</script>

<style>
  .el-table thead{
    color: #333;
  }
</style>
