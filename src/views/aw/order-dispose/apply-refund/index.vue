<template>
  <d2-container>
    <div class="btn-group">
      <span class="btn-list"
            :class="{'active':index===zIndex}"
            v-for="(item,index) in btns" :key="index"
            @click="tabBtn(index)"
      >{{item.btnText}} <i>({{item.num}})</i>  </span>
    </div>
    <el-form
      :inline="true"
      :model="form"
      ref="form"
      size="mini"
      style="margin:20px 0 0px;padding: 10px 10px 0;background: #fff"
    >
      <el-form-item label="输入搜索：" prop="user">
        <el-input
          v-model="form.serviceNum"
          placeholder="服务单号"
          style="width: 140px;"/>
      </el-form-item>
      <el-form-item label="提交时间：" prop="date" >
        <el-date-picker
		      v-model="form.date"
		      type="daterange"
		      style='width: 330px;'
		      range-separator="至"
		      start-placeholder="开始日期"
		      end-placeholder="结束日期">
		    </el-date-picker>
      </el-form-item>
      <el-form-item label="处理状态：" prop="type">
        <el-select
          v-model="form.status"
          placeholder="请选择状态"
          style="width: 160px;">
          <el-option label="状态 1" value="1"/>
          <el-option label="状态 2" value="2"/>
          <el-option label="状态 3" value="3"/>
          <el-option label="状态 4" value="4"/>
          <el-option label="状态 5" value="5"/>
        </el-select>
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
          type="primary"
          @click="exportExcel">
          <d2-icon name="download"/>
          导出数据
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
      style="width: 100%">
      <el-table-column v-for='(item,index) in columns'
      	:key='index'
      	:prop='item.prop'
      	:label='item.label'
      	:align='item.align'
      	>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
        	<el-button type="text" @click="goDetail(scope.row)"   size="mini">查看详情</el-button>
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
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
 		>
      <span>你确定要删除该商品吗？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>

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
          serviceNum:'',
          status: '',
          date:''
        },
        dialogVisible: false,
        currentPage1:5,
        btns:[
          {
            btnText:'全部申请',
            num:1000
          },
          {
            btnText:'待处理',
            num:1000
          },
          {
            btnText:'退货中',
            num:1000
          },
          {
            btnText:'已拒绝',
            num:1000
          }
        ],
        zIndex:0,
        columns:[
        		{
        			label:'服务单号',
        			prop:'serviceNum',
        			align:'center'
        		},
        		{
        			label:'申请时间',
        			prop:'createTime',
        			align:'center'
        		},
        		{
        			label:'用户账号',
        			prop:'userAccount',
        			align:'center'
        		},
        		{
        			label:'退款金额',
        			prop:'returnAmount',
        			align:'center'
        		},
        		{
        			label:'申请状态',
        			prop:'applyStatus',
        			align:'center'
        		},
        		{
        			label:'处理时间',
        			prop:'disposeTime',
        			align:'center'
        		},

        ],
        tableData: [{
          serviceNum: '131510',
          createTime: '2020-04-02 15:30:00',
          userAccount:'13612345678',
          returnAmount:'1000',
          applyStatus:'0',
          disposeTime:'2020-04-02 15:30:00',

        },
          {
            serviceNum: '182210',
            createTime: '2020-04-05 15:30:00',
            userAccount:'13874569856',
            returnAmount:'800',
            applyStatus:'2',
            disposeTime:'2020-04-02 15:30:00',

          }],
      }
    },
    methods: {
      handleClick(row) {
        console.log(row);
        this.dialogVisible = true;
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
      goDetail(){
      	this.$router.push({
      		path:'/zis/order-dispose/apply-refund/detail'
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

