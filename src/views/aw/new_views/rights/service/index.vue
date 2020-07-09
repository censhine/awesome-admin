<template>
  <aw-container>
    <aw-header title="客服管理"></aw-header>
    <div id="table-info1">
      <el-row>
        <el-col :span="6">
          <el-row class="zis-item-box">
            <el-col :span="8" class="zis-items-left">
              <i class="el-icon-s-order"/>
            </el-col>
            <el-col :span="16" class="zis-items-right">
              <el-row class="name">今日订单总数</el-row>
              <el-row class="count">889</el-row>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row class="zis-item-box">
            <el-col :span="8" class="zis-items-left">
              <i class="el-icon-platform-eleme"/>
            </el-col>
            <el-col :span="16" class="zis-items-right">
              <el-row class="name">今日销售总额</el-row>
              <el-row class="count">889</el-row>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="6">
          <el-row class="zis-item-box">
            <el-col :span="8" class="zis-items-left">
              <i class="el-icon-s-help"/>
            </el-col>
            <el-col :span="16" class="zis-items-right">
              <el-row class="name">昨日销售总额</el-row>
              <el-row class="count">889</el-row>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row class="zis-item-box">
            <el-col :span="8" class="zis-items-left">
              <i class="el-icon-s-finance"/>
            </el-col>
            <el-col :span="16" class="zis-items-right">
              <el-row class="name">近7天销售总额</el-row>
              <el-row class="count">889</el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
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
          type="success"
          @click="handleFormReset">
          <aw-icon name="refresh"/>
          刷新
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="user_name"
        label="成员账号"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="nick_name"
        label="客服昵称"
        align="center"
      >
      </el-table-column>

      <el-table-column
        prop="create_time"
        label="添加时间"
        align="center"
      >
      </el-table-column>

      <el-table-column
        prop="create_time"
        label="最后登录"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="status"
        label="是否启用"
        align="center"
      >
        <template slot-scope="scope">
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

          <el-button type="text" @click='goDetail(scope.row)' size="mini">查看记录</el-button>
          <el-button type="text" @click='goEdit(scope.row)' size="mini">编辑</el-button>
          <el-button type="text" @click='goDelete(scope.$index)' size="mini">删除</el-button>

        </template>
      </el-table-column>
    </el-table>
    <div class="page" style="margin-top: 20px">
      <page-footer
        slot="footer"
        :loading="loading"
        :current="page.current"
        :size="page.size"
        :total="page.total"
        @change="handlePaginationChange"/>
    </div>

  </aw-container>
</template>

<script>
  import day from 'dayjs'
  export default {
    components:{
      pageFooter: ()=>import('@/layout/header-aside/components/footer')
    },
    data () {
      return {
        form: {
          type: '1',
          user: ''
        },
        loading: true,
        page: {
          current: 1,
          size: 0,
          total: 0
        },
        dialogVisible: false,
        currentPage1:5,
        tableData: [{
          id: '1000011',
          user_name: 'windr',
          nick_name: '张三直营店',
          goods_name: 'iphone 12',
          ratings:5,
          comments:'评论内容评论内容',
          imgs:[
            'http://www.zis.mobi/images/new/d.png',
            'http://www.zis.mobi/images/new/d.png',
            'http://www.zis.mobi/images/new/d.png',
          ],
          status:'1',
          create_time: '2020-04-21 10:00:00'
        },
          {
            id: '1000012',
            user_name: 'windr',
            nick_name: '张三直营店',
            goods_name: 'iphone 12',
            ratings:4,
            comments:'评论内容评论内容',
            imgs:[
              'http://www.zis.mobi/images/new/c.png',
              'http://www.zis.mobi/images/new/c.png',
              'http://www.zis.mobi/images/new/c.png',
              'http://www.zis.mobi/images/new/c.png',
            ],
            status:'0',
            create_time: '2020-04-21 10:00:00'
          }]
      }
    },
    methods: {
      goDetail(row){
        this.$router.push({
          path:'/zis/rights/service/detail',
          query: row
        })
      },
      goEdit(row){
        this.$router.push({
          path:'/zis/rights/service/detail',
          query: row
        })
      },
      goDelete(index){
        this.$confirm('你确定要删除该项吗？','信息提示',{
          confirmButtonText:'确定',
          cancelButtonText: '取消',
          type: "warning"
        }).then(()=>{
          this.tableData.splice(index,1)
          this.$message.success('删除成功')
        }).catch(()=>{
          this.$message.error('取消删除了')
        })
      },
      // 分页变化改动
      handlePaginationChange(val) {
        this.page = val
        this.$nextTick(() => {
          this.$refs.header.handleFormSubmit()
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
      refresh() {
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

  .zis-item-box{
    .zis-items-left{
      >i{
        font-size: 80px;
        color: $color-primary;
      }
    }
    height: 105px;
    border: 1px solid #ededed;
    padding: 10px;
    box-sizing: border-box;
    text-align: left;
    margin-right: 5px;
    margin-bottom: 10px;
    .name {
      margin-bottom: 10px;
      font-size: 16px;
      color: #555555;
    }
    .count{
      color: $color-primary;
      font-size: 15px;
    }
  }
</style>
