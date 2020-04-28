<template>
  <aw-container>
    <aw-header title="平台流水"></aw-header>
  	<el-tabs v-model="activeName" type="card" @tab-click="handleClicks">
	    <el-tab-pane label="知豆" :name="tabs[0]">
	    	<el-form
      :inline="true"
      :model="form"
      ref="form"
      size="mini"
      style="margin:20px 0 0px;padding: 10px 10px 0;background: #fff"
      v-if='activeName===tabs[0]'
    >
      <el-form-item label="输入搜索：" prop="user">
        <el-input
          v-model="form.user"
          placeholder="代理商/联系人"
          style="width: 140px;"/>
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
          type="default"
          @click="handleFormReset">
          <aw-icon name="refresh"/>
          	刷新
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="exportTabel1">
          <i class="el-icon-s-order_num"></i>
          导出数据
        </el-button>
      </el-form-item>
    </el-form>
        <el-divider></el-divider>
	    	  <el-table
	    	  	v-if='activeName===tabs[0]'
      :data="tableData1"
      border
      style="width: 100%">
      <el-table-column v-for='(item,index) in columns1'
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
        	<!--<router-link to='/agent-detail'>-->
        		<el-button type="text" style='color: red;' @click='handleClick' size="mini">删除</el-button>
        	<!--</router-link>-->

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

	    </el-tab-pane>
	    <el-tab-pane label="余额" :name="tabs[1]">
	    		<el-form
      :inline="true"
      :model="form"
      ref="form"
      size="mini"
      style="margin:20px 0 0px;padding: 10px 10px 0;background: #fff"
      v-if='activeName===tabs[1]'
    >
      <el-form-item label="输入搜索：" prop="user">
        <el-input
          v-model="form.user"
          placeholder="代理商/联系人"
          style="width: 140px;"/>
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
          type="success"
          @click="handleFormReset">
          <aw-icon name="refresh"/>
          	刷新
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="exportTabel2">
          <i class="el-icon-s-order_num"></i>
          导出数据
        </el-button>
      </el-form-item>
    </el-form>
        <el-divider></el-divider>
	    	  <el-table
	    	  	v-if='activeName===tabs[1]'
      :data="tableData2"
      border
      style="width: 100%">
      <el-table-column v-for='(item,index) in columns2'
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
        	<!--<router-link to='/agent-detail'>-->
        		<el-button type="text" style='color: red;' @click='handleClick' size="mini">删除</el-button>
        	<!--</router-link>-->

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
	    </el-tab-pane>
	    <el-tab-pane label="FNT" :name="tabs[2]">
	    	<el-form
      :inline="true"
      :model="form"
      ref="form"
      size="mini"
      style="margin:20px 0 0px;padding: 10px 10px 0;background: #fff"
      v-if='activeName===tabs[2]'
    >
      <el-form-item label="输入搜索：" prop="user">
        <el-input
          v-model="form.user"
          placeholder="代理商/联系人"
          style="width: 140px;"/>
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
          type="success"
          @click="handleFormReset">
          <aw-icon name="refresh"/>
          	刷新
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="exportTabel3">
          <i class="el-icon-s-order_num"></i>
          导出数据
        </el-button>
      </el-form-item>
    </el-form>
        <el-divider></el-divider>
	    	  <el-table
	    	  	v-if='activeName===tabs[2]'
      :data="tableData3"
      border
      style="width: 100%">
      <el-table-column v-for='(item,index) in columns3'
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
        	<!--<router-link to='/agent-detail'>-->
        		<el-button type="text" style='color: red;' @click='handleClick(scope.$index)' size="mini">删除</el-button>
        	<!--</router-link>-->

        </template>
      </el-table-column>
    </el-table>
        <el-divider></el-divider>
        <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage1"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
          </el-pagination>
        </div>
	    </el-tab-pane>
 	 </el-tabs>

  </aw-container>
</template>

