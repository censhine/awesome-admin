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
          placeholder="请输入关键词"
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
      style="width: 100%">
      <el-table-column
        fixed
        prop="id"
        label="编号"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="operator"
        label="操作者"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="操作日期"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="ip"
        label="IP地址"
        align="center"
        min-width="130"
      >
      </el-table-column>
      <el-table-column
        prop="logs"
        label="操作记录"
        align="center"
      >
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
  import day from 'dayjs'
  export default {
    data () {
      return {
        form: {
          type: '1',
          user: ''
        },
        dialogVisible: false,
        currentPage1:5,
        tableData: [{
          id: '1000011',
          ip: '192.168.1.123',
          operator: '张三',
          logs: 'iphone 12',
          create_time: '2020-04-21 10:00:00'
        },
          {
            id: '1000011',
            ip: '192.168.1.126',
            operator: '张三',
            logs: 'iphone 12',
            create_time: '2020-04-21 10:00:00'
          }]
      }
    },
    methods: {
      goDetail(row){
        this.$router.push({
          path:'/zis/goods/comments/detail',
          query: row
        })
      },
      handleClick(row) {
        console.log(row);
        this.dialogVisible = true;
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
