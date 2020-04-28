<template>
  <aw-container>
    <div class="aw-table-view">
      <el-table :data="[{status:'待审核'}]" border class="aw-item-status">
        <el-table-column prop="status"></el-table-column>
      </el-table>

      <div class="title mt">审核详情</div>
      <div class="main">
        <div class="order-form">
          <div class="oder_item">
            <span class="key">入驻角色</span>
            <span class="val">商家</span>
          </div>
          <div class="oder_item">
            <span class="key">店铺名称</span>
            <span class="val">小明服饰店</span>
          </div>
          <div class="oder_item">
            <span class="key img-height">店铺logo</span>
            <span class="val"><img style="height: 80px;" src="http://img.yzt-tools.com/20200211/47ce5e17792620292a7344e8803354ec.jpg"/></span>
          </div>
          <div class="oder_item">
            <span class="key">描述</span>
            <span class="val">无</span>
          </div>
          <div class="oder_item">
            <span class="key">行业分类</span>
            <span class="val">服饰</span>
          </div>
          <div class="oder_item">
            <span class="key">法人姓名</span>
            <span class="val">刘云</span>
          </div>
          <div class="oder_item">
            <span class="key">联系人</span>
            <span class="val">流流</span>
          </div>
          <div class="oder_item">
            <span class="key">联系人手机</span>
            <span class="val">13112341234</span>
          </div>
          <div class="oder_item">
            <span class="key">联系人邮箱</span>
            <span class="val">131222@163.com</span>
          </div>
          <div class="oder_item">
            <span class="key">公司名称</span>
            <span class="val">小明服饰有限公司</span>
          </div>
          <div class="oder_item">
            <span class="key">公司地址</span>
            <span class="val">深圳市龙华区卫东龙大厦6号</span>
          </div>
          <div class="oder_item">
            <span class="key img-height">身份证照片</span>
            <span class="val "><img style="height:80px" src="http://news.youth.cn/jsxw/201511/W020151113403235620320.jpg"><img style="height:80px" src="http://news.youth.cn/jsxw/201511/W020151113403235620320.jpg"></span>
          </div>
          <div class="oder_item">
            <span class="key img-height">营业执照</span>
            <span class="val"><img style="height:80px" src="http://5b0988e595225.cdn.sohucs.com/images/20190222/0f462d915b3f470a86037782f2880b36.jpeg"></span>
          </div>
          <div class="oder_item">
            <span class="key img-height">资质认证资料</span>
            <span class="val"><img style="height:80px;" src="http://img65.jc35.com/2/20170606/636323410467219934537.jpg"></span>
          </div>
        </div>
      </div>
    </div>

    <div class="aw-table-list">
      <el-table :data="[{title:'申请人信息'}]" border class="aw-item-title">
<!--        <el-table-column prop="title"></el-table-column>-->
      </el-table>
      <el-table :data="userInfoData" border>
        <el-table-column prop="id" width=200 label="用户ID"></el-table-column>
        <el-table-column prop="user_name" label="用户账号"></el-table-column>
        <el-table-column prop="nick_name" width=200 label="用户昵称"></el-table-column>
        <el-table-column prop="phone" label="联系方式"></el-table-column>
        <el-table-column prop="area" width=200 label="地区"></el-table-column>
        <el-table-column prop="create_time" label="提交时间"></el-table-column>
      </el-table>
    </div>
    <p style="text-align: center; margin-top: 20px;">
      <aw-back title="关闭" align="center" icon-class="el-icon-close"></aw-back>
    </p>
  </aw-container>
</template>

<script>
    import {mapState,mapActions} from 'vuex'
    export default {
        data(){
          return {
            tableData: this._generalData(this.$route.query),
            detail: this._generalData(this.$route.query),
            userInfoData:[{
              id:1000001,
              user_name:1800000000,
              nick_name:'小花',
              phone:13112341234,
              area:'广东深圳龙华区',
              create_time:'2020-03-26 16:58:11'
            }]
          }
        },
        computed: {
        ...mapState('awadmin/page', [
          'opened',
          'current' //用户获取当前页面的地址，用于关闭
        ])
      },
        created() {
        },
        methods:{
          ...mapActions('awadmin/page', [
            'close',
          ]),
          _generalData(obj){
              let arr=[]
              for(let i in obj){
                arr.push({key:i,val:obj[i]})
              }
              return arr
          },
          handleCloseTab(){
            this.close({tagName:this.current});
            this.$router.go(-1)
          }
        }
    }
</script>

<style lang="scss">
  .aw-table-view{
    .aw-item-status{
      color:red;
    }
    .aw-item-title td{
      text-align: center;
    }
    table th{
      display: none;
    }
    table tr td:first-child{
      background: #F9FAFC;
    }
  }
</style>

<style scoped lang="scss">
  .order-form {
    margin-top: 20px;
    border: 1px solid #e4e4e4;
  }

  .oder_item {
    border-bottom: 1px solid #e4e4e4;
    &:last-child {
      border-bottom: none;
    }
    .key {
      border-right: 1px solid #e4e4e4;
      display: inline-block;
      width: 160px;
      height: 50px;
      line-height: 50px;
      text-align: right;
      background: #F9FAFC;
      padding-right: 10px;
    }
    .val {
      padding-left: 10px;
    }
    .look {
      padding-left: 20px;
      color: #409EFF;
      &:hover {
        cursor: pointer;
      }
    }
  }

  .footer {
    width: 800px;
    margin: 30px auto;
    text-align: center;
  }
</style>
<style lang="scss">
  .right{
    float: right;
  }
  .aw-table-view {
    .img-height{
      float:left;
      height: 80px !important;
      line-height: 80px !important;
    }
    .title {
      height: 40px;
      line-height: 40px;
      background: #f3f3f3;
      padding: 0 20px;
      .back {
        &:hover {
          cursor: pointer;
        }
      }
    }
    .mt {
      margin: 20px 0;
    }
    .el-table__header-wrapper {
      table {
        th {
          text-align: center;
          background: #F9FAFC;
        }
      }
    }
    .price {
      height: 50px;
      line-height: 50px;
      background: #F9FAFC;
      padding-right: 20px;
      font-size: 16px;
      .red {
        color: #F04844;
        font-weight: bold;
      }
    }
    .main {
      padding-bottom: 30px;
      .el-form-item__label {
        background: #F9FAFC;
        height: 50px;
        line-height: 50px;
        border-right: 1px solid #e4e4e4;
      }
      .el-form-item {
        margin-bottom: 0;
        border-bottom: 1px solid #e4e4e4;
      }
      .el-col {
        padding-left: 10px;
      }
      .el-input {
        margin-top: 5px;
      }
    }
  }
</style>
