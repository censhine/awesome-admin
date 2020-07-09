<template>
	<div class="wrap">
		<div class="btn">
        <!--<el-button
          type="default"
          @click="exportExcel"
          size='mini'
          >
          <aw-icon name="download"/>
          导出数据
        </el-button>-->
    	 </div>
    	 <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="orderId"
        label="服务单号"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="applyTime"
        label="申请时间"
        align="center"
      >
        <template slot-scope="scope">{{scope.row.createTime|time}}</template>
      </el-table-column>
       <el-table-column
        prop="userId"
        label="用户账号"
        align="center"
      >
      </el-table-column>
       <el-table-column
        prop="applyPrice"
        label="退款金额"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="status"
        label="申请状态"
        align="center"
      >
      	<template slot-scope='scope'>
      		{{applyStatus[scope.row.status]}}
      	</template>
      </el-table-column>
      <el-table-column
        prop="disposeTime"
        label="处理时间"
        align="center"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.modifyTime">{{scope.row.modifyTime|time}}</span>
          <span v-else>未处理</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
        	<el-button type="text" @click="goDetail(scope.row)"   size="mini">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
    	:pageTotal="pageTotal"
    	@handleCurrentChange="handleCurrentChange"
    	@handleSizeChange="handleSizeChange">
    </pagination>
	</div>
</template>

<script>
	import Pagination from "@/components/pagination";
	import Vue from 'vue'
	 import pluginExport from '@d2-projects/vue-table-export'
  Vue.use(pluginExport)
	export default{
		components:{
			Pagination,
		},
		props:{
			tableData: Array,
			pageTotal: Number
		},
		data(){
			return{

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
        //1待处理 2已处理 -1已拒绝
				 applyStatus:{'0':'待处理','1':'待处理','2':'已处理','-1':'已拒绝'}
			}
		},
		methods: {

      goDetail(row){
      	  this.$router.push({
      	  	path:'/zis/order-dispose/apply-refund/detail',
            query:{
      	  	  id: row.id,
              orderId: row.orderId
            }
      	  })
      },
     // 上下分页
			handleCurrentChange(val){
			    this.$emit('currentChange',val)
			},
			// 每页显示多少条
			handleSizeChange(val){
			    this.$emit('sizeChange',val)
			},
      exportExcel () {
      this.$export.excel({
        columns: this.columns,
        data: this.tableData,
        header: '导出订单列表',
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
.btn{
	margin: 20px 0;
}
.info{
	padding: 0 19px;
	margin-bottom: 20px;
}
</style>
