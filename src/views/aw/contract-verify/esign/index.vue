<template>
  <div class="sign-form">
    <div v-if="resultImg" class="sign-pic">
      <el-tag>签名结果：</el-tag>
      <img :src="resultImg"/>
    </div>
    <div class="sign-bg">
      <vue-esign class="sign-prop" ref="esign" :width="800" :height="300" :isCrop="isCrop" :lineWidth="lineWidth" :lineColor="lineColor" :bgColor.sync="bgColor" />
      <el-button @click="handleReset" type="warning" size="mini">重新签名</el-button>
      <el-button @click="handleGenerate" type="success" size="mini">确认签名</el-button>
    </div>
  </div>
</template>

<script>
    import vueEsign from  'vue-esign'
    export default {
      name: "zis-esign",
      data () {
      return {
        lineWidth: 3,
        lineColor: '#000000',
        bgColor: '',
        resultImg: '',
        isCrop: true
      }
      },
      methods: {
      handleReset () {
        this.resultImg = ''
        this.$refs.esign.reset()
      },
      handleGenerate () {
        this.$refs.esign.generate().then(res => {
          this.resultImg = res
          this.$refs.esign.reset()
        }).catch(err => {
            this.$message({message:'签名错误',type:"error"})
        })
      }
      },
      components:{
        vueEsign
      }
    }
</script>

<style scoped>
  .sign-pic{
    border:1px solid #ededed;
  }
  .sign-prop{
    margin-top: 15px;
    margin-bottom: 15px;
    border: 1px solid #ededed;
  }
</style>
