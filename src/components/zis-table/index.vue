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
      name: 'z-table',
        props:{
          tableData: Array
        }
    }
</script>

<style scoped lang="scss">
  .zis-table-view{
    .zis-item-status{
      color:red;
    }
    .zis-item-title td{
      text-align: center;
    }
    table th{
      display: none;
    }
    table tr td:first-child{
      background: #F9FAFC;
    }
  }
</style>
