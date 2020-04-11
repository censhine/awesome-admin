<template>
    <el-cascader
      v-model="value"
      :options="options"
      :props="propsOptions"
      @change="handleChange"
      filterable></el-cascader>
</template>

<script>
  const {provinceList} = require('./location.js')
  export default {
    name: "Address",
    props:{
      propsOptions:{
        type: Object,
        default(){
          return { expandTrigger: 'hover' }
        }
      }
    },
    data(){
      return{
          value:[],
          options: provinceList
      }
    },
    methods:{
      handleChange(value){
        this.$emit('getAddress', value)
      }
    }
  }
</script>
