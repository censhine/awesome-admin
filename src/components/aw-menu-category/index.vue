<template>
    <el-form :model="form" ref="addForm" size="mini">
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
    props:{
      apiPath:{
        type: String,
        required: true
      },
      showLevels:{
        type: Boolean,
        default: false,
      },
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
      },
    },
    data() {
      return{
        value:'',
        opData: [{}],
        form:{
            value:''
        }
      }
    },
    mounted() {
      this.getMenuCategory()
    },
    methods: {
      resetField(){
        this.form.value =''
          this.value = ''
      },
      getMenuCategory() {
        //'/operate/web/supplyMenu/findAll'
          getPublicApi(this.apiPath).then(res=>{
            //let rootList = [{id:0,parentId:0,name:'根目录'}];
            let data = res.data
            data.unshift({id:'',parentId:0,name:'根目录'})
            //console.log(data);
            this.opData = util.toTreeList(data)
          }).catch(_=>{})
      },
      changeOptions(value) {
        //console.log(value);
        this.$emit('getMenuCategory', value)
      }
    }
  }
</script>