<script>
  import Vue from 'vue'
  import pluginExport from '@d2-projects/vue-table-export'
  Vue.use(pluginExport)
  export default {
    data () {
      return {
      	form: {
          type: '1',
          user: ''
        },
        currentPage:1,
        dialogVisible: false,
        currentPage1:5,
        tabs:['zd','yue','fnt'],
        activeName: 'zd',
        tableData1: [{
          id: '4698659',
          record_events: '支付购销合同',
          order_num:135265656,
          zd:135,
          fnt:666,
          zd_total:555,
          record_time:'2020-04-01 17:30:00'
        },
          {
            id: '1565554',
            record_events: '购买商品',
            order_num:155596545,
            zd:160,
            fnt:888,
	          zd_total:666,
	          record_time:'2020-04-01 17:30:00'
          }],
           tableData2: [{
          id: '123456789',
          record_events: '支付购销合同',
          order_num:135265656,
          yue:135,
          total:666,
          record_time:'2020-04-01 17:30:00'
        }],
        tableData3: [{
          id: '6666',
          record_events: '支付购销合同',
          order_num:135265656,
           fnt:666,
          zd:135,

          fnt_total:555,
          record_time:'2020-04-01 17:30:00'
        },
          {
            id: '88888',
            record_events: '购买商品',
            order_num:155596545,
             fnt:888,
            zd:160,

	          fnt_total:666,
	          record_time:'2020-04-01 17:30:00'
          }],
          columns1:[
        		{
        			label:'记录ID',
        			prop:'id',
        			align:'center'
        		},
        		{
        			label:'记录事件',
        			prop:'record_events',
        			align:'center'
        		},
        		{
        			label:'订单号',
        			prop:'order_num',
        			align:'center'
        		},
        		{
        			label:'知豆',
        			prop:'zd',
        			align:'center'
        		},
        		{
        			label:'FNT',
        			prop:'fnt',
        			align:'center'
        		},
        		{
        			label:'知豆总额',
        			prop:'zd_total',
        			align:'center'
        		},
        		{
        			label:'记录时间',
        			prop:'record_time',
        			align:'center'
        		}],
        		columns2:[
        		{
        			label:'记录ID',
        			prop:'id',
        			align:'center'
        		},
        		{
        			label:'记录事件',
        			prop:'record_events',
        			align:'center'
        		},
        		{
        			label:'订单号',
        			prop:'order_num',
        			align:'center'
        		},
        		{
        			label:'余额',
        			prop:'yue',
        			align:'center'
        		},
        		{
        			label:'总余额',
        			prop:'total',
        			align:'center'
        		},
        		{
        			label:'记录时间',
        			prop:'record_time',
        			align:'center'
        		}],
        		columns3:[
        		{
        			label:'记录ID',
        			prop:'id',
        			align:'center'
        		},
        		{
        			label:'记录事件',
        			prop:'record_events',
        			align:'center'
        		},
        		{
        			label:'订单号',
        			prop:'order_num',
        			align:'center'
        		},
        		{
        			label:'FNT',
        			prop:'fnt',
        			align:'center'
        		},
        		{
        			label:'知豆',
        			prop:'zd',
        			align:'center'
        		},
        		{
        			label:'FNT总额',
        			prop:'fnt_total',
        			align:'center'
        		},
        		{
        			label:'记录时间',
        			prop:'record_time',
        			align:'center'
        		}],
      }
    },
    methods: {
      handleClicks(){

      },
    	handleClick(index) {
        this.$confirm('你确定要删除此条记录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData1.splice(index,1)
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
      handleFormSubmit(){

      },
      exportTabel1 () {
        this.$export.excel({
        columns: this.columns1,
        data: this.tableData1,
        header: '导出知豆列表',
        merges: ['A1', 'E1']
      })
        .then(() => {
          this.$message('导出表格成功')
        })
      },
      exportTabel2 () {
        this.$export.excel({
        columns: this.columns2,
        data: this.tableData2,
        header: '导出余额列表',
        merges: ['A1', 'E1']
      })
        .then(() => {
          this.$message('导出表格成功')
        })
      },
      exportTabel3 () {
        this.$export.excel({
        columns: this.columns3,
        data: this.tableData3,
        header: '导出FNT列表',
        merges: ['A1', 'E1']
      })
        .then(() => {
          this.$message('导出表格成功')
        })
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
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>

<style scoped lang="scss">
  .btn-group{
    .btn-list{
      display: inline-block;
      width: 120px;
      height: 34px;
      text-align: center;
      line-height: 34px;
      margin-right: 10px;
      border_num: 1px solid #ccc;
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

