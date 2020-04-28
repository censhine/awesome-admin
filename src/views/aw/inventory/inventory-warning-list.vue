<template>
  <aw-container>
    <aw-header title="库存预警列表"></aw-header>
    <el-form
      :inline="true"
      :model="form"
      ref="form"
      size="mini"
      style="margin:20px 0 0px;padding: 10px 10px 0;background: #fff"
    >
      <el-form-item label="输入搜索：" prop="user">
        <el-input
          v-model="form.user"
          placeholder="商品编号"
          style="width: 140px;"/>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="handleFormSubmit">
          <aw-icon name="search"/>
          查询
        </el-button>
      </el-form-item>

      <el-form-item>
        <el-button
          type="default"
          @click="handleFormReset">
          <aw-icon name="refresh"/>
          刷新
        </el-button>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <el-table
      :data="tableData"
      border
      style="width:71.56%">
      <el-table-column
        type="selection"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="goodsNum"
        label="商品编号"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="goodsImg"
        label="商品图片"
        align="center"
      >
        <template slot-scope="scope">
          <img src="https://img14.360buyimg.com/n0/jfs/t1/105985/22/15020/304059/5e6f451fEb5351ab6/6f2245c0dc9b647f.jpg" alt="" style="width: 60px;height:60px">
        </template>
      </el-table-column>
      <el-table-column
        prop="goodsName"
        label="商品名称"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="goodsPrice"
        label="价格"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="goodsCount"
        label="库存量"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="goodsWarning"
        label="库存预警值"
        align="center"
      >
      </el-table-column>
      <!--el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="text" size="mini">查看</el-button>
        </template>
      </el-table-column-->
    </el-table>
    <el-divider></el-divider>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="10"
        :page-sizes="[10, 20, 30, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100">
      </el-pagination>
    </div>
  </aw-container>
</template>

<script>
  import day from 'dayjs'
  export default {
    data () {
      return {
        form: {
          type: '1',
          user: ''
        },
        dialogVisible: false,
        currentPage1:5,
        tableData: [{
          goodsNum: '131510',
          goodsImg: '王小虎',
          goodsName: 'iphone 6',
          goodsPrice:6000,
          goodsCount:1000,
          goodsWarning:200
        },
          {
            goodsNum: '182210',
            goodsImg: '王小虎',
            goodsName: 'iphone 7',
            goodsPrice:8000,
            goodsCount:500,
            goodsWarning:100
          }]
      }
    },
    methods: {
      handleClick(row) {
        console.log(row);
        this.dialogVisible = true;
      },
      tabBtn(index){
        this.zIndex = index;
      },
      handleFormSubmit () {
        console.log('11111')
      },
      handleFormReset () {
        this.refresh();
      },
      handleSelectionChange (selection) {
        console.log(selection)
      },
      refresh(){
        location.reload();
      },
      goEdit(){
      	this.$router.push({
      		path:'/edit'
      	})
      },
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>

<style scoped lang="scss">

.page{
	margin-top: 40px;
}
</style>

