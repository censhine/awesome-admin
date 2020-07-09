<template>
  <aw-container>
    <template v-for="(item,index) in cities">
      <el-checkbox :indeterminate="isIndeterminate[index]" v-model="checkAll[index]" @change="handleCheckAllChange($event,index)"> {{item.label}}</el-checkbox>
      <el-checkbox-group v-model="checkedCities[index]" @change="handleCheckedCitiesChange($event,index)">
        <el-checkbox v-for="city in item.data" :label="city" :key="city">{{city}}</el-checkbox>
      </el-checkbox-group>
      <el-divider></el-divider>
    </template>
    <table cellspacing="0">
      <tr>
        <td colspan="24" style="text-align: center;background: #ededed;"><el-checkbox v-model="checkAllItem" @change="handleCheckAllChanges"></el-checkbox>全部选择</td>
      </tr>
    </table>
    <p style="text-align: center; width: 100%; display: block;">
      <el-button type="primary" size="mini">保存</el-button>
      <aw-back title="返回" align="center" style="margin-left: 160px; margin-top: -30px;"></aw-back>
    </p>
  </aw-container>
</template>
<script>
  const cityOptions = {
    goods:{
      label: '商品管理',
      data:['商品添加/编辑','商品删除/恢复','分类转移/删除','商品属性管理','商品评价管理','品自动上下架','图片批量处理','商品批量导出']
    },
    user:{
      label: '用户管理',
      data: ['用户添加/编辑','用户删除/恢复','用户分类转移/删除','用户属性管理','用户评价管理','用户下架','用户图片批量处理2','用户商品批量导出2']
    },
    consume:{
      label: ' 运营管理',
      data: ['运营管理添加/编辑3','运营管理删除/恢复3','运营管理转移/删除3','运营管理属性管理3','运营管理3','运营管理4','图片批量处理3','商品批量导出3']
    },
    shipping:{
      label: ' 运费模板管理',
      data: ['运费模板添加/编辑3','运费模板管理删除/恢复3','运费模板管理转移/删除3','运费模板属性管理3','运费模板运营管理3','运费模板3','图片批量处理5','运费模板批量导出3']
    },
  }

  export default {
    data() {
      return {
        checkAll: {goods:false, user:false, consume:false,shipping:false},
        checkAllItem: {goods:false, user:false, consume:false,shipping:false},
        checkedCities: {goods:[],user:[],consume:[],shipping:[]},
        cities: cityOptions,
        isIndeterminate:{goods:true, user:true, consume:true,shipping:true},
      };
    },
    methods: {
      handleCheckAllChange(val,type) {
        this.checkedCities[type] = val ? cityOptions[type]['data'] : [];
        this.isIndeterminate[type] = false;
      },
      handleCheckAllChanges(val) {
        console.log(val);
        for(let key in cityOptions){
          this.checkedCities[key] = val ? cityOptions[key]['data'] : [];
          this.isIndeterminate[key] = false;
        }
      },
      handleCheckedCitiesChange(value,type) {
        let checkedCount = value.length;
        this.checkAll[type] = checkedCount === this.cities[type]['data'].length;
        this.isIndeterminate[type] = checkedCount > 0 && checkedCount < this.cities[type]['data'].length;
      }
    }
  };
</script>

<style lang="scss" scoped>
  table{
    margin-bottom: 20px;
    width:100%;
  }
  table tr{
    border-collapse: collapse;
    border-spacing: 0;
  }
  table tr td {
    collapse: collapse;
    border-bottom: 1px solid #ededed;
    padding: 8px;
    border-right: 1px solid #ededed;
    input[type='checkbox'] {
      padding: 3px 5px;
    }
  }
  table {
    border: 1px solid #ededed;
  }
</style>
