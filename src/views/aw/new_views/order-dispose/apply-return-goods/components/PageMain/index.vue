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
        prop="SAftermarketDO.id"
        label="服务单号"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="申请时间"
        align="center"
      >
        <template slot-scope="scope">
          {{scope.row.SAftermarketDO.createTime|time}}
        </template>
      </el-table-column>
       <el-table-column
        prop="SAftermarketDO.userId"
        label="用户账号"
        align="center"
      >

      </el-table-column>
       <el-table-column
        prop="SAftermarketDO.applyPrice"
        label="退款金额"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="SAftermarketDO.contacts"
        label="联系人"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="SAftermarketDO.status"
        label="申请状态"
        align="center"
      >
      	<template slot-scope='scope'>
      		{{applyStatus[scope.row.SAftermarketDO.status]}}
      	</template>
      </el-table-column>
      <el-table-column
        prop="SAftermarketDO.modifyTime"
        label="处理时间"
        align="center"
      >
        <template slot-scope='scope' v-if="scope.row.SAftermarketDO.modifyTime">
          {{scope.row.SAftermarketDO.modifyTime|time}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
        	<el-button type="text" @click="goDetail(scope.row.SAftermarketDO)"   size="mini">查看详情</el-button>
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
        			label:'联系人',
        			prop:'contact',
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
        //申请状态 1待处理 2退货中 3已完成 -1已拒绝
				applyStatus:{'0':'待处理','1':'待处理','2':'退货中','3':'已完成','-1':'已拒绝'}
			}
		},
		methods: {
      goDetail(row){
      	  this.$router.push({
      	  	path:'/zis/order-dispose/apply-return-goods/detail',
            query:{
      	  	  id: row.id
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
</style>
