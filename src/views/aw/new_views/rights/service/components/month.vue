<template>
  <el-table border :data="tableData">
    <el-table-column label="头像" prop="header_img" align="center">
      <template slot-scope="scope">
        <el-image :src="scope.row.header_img" style="height: 30px; width: 30px;"></el-image>
      </template>
    </el-table-column>
    <el-table-column label="昵称" prop="nick_name" align="center"></el-table-column>
    <el-table-column label="开始时间" prop="start_time" align="center"></el-table-column>
    <el-table-column label="结束时间" prop="end_time" align="center"></el-table-column>
  </el-table>
</template>

<script>
  export default {
    props: {
      tableData: Array,
      default: []
    }
  }
</script>

<style scoped>

</style>
