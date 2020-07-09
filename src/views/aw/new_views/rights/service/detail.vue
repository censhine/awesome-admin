<template>
  <aw-container class="goods-comments">
    <aw-back className="el-icon-delete" title="关闭" align="right"></aw-back>
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple">当前客服：{{currentService}}</div>
      </el-col>
    </el-row>

    <el-table border :data="historyData">
      <el-table-column label="历史接待次数" prop="history_service_times"></el-table-column>
      <el-table-column label="历史接待人数" prop="history_service_persons"></el-table-column>
      <el-table-column label="今日接待次数" prop="today_service_times"></el-table-column>
      <el-table-column label="今日接待人数" prop="today_services_persons"></el-table-column>
    </el-table>

    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="今天" name="first">
        <today :table-data="tableData" style="margin-bottom: 20px;"></today>
      </el-tab-pane>
      <el-tab-pane label="最近一周" name="second">
        <today :table-data="tableData"  style="margin-bottom: 20px;"></today>
      </el-tab-pane>
      <el-tab-pane label="最近一月" name="third">
        <today :table-data="tableData"  style="margin-bottom: 20px;"></today>
      </el-tab-pane>
      <el-tab-pane label="全部" name="fourth">
        <today :table-data="tableData"  style="margin-bottom: 20px;"></today>
      </el-tab-pane>
    </el-tabs>

    <detail-dialog ref="detail"></detail-dialog>

  </aw-container>
</template>

<script>

  export default {
    components:{
      Today: ()=>import('./components/today'),
      History: ()=>import('./components/history'),
      Month: ()=>import('./components/month'),
      All: ()=>import('./components/all'),
      detailDialog: ()=>import('./components/detailDialog')
    },
    data() {
      return {
        currentService: 'windr',
        activeName: 'first',
        historyData:[
          {history_service_times:12,history_service_persons:12,today_service_times:22,today_services_persons:22}
        ],
        tableData: [
            {header_img:'http://www.zis.mobi/images/new/1_1.png',nick_name:'windr',start_time:'2017-08-10 11:40:03',end_time:'2017-08-10 11:40:03'},
            {header_img:'http://www.zis.mobi/images/new/1_1.png',nick_name:'windr',start_time:'2017-08-10 11:40:03',end_time:'2017-08-10 11:40:03'},
            {header_img:'http://www.zis.mobi/images/new/1_1.png',nick_name:'windr',start_time:'2017-08-10 11:40:03',end_time:'2017-08-10 11:40:03'},
            {header_img:'http://www.zis.mobi/images/new/1_1.png',nick_name:'windr',start_time:'2017-08-10 11:40:03',end_time:'2017-08-10 11:40:03'},
            {header_img:'http://www.zis.mobi/images/new/1_1.png',nick_name:'windr',start_time:'2017-08-10 11:40:03',end_time:'2017-08-10 11:40:03'},
        ],
        result:{
          id: 10001,
          nick_name: '林蛋大',
          goods_name: 'iphone 12',
          comments: '这是产品评论这是产品评论这是产品评论这是产品评论这是产品评论这是产品评论这是产品评论',
          ratings: 5,
          create_time: '2020-04-21 10:20:20',
          imgs:[
            'http://www.zis.mobi/images/new/a.png',
            'http://www.zis.mobi/images/new/a.png',
            'http://www.zis.mobi/images/new/a.png',
            'http://www.zis.mobi/images/new/a.png',
            'http://www.zis.mobi/images/new/a.png',
            'http://www.zis.mobi/images/new/a.png',
          ]
        }
      }
    },
    mounted() {
      this.$bus.on('handleParentView',(args)=>{
        if(this.$refs.detail){
          this.$refs.detail.openDialog(args, true)
        }
      })
    },
    methods: {
      handleClick(val){

      }
    }
  }
</script>

<style lang="scss">
  .goods-comments{
    b{
      font-weight: bold;
    }
    div{
      padding-top: 2px;
      padding-bottom: 2px;
    }
    .el-col {
      border-radius: 4px;
    }
    .bg-purple-dark {
      background: #99a9bf;
    }
    .bg-purple {
      background: #ededed;
    }
    .bg-purple-light {
      background: #e5e9f2;
    }
    .grid-content {
      border-radius: 4px;
      min-height: 36px;
      line-height: 36px;
      text-indent: 1em;
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }
  }
</style>
