<template>
  <aw-container>
    <aw-header title="支付编辑"></aw-header>
    <el-form v-model="form" :rules="rules" ref="form" label-position='right' label-width="200px">

      <el-form-item label="支付方式名称" prop="payment_name">
        <el-input v-model="form.payment_name"  placeholder="请输入支付名称"></el-input>
      </el-form-item>

      <el-form-item label="支付方式描述" prop="payment_desc">
        <el-input type="textarea" rows="5" v-model="form.payment_desc" placeholder="请输入支付方式描述">
        </el-input>
      </el-form-item>

      <el-form-item label="微信公众号AppId" prop="appid">
        <el-input v-model="form.appid" placeholder="请输入微信公众号AppId"></el-input>
      </el-form-item>

      <el-form-item label="微信公众号AppSecret" prop="appsecret">
        <el-input v-model="form.appsecret" placeholder="请输入微信公众号AppSecret"></el-input>
      </el-form-item>

      <el-form-item label="商户支付密钥Key" prop="appkey">
        <el-input v-model="form.appkey" placeholder="请输入商户支付密钥Key"></el-input>
      </el-form-item>

      <el-form-item label="受理商ID(即微信支付商户号)" prop="merchant_id">
        <el-input v-model="form.merchant_id" placeholder="请输入受理商ID"></el-input>
      </el-form-item>

      <el-form-item label="支付手续费" prop="cost">
        <el-input v-model="form.cost" placeholder="请输入支付手续费"></el-input>
      </el-form-item>

      <el-form-item label="是否货到付款" prop="buy_status">
        <el-switch v-model="form.buy_status" inactive-value="0" active-color="#67C23A" active-value="1" @change="handleSwitch"></el-switch>
      </el-form-item>

      <el-form-item label="是否在线支付" prop="pay_status">
        <el-switch v-model="form.pay_status" inactive-value="0" active-color="#67C23A" active-value="1" @change="handleSwitch"></el-switch>
      </el-form-item>

      <el-form-item>
        <p style="text-align: left"><el-button type="success" size="mini" @click="handleCreate">确定</el-button></p>
        <aw-back title="取消" icon-class="icon-back-hidden" align="left" style="margin-top: -50px; margin-left: 70px;"></aw-back>
      </el-form-item>
    </el-form>
  </aw-container>
</template>

<script>
export default {
    data() {
      return {
        form:{
          payment_name:'',
          payment_desc: '',
          appid:'',
          merchant_id:'',
          cost:'',
          buy_status: '1',
          pay_status: '0',
        },
        rules:{
          payment_name:[{required:true,message:'不能为空',trigger:'blur'}],
        }
      }
    },
    watch:{
      forms:{
        handler(val){
          if(this.$route.query){
            this.form = this.$route.query
          }
        },
        immediate: true
      }
    },
    methods:{
      handleChange(value){
        this.$message.success(value.toString())
      },
      handleCreate(){
        this.$refs.form.validate((valid)=>{
          if(valid){
            this.$message.success(JSON.stringify({...this.$refs.form}))
          }else{
            this.$message.error('请检查填写!')
            return false;
          }
        })
      },
      handleSwitch(index){
        this.$message.success(index.toString())
      }
    }
}
</script>

<style scoped>

</style>
