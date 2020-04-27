<template>
  <d2-container>
    <el-form
      :inline="true"
      :model="form"
      ref="form"
      size="mini"
      style="margin:20px 0 0px;padding: 10px 10px 0;background: #fff"
    >
      <el-form-item label="输入搜索：" prop="user">
        <el-input
          v-model="form.user"
          placeholder="模板名称"
          style="width: 140px;"/>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="handleFormSubmit">
          <d2-icon name="search"/>
          查询
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          type="default"
          @click="handleFormReset">
          <d2-icon name="refresh"/>
          刷新
        </el-button>
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
        prop="id"
        label="ID"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="contract_name"
        label="模板名称"
        align="center"
      ></el-table-column>

        <el-table-column
          prop="create_time"
          label="创建人"
          align="center"
        >
        </el-table-column>

      <el-table-column
        prop="remarks"
        label="备注"
        align="center"
      >
      </el-table-column>

      <el-table-column
        prop="update_time"
        label="修改时间"
        align="center"
      >
      </el-table-column>

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
  </d2-container>
</template>

<script>
  import Vue from 'vue'
  import day from 'dayjs'
  import pluginExport from '@d2-projects/vue-table-export'
  Vue.use(pluginExport)
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
        btns:[
          {
            btnText:'代理合同',
            num:1000
          },
          {
            btnText:'购销合同',
            num:1000
          }
        ],
        zIndex:0,
        columns:[
          {
            label:'ID',
            prop:'id',
            align:'center'
          },
          {
            label:'合同名称',
            prop: 'contract_name',
            align: 'center'
          },
          {
            label:'备注',
            prop:'remarks',
            align:'center'
          },
          {
            label:'创建时间',
            prop:'create_time',
            align:'center'
          },
          {
            label:'修改时间',
            prop:'update_time',
            align:'center'
          },
          {
            label:'合同状态',
            prop:'status',
            align:'center'
          }
        ],
        tableData: [{
          id: '131510',
          contract_name: '代理合同',
          remarks:'简介简介简介简介简介简介简介简介简介简介',
          //contract_type: '0',
          create_time: '2017-08-05 15:47:20',
          update_time:  '2017-08-05 15:47:30',
          status: '1'
        },
          {
            id: '131510',
            contract_name: '代理合同',
            remarks:'简介简介简介简介简介简介简介简介简介简介',
            // contract_type: '0',
            create_time: '2017-08-05 15:47:20',
            update_time:  '2017-08-05 15:47:30',
            status: '0'
          },{
            id: '131511',
            contract_name: '代理合同',
            remarks:'简介简介简介简介简介简介简介简介简介简介',
            // contract_type: '0',
            create_time: '2017-08-05 15:47:20',
            update_time:  '2017-08-05 15:47:30',
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
      goEdit(){
        this.$router.push({
          path:'/zis/contract-verify/detail'
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
