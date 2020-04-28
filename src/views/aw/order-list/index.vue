<template>
  <aw-container>
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
      <el-form-item label="输入搜索：" prop="keys">
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
          @click="handleFormSubmit">
          <aw-icon name="search"/>
          查询
        </el-button>
      </el-form-item>
			<el-form-item>
        <el-button
          type="primary"
          @click="exportExcel">
          <aw-icon name="download"/>
          导出数据
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          type="success"
          @click="handleFormReset">
          <aw-icon name="refresh"/>
          刷新
        </el-button>
      </el-form-item>
       <el-form-item>
        <el-button
          type="primary"
          @click="handleFormSubmit">
          关闭订单
        </el-button>
      </el-form-item>
       <el-form-item>
        <el-button
          type="primary"
          @click="handleFormSubmit">
          删除订单
        </el-button>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <el-table
      :data="tableData"
      border
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
        	<el-button type="text" @click="goDetail(scope.row)"   size="mini">查看</el-button>
        	<el-button  v-if='scope.row.orderStatus == 0' type="text" @click="close(scope.row)"   size="mini">关闭</el-button>
        	<el-button  v-if='scope.row.orderStatus == 1' type="text" @click="sendGoods(scope.row)"   size="mini">发货</el-button>
        	<el-button  v-if='scope.row.orderStatus == 2||scope.row.orderStatus == 3'   type="text" @click="goLogistics(scope.row)"   size="mini">订单跟踪</el-button>
        	<el-button  v-if='scope.row.orderStatus == 1' type="text" @click="cancelOrder(scope.row)"   size="mini">取消</el-button>
          <el-button v-if='scope.row.orderStatus == 4' type="text" style='color: red;' @click="deletes(scope.row)" size="mini">删除</el-button>
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
    	title='发货'
    	:visible.sync="dialogShow"
      width="40%"
    	>
    	 <el-form :model="form2" :rules="rules" ref="ruleForm" label-width="100px">
    	 	<div class="info">
    	 		  <el-row>
        	<el-col :span='8'>
        		<span>订单编号：{{form2.orderCode}}</span>
        	</el-col>
        	<el-col :span='8'>
        		<span>手机号码：{{form2.phone}}</span>
        	</el-col>
        	<el-col :span='8'>
        		<span>收货人：{{form2.contact}}</span>
        	</el-col>
        </el-row>
        <el-row style='margin-top: 16px;'>
        	<el-col :span='16'>
        		<span>收货地址：{{form2.address}}</span>
        	</el-col>
        	<el-col :span='8'>
        		<span>邮政编码：{{form2.postCode}}</span>
        	</el-col>
        </el-row>
    	 	</div>
        <el-form-item label="物流公司：" prop='expressCode'>
        		<el-select
          v-model="form2.expressCode"
          placeholder="请选择物流公司"
          style="width:260px;">
          <el-option v-for='(item,index) in express' :key='index' :label="item.name" :value="item.code"/>
        </el-select>
      </el-form-item>
        <el-form-item label="物流单号："  prop="logisticsCode">
        	<el-col :span="10">
          	<el-input v-model="form2.logisticsCode" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
	      <el-button  @click="dialogShow = false" size='medium'>取 消</el-button>
	    	<el-button type="primary" @click="submit('ruleForm')" size='medium'>确 定</el-button>
	    </span>
    </el-dialog>

  </aw-container>
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
          keys: '',
          user: '',
          date:''
        },
        form2:{
        	orderCode:'',
        	phone:'',
        	contact:'',
        	address:'',
        	postCode:'',
        	expressCode:'',
        	logisticsCode:''
        },
        currentPage1:5,
        dialogShow:false,
        express:[
      		{
      			name:'顺丰速运',
      			code:'SF'
      		},
      		{
      			name:'申通快递',
      			code:'ST'
      		},
      		{
      			name:'中通快递',
      			code:'ZT'
      		}
      ],
        btns:[
          {
            btnText:'全部订单',
            num:1000
          },
          {
            btnText:'待付款',
            num:1000
          },
          {
            btnText:'待发货',
            num:1000
          },
          {
            btnText:'已发货',
            num:1000
          },
          {
            btnText:'已完成',
            num:1000
          },
          {
            btnText:'已关闭',
            num:1000
          }
        ],
        zIndex:0,
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
        			label:'合同编号',
        			prop:'contractNum',
        			align:'center'
        		},
        		{
        			label:'用户账号',
        			prop:'userAccount',
        			align:'center'
        		},
        		{
        			label:'收货人',
        			prop:'consignee',
        			align:'center'
        		},
        		{
        			label:'订单金额',
        			prop:'orderAmount',
        			align:'center'
        		},
        		{
        			label:'支付方式',
        			prop:'payMethods',
        			align:'center'
        		},
        		{
        			label:'订单来源',
        			prop:'orderSource',
        			align:'center'
        		},
        		{
        			label:'订单状态',
        			prop:'orderStatus',
        			align:'center'
        		}
        ],
        tableData: [{
          orderNum: '131510',
          createTime: '2020-04-02 15:30:00',
          contractNum:'20190255656',
          userAccount:'13612345678',
          consignee:'张三疯',
          orderAmount:'1000',
          payMethods:'0',
          orderSource:'APP',
          orderStatus:'0'
        },
          {
            orderNum: '182210',
            createTime: '2020-04-05 15:30:00',
            contractNum:'20194845446',
            userAccount:'13874569856',
            consignee:'李四癫',
            orderAmount:'800',
            payMethods:'1',
            orderSource:'APP',
            orderStatus:'1'
          },{
            orderNum: '182210',
            createTime: '2020-04-05 15:30:00',
            contractNum:'20194845446',
            userAccount:'13874569856',
            consignee:'李四癫',
            orderAmount:'800',
            payMethods:'1',
            orderSource:'APP',
            orderStatus:'2'
          },{
            orderNum: '182210',
            createTime: '2020-04-05 15:30:00',
            contractNum:'20194845446',
            userAccount:'13874569856',
            consignee:'李四癫',
            orderAmount:'800',
            payMethods:'1',
            orderSource:'APP',
            orderStatus:'3'
          },{
            orderNum: '182210',
            createTime: '2020-04-05 15:30:00',
            contractNum:'20194845446',
            userAccount:'13874569856',
            consignee:'李四癫',
            orderAmount:'800',
            payMethods:'1',
            orderSource:'APP',
            orderStatus:'4'
          }],
          rules: {
        	expressCode: [{
						required: true,
						message: '请输入运费模板名称',
						trigger: 'change'
					}],
					logisticsCode: [{
						required: true,
						message: '请输入物流单号',
						trigger: 'blur'
					}]
				},
				status:{'0':'待付款','1':'待发货','2':'已发货','3':'已完成','4':'已关闭'}
      }
    },
    methods: {
    	cancelOrder(row){
    		this.$confirm('你确定要取消订单吗?', '提示', {
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
    	close(){
    		this.$confirm('你确定要关闭订单吗?', '提示', {
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
    	deletes(row){
    		this.$confirm('你确定要删除订单吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
    	},
    	goLogistics(row){
    		this.$router.push({
    			path:'/aw/order-manger/logistics'
    		})
    	},
      sendGoods(row) {
        console.log(row);
        this.form2.orderCode = row.orderNum;
        this.form2.phone = row.userAccount;
        this.form2.contact = row.consignee;
        this.dialogShow = true;
      },
      goDetail(row){
      	  this.$router.push({
      	  	path:'/aw/order-list/detail'
      	  })
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
      submit(formName){
      	this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
.info{
	padding: 0 19px;
	margin-bottom: 20px;
}
</style>

