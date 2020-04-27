<template>
  <div class="box-contrainer">
    <el-table border :data="tableData">
      <el-table-column label="头像" prop="header_img" align="center">
        <template slot-scope="scope">
          <el-image :src="scope.row.header_img" style="height: 30px; width: 30px;"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="昵称" prop="nick_name" align="center"></el-table-column>
      <el-table-column label="开始时间" prop="start_time" align="center"></el-table-column>
      <el-table-column label="结束时间" prop="end_time" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleView(scope.$index)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <page-footer
        slot="footer"
        :loading="loading"
        :current="page.current"
        :size="page.size"
        :total="page.total"
        @change="handlePaginationChange"/>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
        return {
          loading: false,
          page:{
            size: 0,
            current: 1,
            total:0
          }
        }
    },
    mounted() {
      Promise.all([
        //getGoodsCategoryList(null),
        this.$store.dispatch('d2admin/db/databasePage', { user: true })
      ])
        .then(res => {
          //this.cat = util.formatDataToTree(res[0].data, 'goods_category_id')
          this.page.size = res[1].get('size').value() || 25
        })
        .then(() => {
          //this.handleSubmit()
        })
    },
    components:{
      'PageFooter': () => import('@/layout/header-aside/components/footer')
    },
    props: {
      tableData: Array,
      default: []
    },
    methods: {
      // 分页变化改动
      handlePaginationChange(val) {
        this.page = val
        this.$nextTick(() => {
          this.$refs.header.handleFormSubmit()
        })
      },
      handleView(index) {
        this.$bus.emit('handleParentView', index)
      }
    }
  }
</script>

<style scoped>

</style>
