<template>
  <aw-container>
    <div id="table-info1">
      <el-row>
        <el-col :span="6">
          <el-row class="zis-item-box">
            <el-col :span="8" class="zis-items-left">
              <i class="el-icon-s-order"/>
            </el-col>
            <el-col :span="16" class="zis-items-right">
              <el-row class="name">历史接待次数</el-row>
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
              <el-row class="name">历史接待次数</el-row>
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
              <el-row class="name">今日接待次数</el-row>
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
              <el-row class="name">今日接待人数</el-row>
              <el-row class="count">889</el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
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
        prop="id"
        label="编号"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="nick_name"
        label="用户昵称"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="ratings"
        label="评价"
        align="center"
        min-width="130"
      >
        <template slot-scope="scope">
          <el-rate
            v-model="scope.row.ratings"
            disabled
            show-score
            text-color="#ff9900"
            score-template="">
          </el-rate>
        </template>
      </el-table-column>
      <el-table-column
        prop="comments"
        label="评价内容"
        align="center"
      >
      </el-table-column>

      <el-table-column
        prop="imgs"
        label="评价图片"
        align="center"
        >

        <template slot-scope="scope">
          <div class="popover-image">
            <template v-for="item in scope.row.imgs">
              <el-image
                :src="item"
                @click.native="$preview(item)"
                style="width: 30px;height: 30px; margin-right: 10px"
                fit="fill"/>
            </template>
          </div>
        </template>

      </el-table-column>

      <el-table-column
        prop="create_time"
        label="创建时间"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="status"
        label="是否显示"
        align="center"
      >
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" inactive-value="0" active-value="1"></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <!--<router-link to='/agent-detail'>-->
          <el-button type="text" @click='goDetail(scope.row)' size="mini">查看</el-button>
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

  </aw-container>
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
          nick_name: '张三直营店111',
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
          path:'/zis/goods/comments/detail',
          query: row
        })
      },
      handleClick(row) {
        console.log(row);
        this.dialogVisible = true;
      },
      handleFormSubmit () {
        //console.log('11111')
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
