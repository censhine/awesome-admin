<template>
  <aw-container>
    <template slot="header">分页</template>
    <aw-crud
      :columns="columns"
      :data="data"
      :loading="loading"
      :pagination="pagination"
      @pagination-current-change="paginationCurrentChange"/>
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
import { BusinessTable1List } from '@api/demo.business.table.1'

export default {
  data () {
    return {
      doc,
      code,
      columns: [
        {
          title: '卡密',
          key: 'key',
          width: 320
        },
        {
          title: '面值',
          key: 'value'
        },
        {
          title: '管理员',
          key: 'admin'
        },
        {
          title: '创建时间',
          key: 'dateTimeCreat'
        },
        {
          title: '使用时间',
          key: 'dateTimeUse'
        }
      ],
      data: [],
      loading: false,
      pagination: {
        currentPage: 1,
        pageSize: 5,
        total: 0
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData()
    },
    fetchData () {
      this.loading = true
      BusinessTable1List({
        ...this.pagination
      }).then(res => {
        this.data = res.list
        this.pagination.total = res.page.total
        this.loading = false
      }).catch(err => {
        console.log('err', err)
        this.loading = false
      })
    }
  }
}
</script>
