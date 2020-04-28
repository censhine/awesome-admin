<template>
  <el-table
    border
    :data="tableData"
  >
    <el-table-column prop="key" max-width=100></el-table-column>
    <el-table-column prop="val"> </el-table-column>
  </el-table>
</template>

<script>
    export default {
        props:{
          tableData: Array
        }
    }
</script>

<style scoped lang="scss">
  table th{
    display: none;
  }
  table tr td:first-child{
    background: #F9FAFC;
  }
</style>
