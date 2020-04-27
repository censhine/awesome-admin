<template>

  <el-dialog title="聊天记录" ref="detail" :visible.sync="dialogTableVisible">
    <el-button type="default" size="mini" style="float: right; margin-top: 20px; margin-bottom: 20px">导出聊天记录</el-button>
    <el-table :data="gridData" border>
      <el-table-column property="name" label="姓名" width="200" align="center"></el-table-column>
      <el-table-column property="msg" label="聊天内容" align="left"></el-table-column>
      <el-table-column property="date" label="聊天日期" width="150" align="center"></el-table-column>
    </el-table>

    <div style="margin-top: 20px; padding-bottom: 20px;">
      <page-footer
        slot="footer"
        :loading="loading"
        :current="page.current"
        :size="page.size"
        :total="page.total"
        @change="handlePaginationChange"/>
    </div>

  </el-dialog>

</template>

<script>
export default {
  components:{
    'PageFooter': () => import('@/layout/header-aside/components/footer')
  },
  data() {
    return {
      loading: false,
      page:{
        size: 0,
        current: 1,
        total:0
      },
      gridData: [{
        date: '2016-05-02 10:20:30',
        name: '小优',
        msg: '您好！小优很高兴为您服务~活动期间咨询人数较多，请您耐心等候！'
      }, {
        date: '2016-05-02 10:20:30',
        name: '王小虎',
        msg: '您好！小优很高兴为您服务~活动期间咨询人数较多，请您耐心等候！'
      }, {
        date: '2016-05-02 10:20:30',
        name: '小优',
        msg: '您好！小优很高兴为您服务~活动期间咨询人数较多，请您耐心等候！'
      }, {
        date: '2016-05-02 10:20:30',
        name: '王小虎',
        msg: '您好！小优很高兴为您服务~活动期间咨询人数较多，请您耐心等候！'
      }],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
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
  methods: {
    // 分页变化改动
    handlePaginationChange(val) {
      this.page = val
      this.$nextTick(() => {
        this.$refs.header.handleFormSubmit()
      })
    },
    openDialog(data, isVisible) {
      if(data !== ''){
        this.dialogTableVisible = isVisible
      }
    }
  }
}
</script>

<style scoped>

</style>
