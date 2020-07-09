<template>
  <aw-container>
    <aw-header title="商城设置"></aw-header>
    <div class="shopSetting">
      <el-form :model="form" ref="addForm" size="mini">
      <el-row class="mt_30 ml_24 mr_24 font_16">
        <el-col :span="6" class="pl_24">
          <div class="">参数名</div>
        </el-col>
        <el-col :span="10" class="pl_24">
          <div class="">参数值</div>
        </el-col>
        <el-col :span="4" class="pl_24">
          <div class="">变量名</div>
        </el-col>
        <el-col :span="4" class="pl_24">
          <div class="">参数说明</div>
        </el-col>
      </el-row>
      <el-row class="ml_24 mr_24 font_14 color_2">
        <el-col :span="6" class="pl_24">
          <div class="">收货后商家到账时间</div>
        </el-col>
        <el-col :span="10" class="pl_24 pr_24">
          <el-select v-model="form.autoTransferTime">
            <el-option :value="10" label="十秒（测试）"></el-option>
            <el-option :value="600" label="十分钟（测试）"></el-option>
            <el-option :value="1800" label="半小时"></el-option>
            <el-option :value="3600" label="1小时"></el-option>
            <el-option :value="86400" label="1天"></el-option>
            <el-option :value="604800" label="7天"></el-option>
            <el-option :value="1296000" label="15天"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4" class="pl_24">
          <div class="">autoTransferTime</div>
        </el-col>
        <el-col :span="4" class="pl_24">
          <div class="">无</div>
        </el-col>
      </el-row>
      <el-row class="ml_24 mr_24 font_14 color_2">
        <el-col :span="6" class="pl_24">
          <div class="">自动确认收货时间</div>
        </el-col>
        <el-col :span="10" class="pl_24 pr_24">
          <el-select v-model="form.autoConfirmTime">
            <el-option :value="10" label="十秒（测试）"></el-option>
            <el-option :value="600" label="十分钟（测试）"></el-option>
            <el-option :value="1800" label="半小时"></el-option>
            <el-option :value="3600" label="1小时"></el-option>
            <el-option :value="86400" label="1天"></el-option>
            <el-option :value="604800" label="7天"></el-option>
            <el-option :value="1296000" label="15天"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4" class="pl_24">
          <div class="">autoConfirmTime</div>
        </el-col>
        <el-col :span="4" class="pl_24">
          <div class="">无</div>
        </el-col>
      </el-row>
<!--      <el-row class="ml_24 mr_24 font_14 color_2">-->
<!--        <el-col :span="6" class="pl_24">-->
<!--          <div class="">直接邀请分成比例(%)</div>-->
<!--        </el-col>-->
<!--        <el-col :span="10" class="pl_24 pr_24">-->
<!--          <el-input v-model="form.fastInviteScale" placeholder="请输入内容"></el-input>-->
<!--        </el-col>-->
<!--        <el-col :span="4" class="pl_24">-->
<!--          <div class="">fastInviteScale</div>-->
<!--        </el-col>-->
<!--        <el-col :span="4" class="pl_24">-->
<!--          <div class="">默认店铺分销直接邀请分成比例</div>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--      <el-row class="ml_24 mr_24 font_14 color_2">-->
<!--        <el-col :span="6" class="pl_24">-->
<!--          <div class="">间接邀请分成比例(%)</div>-->
<!--        </el-col>-->
<!--        <el-col :span="10" class="pl_24 pr_24">-->
<!--          <el-input v-model="form.otherInviteScale" placeholder="请输入内容"></el-input>-->
<!--        </el-col>-->
<!--        <el-col :span="4" class="pl_24">-->
<!--          <div class="">otherInviteScale</div>-->
<!--        </el-col>-->
<!--        <el-col :span="4" class="pl_24">-->
<!--          <div class="">默认店铺默认间接邀请分成比例</div>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--      <el-row class="ml_24 mr_24 font_14 color_2">-->
<!--        <el-col :span="6" class="pl_24">-->
<!--          <div class="">店铺分销直推与间推总百分比</div>-->
<!--        </el-col>-->
<!--        <el-col :span="10" class="pl_24 pr_24">-->
<!--          <el-input v-model="form.incomeSum" placeholder="请输入内容"></el-input>-->
<!--        </el-col>-->
<!--        <el-col :span="4" class="pl_24">-->
<!--          <div class="">incomeSum</div>-->
<!--        </el-col>-->
<!--        <el-col :span="4" class="pl_24">-->
<!--          <div class=""><span style="font-size:11px">店铺直接邀请分成百比例与店铺间接邀请分成百比例 的最大百分比总和</span> </div>-->
<!--        </el-col>-->
<!--      </el-row>-->
      <el-row class="ml_24 mr_24 font_14 color_2">
        <el-col :span="6" class="pl_24">
          <div class="">开店是否需要上传营业执照信息</div>
        </el-col>
        <el-col :span="10" class="pl_24 pr_24">
          <el-select v-model="form.buinessLicense" clearable>
            <el-option label="是" :value="1"></el-option>
            <el-option label="否" :value="0"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4" class="pl_24">
          <div class="">buinessLicense</div>
        </el-col>
        <el-col :span="4" class="pl_24">
          <div class="">无</div>
        </el-col>
      </el-row>
      <el-row class="ml_24 mr_24 font_14 color_2">
        <el-col :span="6" class="pl_24">
          <div class="">平台佣金比例千分之</div>
        </el-col>
        <el-col :span="10" class="pl_24 pr_24">
          <el-input v-model="form.platformCommission" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="4" class="pl_24">
          <div class="">platformCommission</div>
        </el-col>
        <el-col :span="4" class="pl_24">
          <div class="">商家销售平台佣金比例千分比 1-1000</div>
        </el-col>
      </el-row>
      <el-row class="ml_24 mr_24 font_14 color_2">
        <el-col :span="6" class="pl_24">
          <div class="">资源上传URL</div>
        </el-col>
        <el-col :span="10" class="pl_24 pr_24">
          <el-input v-model="form.uploadUrl" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="4" class="pl_24">
          <div class="">uploadUrl</div>
        </el-col>
        <el-col :span="4" class="pl_24">
          <div class="">需要重新登录管理后台才生效</div>
        </el-col>
      </el-row>
      <div class="tips font_12 color_2 ml_24 mt_12"></div>
      <div class="textCenter mt_30" style="margin-top: 30px;">
        <el-button type="primary" @click="handlerPreservation">保存设置</el-button>
      </div>
      </el-form>
    </div>
  </aw-container>
</template>

<script>

  export default{
    data() {
      return{
        form: {
          autoTransferTime: 10,
          autoConfirmTime: 10,
          fastInviteScale:'10',
          otherInviteScale:'20',
          incomeSum:'50',
          buinessLicense:1,
          platformCommission:'50',
          uploadUrl:'http://192.168.1.136:8088/web/business/upload'
        }
      }
    },
    mounted() {
      this.getSetting()
    },
    methods: {
      getSetting (){

      },
      handlerPreservation (){
          if(this.$refs.addForm.validate){
            this.$message.success(JSON.stringify({...this.form}))
          }
      }
    }
  }
</script>

<style scoped>
  /deep/.el-row{
    min-height: 44px;
    height: auto;
    line-height: 44px;
    border: 1px solid #eeeeee;
  }
  /deep/ .el-col-10, /deep/ .el-col-4 {
    border-left: 1px solid #eeeeee;
  }
</style>
