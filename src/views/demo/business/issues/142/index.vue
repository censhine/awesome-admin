<template>
  <aw-container type="card">
    <aw-crud
      v-bind="crud"
      @edit="({ index, row }) => goToEditPage('demo-business-issues-142-edit', row.id)"
      @edit-cache-db="({ index, row }) => goToEditPage('demo-business-issues-142-edit-cache-db', row.id)"
      style="margin: -15px 0;"/>
    <aw-link-btn
      slot="footer"
      title="issue #142"
      link="https://github.com/aw-projects/aw-admin/issues/142"/>
  </aw-container>
</template>

<script>
// API
import {
  fetch
} from '@/api/demo.business.issues.142'

export default {
  data () {
    return {
      crud: {
        columns: [
          { title: '姓名', key: 'name', width: 100 },
          { title: '地址', key: 'address' }
        ],
        data: [],
        options: {
          border: true,
          size: 'mini'
        },
        rowHandle: {
          align: 'center',
          width: 240,
          custom: [
            {
              text: '无缓存编辑',
              size: 'mini',
              emit: 'edit'
            },
            {
              text: '带缓存编辑 DB',
              size: 'mini',
              emit: 'edit-cache-db'
            }
          ]
        }
      }
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    // 请求表格数据
    getTableData () {
      fetch()
        .then(res => {
          this.crud.data = res.list
        })
        .catch(err => console.log(err))
    },
    // 跳转到编辑页面
    goToEditPage (name, id) {
      this.$router.push({
        name,
        params: {
          id
        }
      })
    }
  }
}
</script>
