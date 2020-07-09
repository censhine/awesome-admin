<template>
    <el-form :model="form" ref="addressForm" size="mini">
      <el-form-item prop="value">
        <el-cascader
          v-model="form.value"
          @change="changeOptions"
          placeholder="请选择"
          :options="opData"
          :props="opProps"
          :show-all-levels="showLevels"
          style="width: 245px;"
          filterable
          clearable></el-cascader>
      </el-form-item>
    </el-form>
</template>

<script>
  import util from "@/utils/util";
  import {getPublicApi} from "../../api/requestData";
  export default {
    name: "Address",
    props:{
      showLevels:{
        type: Boolean,
        default: false,
      },
      opProps:{
        type: Object,
        default() {
          return {
            value: 'zh',
            label: 'zh',
            children: 'children',
            checkStrictly: true,
            emitPath: false
          }
        }
      },
    },
    data() {
      return{
        value:'',
        address:[],
        opData: [{}],
        form:{
            value:''
        }
      }
    },
    mounted() {
      this.getAddressData()
    },
    methods: {
      resetField(){
        this.form.value =''
          this.value = ''
      },
      getAddressData() {
        const lcOptionsKey = 'option-address'
        let localOptions = ''
        if(localOptions = localStorage.getItem(lcOptionsKey)){
          this.opData = JSON.parse(localOptions)
        }else{
          getPublicApi('/operate/public/areas/findAll',{level:2, parentId:1}).then(res=>{
            this.opData = util.formatDataToTree(res, 'numId','parentId',{})
            localStorage.setItem(lcOptionsKey,JSON.stringify(this.opData))
          }).catch(_=>{

          })
        }
      },
      changeOptions(value) {
        console.log(value);
        this.$emit('getAddress', value)
      }
    }
  }
</script>
