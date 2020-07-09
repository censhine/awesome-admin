<template>
  <el-form :model="form" ref="industryForm" size="mini">
    <el-form-item prop="value">
    <el-select v-model="form.value" clearable @change="changeOptions">
      <el-option v-for="(item,index) in opData" :key="index" :label="item.name" :value="item.name"></el-option>
    </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
  import util from "@/utils/util";
  import {getPublicApi} from "../../api/requestData";
  export default {
    name: "Industry",
    data() {
      return{
          value:'',
          opData: [{}],
          form:{
            value: ''
          }
      }
    },
    mounted() {
      this.getIndustryData()
    },
    methods: {
      resetField(){
        this.form.value =''
        this.value = ''
      },
      getIndustryData() {
        const lcOptionsKey = 'option-industry'
        let localOptions = ''
        if(localOptions = localStorage.getItem(lcOptionsKey)){
          this.opData = JSON.parse(localOptions)
        }else{
          getPublicApi('/operate/web/industry/findPage',{},{pageSize:1000, pageNo:1}).then(res=>{
            this.opData = res.data.data
            localStorage.setItem(lcOptionsKey,JSON.stringify(this.opData))
          }).catch(_=>{

          })
        }
      },
      changeOptions(value) {
        console.log(value);
        this.$emit('getIndustry', value)
      }
    }
  }
</script>
