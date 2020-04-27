<template>
  <d2-container>
    <el-form
      :inline="true"
      :model="form"
      ref="form"
      size="mini"
      style="margin:20px 0 0px;padding: 10px 10px 0;background: #fff"
    >
      <el-form-item label="输入搜索：" prop="keyword">
        <el-input
          v-model="form.keyword"
          placeholder="行业名称"
          style="width: 140px;"/>
      </el-form-item>
      <el-form-item label="启用状态：" prop="status">
        <el-select v-model="form.status">
          <el-option label="启用" value="1"></el-option>
          <el-option label="停用" value="0"></el-option>
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
          type="default"
          @click="handleFormReset">
          <d2-icon name="refresh"/>
          刷新
        </el-button>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="$router.push({path:'/zis/industry/add'})">
          <i class="el-icon-plus"/>
          添加行业
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
      ></el-table-column>

      <el-table-column
        fixed
        prop="id"
        label="行业ID"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="industry_name"
        label="行业名称"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="industry_intro"
        label="行业简介"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="sort"
        label="排序"
        align="center"
        sortable="sortable"
      ></el-table-column>

      <el-table-column
        prop="create_time"
        label="创建时间"
        align="center"
      ></el-table-column>

          <el-table-column
            prop="status"
            label="是否启用"
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
        	<el-button type="text" @click="goEdit(scope.row)"   size="mini">编辑</el-button>
          <el-button type="text" style='color: red;' @click="handleRemove(scope.$index)" size="mini">删除</el-button>
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
  export default {
    data () {
      return {
        form: {
          type: '1',
          keyword: '',
          status: '',
        },
        dialogVisible: false,
        currentPage1:5,
        zIndex:0,
        tableData: [{
          id: '131510',
          industry_name: '行业',
          industry_intro:'简介简介简介简介简介简介简介简介简介简介',
          sort: 123,
          create_time: '2017-08-05 15:47:20',
          update_time:  '2017-08-05 15:47:30',
          status: '1'
        },
          {
            id: '131510',
            industry_name: '行业',
            industry_intro:'简介简介简介简介简介简介简介简介简介简介',
            sort: 133,
            create_time: '2017-08-05 15:47:20',
            update_time:  '2017-08-05 15:47:30',
            status: '0'
          }],
      }
    },
    methods: {
      handleRemove(index) {
        this.$confirm('你确定要删除此行业信息吗?', '提示', {
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
      		path:'/zis/industry/edit',
          query: row
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

