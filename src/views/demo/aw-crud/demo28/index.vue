<template>
  <aw-container>
    <template slot="header">自定义加载状态</template>
    <el-button @click="handleLoading">点我切换加载状态</el-button>
    <aw-crud
      style="margin-top: 10px"
      :columns="columns"
      :data="data"
      :loading="loading"
      :loading-options="loadingOptions"/>
    <el-card shadow="never" class="aw-mb">
      <aw-markdown :source="doc"/>
    </el-card>
    <el-card shadow="never" class="aw-mb">
      <aw-highlight :code="code"/>
    </el-card>
    <aw-link-btn
      slot="footer"
      title="文档"
      link="https://d2.pub/zh/doc/aw-crud-v2"/>
  </aw-container>
</template>

<script>
import '../install'
import doc from './doc.md'
import code from './code.js'

export default {
  data () {
    return {
      doc,
      code,
      columns: [
        {
          title: '日期',
          key: 'date'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '地址',
          key: 'address'
        }
      ],
      data: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      loading: true,
      loadingOptions: {
        text: '拼命加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
      }
    }
  },
  methods: {
    handleLoading () {
      this.loading = !this.loading
    }
  }
}
</script>
