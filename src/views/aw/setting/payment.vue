<template>
  <aw-container>
    <aw-header title="支付设置"></aw-header>
    <el-form
      :inline="true"
      :model="form"
      ref="form"
      size="mini"
      style="margin:20px 0 0px;padding: 10px 10px 0;background: #fff"
    >
      <el-form-item>
        <el-button size="mini" type="default"><i class="el-icon-refresh"></i> 刷新</el-button>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <el-table
      :data="tableData"
      border
    >
      <el-table-column
        type="selection"
        align="center"
      >
      </el-table-column>

      <el-table-column
        fixed
        prop="payment_name"
        label="支付方式名称"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="payment_desc"
        label="支付方式描述"
        align="center"
      ></el-table-column>


      <el-table-column
        prop="status"
        label="状态"
        align="center"
      >
        <template slot-scope="scope">
          <el-switch inactive-value="0" active-value="1" v-model="scope.row.status"></el-switch>
        </template>
      </el-table-column>

      <el-table-column
        prop="sort"
        label="排序"
        align="center"
      ></el-table-column>

      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="text" @click="goEdit(scope.row)"   size="mini">查看</el-button>
          <el-button type="text" style='color: red;' @click="handleClick(scope.$index)" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-divider></el-divider>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="10"
        :page-sizes="[10, 20, 30, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100">
      </el-pagination>
    </div>
  </aw-container>
</template>

<script>
  export default {
    data () {
      return {
        form: {
          type: '1',
          user: '',
          date:''
        },
        dialogVisible: false,
        currentPage1:5,
        zIndex:0,
        tableData: [{
          id: '131510',
          payment_name: '微信支付',
          payment_desc:'微信支付，是基于客户端提供的服务功能。同时向商户提供销售经营分析、账户和资金管理的功能支持。用户通过扫描二维码、微信内打开商品页面购买等多种方式调起微信支付模块完成支付。',
          sort: 1,
          status: '1'
        },
          {
            id: '131511',
            payment_name: '支付宝支付',
            payment_desc:'支付宝支付，是基于客户端提供的服务功能。同时向商户提供销售经营分析、账户和资金管理的功能支持。用户通过扫描二维码、微信内打开商品页面购买等多种方式调起微信支付模块完成支付。',
            sort: 2,
            status: '1'
          },{
            id: '131512',
            payment_name: '银联支付',
            payment_desc:'银联支付，是基于客户端提供的服务功能。同时向商户提供销售经营分析、账户和资金管理的功能支持。用户通过扫描二维码、微信内打开商品页面购买等多种方式调起微信支付模块完成支付。',
            sort: 3,
            status: '1'
          },{
            id: '131513',
            payment_name: '知豆支付',
            payment_desc:'知豆支付，是基于客户端提供的服务功能。同时向商户提供销售经营分析、账户和资金管理的功能支持。用户通过扫描二维码、微信内打开商品页面购买等多种方式调起微信支付模块完成支付。',
            sort: 4,
            status: '0'
          },{
            id: '131514',
            payment_name: '余额支付',
            payment_desc:'余额支付，是基于客户端提供的服务功能。同时向商户提供销售经营分析、账户和资金管理的功能支持。用户通过扫描二维码、微信内打开商品页面购买等多种方式调起微信支付模块完成支付。',
            sort: 5,
            status: '1'
          },{
            id: '131514',
            payment_name: 'FNT支付',
            payment_desc:'FNT支付，是基于客户端提供的服务功能。同时向商户提供销售经营分析、账户和资金管理的功能支持。用户通过扫描二维码、微信内打开商品页面购买等多种方式调起微信支付模块完成支付。',
            sort: 6,
            status: '0'
          }],
        contract1:{'0':'代理合同','1':'购销合同'},
        contract2:{'0':'合格','1':'不合格','3':'--'},
        contract3:{'0':'待接单','1':'待公正','2':'已公正','3':'已拒签','4':'已生效','5':'已过期','6':'已作废'}
      }
    },
    methods: {
      handleClick(index) {
        this.$confirm('你确定要删除此模板吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData.splice(index,1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      tabBtn(index){
        this.zIndex = index;
      },
      handleFormSubmit () {
        console.log('11111')
      },
      handleFormReset () {
        this.refresh();
      },
      handleSelectionChange (selection) {
        console.log(selection)
      },
      refresh(){
        location.reload();
      },
      goEdit(row){
        this.$router.push({
          path:'/aw/setting/payment-edit',
          query:row
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      exportExcel () {
        this.$export.excel({
          columns: this.columns,
          data: this.tableData,
          header: '导出合同列表',
          merges: ['A1', 'E1']
        })
          .then(() => {
            this.$message('导出表格成功')
          })
      }
    }
  }
</script>

<style scoped lang="scss">
  .btn-group{
    .btn-list{
      display: inline-block;
      width: 120px;
      text-align: center;
      line-height: 34px;
      margin-right: 10px;
      border: 1px solid #ccc;
      cursor: pointer;
      &.active{
        background: #409EFF;
        color: #fff;
        border: 1px solid #409EFF;
      }
    }
  }
  .page{
    margin-top: 40px;
  }

</style>
