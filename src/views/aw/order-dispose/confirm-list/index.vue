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
          v-model="form.keys"
          placeholder="订单编号/商品编号"
          style="width: 140px;"/>
      </el-form-item>
      <el-form-item label="收货人：" prop="user">
        <el-input
          v-model="form.user"
          placeholder="收货人/手机号"
          style="width: 140px;"/>
      </el-form-item>
       <el-form-item label="提交时间：" prop="date">
        <el-date-picker
		      v-model="form.date"
		      type="daterange"
		      range-separator="至"
		      start-placeholder="开始日期"
		      end-placeholder="结束日期">
		    </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="sendArr">
          一键确认收货
        </el-button>
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
      @selection-change="handleSelectionChange"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55"
        align="center"
      >
      </el-table-column>
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
        	<el-button type="text" @click="goEdit(scope.row)"   size="mini">查看订单</el-button>
        	<el-button type="text" @click="confirmGoods(scope.row)"   size="mini">确认收货</el-button>
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
      title="温馨提示"
      :visible.sync="dialogVisible"
      width="30%"
 		>
      <span><i class="el-icon-question" style="color: #409EFF;"></i> 是否一键确认收货？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false" size='mini'>取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false" size='mini'>确 定</el-button>
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
          keys:'',
          user: '',
          date:''
        },
        dialogVisible: false,
        currentPage1:5,
        columns:[
        		{
        			label:'订单编号',
        			prop:'orderNum',
        			align:'center'
        		},
        		{
        			label:'提交时间',
        			prop:'createTime',
        			align:'center'
        		},
        		{
        			label:'用户账号',
        			prop:'userAccount',
        			align:'center'
        		},
        		{
        			label:'订单金额',
        			prop:'orderAmount',
        			align:'center'
        		},
        		{
        			label:'订单状态',
        			prop:'orderStatus',
        			align:'center'
        		},
        		{
        			label:'自动确认收货时间',
        			prop:'autoConfirm',
        			align:'center'
        		},
        		{
        			label:'订单应收货时间',
        			prop:'orderTime',
        			align:'center'
        		}
        ],
        tableData: [{
          orderNum: '131510',
          createTime: '2020-04-02 15:30:00',
          userAccount:'13612345678',
          orderAmount:'1000',
          orderStatus:'0',
          autoConfirm:'15天',
          orderTime:'2020-04-17 15:30:00'
        },
          {
            orderNum: '182210',
            createTime: '2020-04-05 15:30:00',
            userAccount:'13874569856',
            orderAmount:'800',
            orderStatus:'2',
            autoConfirm:'15天',
            orderTime:'2020-04-20 15:30:00'
          }],
          selectArr:[]
      }
    },
    methods: {
      goEdit(row) {
        this.$router.push({path:'/zis/order-dispose/confirm-list/detail',query:row})
      },
    	handleSelectionChange(val) {
        for(var item of val){
        	this.selectArr.push(item.orderNum);
        }
     },
     sendArr(){
     	if(this.selectArr.length!==0){
     		 let arr = this.setArr(this.selectArr);
     		 	this.dialogVisible = true;
     	}else{
     		this.$message.error('请选择至少一条订单');
     	}
     },
      confirmGoods(row) {
    		this.$confirm('你确定要执行此操作吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
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
      refresh(){
        location.reload();
      },
      	 handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      setArr(array) {
        return Array.from(new Set(array));
      }
    }
  }
</script>

<style scoped lang="scss">

.page{
	margin-top: 40px;
}

</style>

