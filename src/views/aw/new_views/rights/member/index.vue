<template>
  <aw-container>
    <aw-header title="成员管理"></aw-header>
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
          type="success"
          @click="handleAddDepart">
          <i class="el-icon-add-location"></i>
          添加成员
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
        prop="user_name"
        label="成员账号"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="real_name"
        label="姓名"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="email"
        label="邮箱地址"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="depart"
        label="所属部门"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="create_time"
        label="添加时间"
        align="center"
        ></el-table-column>

      <el-table-column
        prop="last_login"
        label="最后登录"
        align="center"
      ></el-table-column>

      <el-table-column
        label="是否启用"
        align="center"
      ><template slot-scope="scope">
          <el-switch v-model="scope.row.status" inactive-value="0" active-value="1"></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        fixed="right"
        min-width="180"
      >
        <template slot-scope="scope">
          <el-button type="text" @click='handleSetting(scope.row)' size="mini">权限设置</el-button>
          <el-button type="text" @click='handleEdit(scope.$index)' size="mini">编辑</el-button>
          <el-button type="text" @click='handleDelete(scope.$index)' size="mini" style="color:red">删除</el-button>
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

    <add-dialog :form-data="{}" ref="verifyDialog"></add-dialog>
  </aw-container>
</template>

<script>
  import day from 'dayjs'
  import addDialog from './add'
  export default {
    components:{
      addDialog
    },
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
          user_name: 'windr',
          real_name: '大梨',
          email: '5698401@qq.com',
          depart: '销售部',
          status:'1',
          create_time: '2020-04-21 10:00:00',
          last_login: '2020-04-21 10:00:00',
        },
          {
            id: '1000011',
            user_name: 'windr',
            real_name: '大梨',
            email: '5698401@qq.com',
            depart: '销售部',
            status:'1',
            create_time: '2020-04-21 10:00:00',
            last_login: '2020-04-21 10:00:00',
          }]
      }
    },
    methods: {
      handleSetting(row) {
        this.$router.push({path:'/zis/rights/setting', query:row})
      },
      handleEdit(index) {
        this.currentIndex = index
        this.form = { ...this.tableData[index] }

        this.$nextTick(() => {
          if (this.$refs.form) {
            this.$refs.form.clearValidate()
          }
          this.dialogStatus = 'add'
          this.dialogLoading = false
          this.formData = {...this.form,dialogStatus:'update'}

          this.$refs.verifyDialog.isShowDia(this.formData, true)
        })
      },
      handleDelete(index) {
        this.$confirm('你确认要删除该条信息吗？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
          .then(() => {
            this.tableData.splice(index,1)
            this.$message({
              type: 'success',
              message: '删除成功'
            });
          })
          .catch(action => {
            console.log(action);
          });
      },
      handleAddDepart(index) {
        this.currentIndex = index
        this.form = { ...this.tableData[index] }

        this.$nextTick(() => {
          if (this.$refs.form) {
            this.$refs.form.clearValidate()
          }
          this.dialogStatus = 'add'
          this.dialogLoading = false
          this.formData = this.form
          this.$refs.verifyDialog.isShowDia(this.formData,true)
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
