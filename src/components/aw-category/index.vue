<template>
  <span>
    <el-cascader
      size="mini"
      v-model="value"
      @change="changeOptions"
      placeholder="请选择"
      :options="opData"
      :props="opProps"
      :show-all-levels="false"
      style="width: 245px;"
      filterable
      clearable></el-cascader>

<!--  <el-cascader-->
<!--    v-model="value"-->
<!--    :options="options"-->
<!--    @change="handleChange"></el-cascader>-->
  </span>

</template>

<script>
  import util from "@/utils/util";
  import {getPublicApi,findPageList} from "../../api/requestData";
  export default {
    name: "Category",
    props:{
      opProps:{
        type: Object,
        default() {
          return {
            value: 'id',
            label: 'name',
            children: 'children',
            checkStrictly: true,
            emitPath: false
          }
        }
      }
    },
    data() {
      return{
          value:[],
          address:[],
          opData: [{}],
          options: [{}],

      }
    },
    mounted() {
      this.getCategoryData()
    },
    methods: {
      getCategoryData() {
        const lcOptionsKey = 'category_data'
        let localOptions = ''
        if(localOptions = localStorage.getItem(lcOptionsKey)){
          this.options = this.opData = JSON.parse(localOptions)
        }else{
          findPageList('category').then(res=>{
            this.options = this.opData = util.formatDataToTree(res, 'id','pid',{})
            localStorage.setItem(lcOptionsKey,JSON.stringify(this.opData))
          }).catch(_=>{})
        }
      },
      changeOptions(value) {
        console.log(value);
        this.$emit('getCategory', value)
      },
      handleChange(value) {
        console.log(value);
        this.$emit('getCategory', value)
      },
    }
  }
</script>
