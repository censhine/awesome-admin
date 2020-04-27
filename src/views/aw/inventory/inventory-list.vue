<template>
  <d2-container>
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
          <d2-icon name="search"/>
          查询
        </el-button>
      </el-form-item>

      <el-form-item>
        <el-button
          type="default"
          @click="handleFormReset">
          <d2-icon name="refresh"/>
          刷新
        </el-button>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <el-table
      :data="tableData"
      border
      style="width:100%">
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
          <img src="../../../../public/image/goods/phone.jpg" alt="" style="width: 60px;height:60px">
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
      <el-table-column
        prop="goodsSales"
        label="销量"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <!--el-button type="text" size="mini">查看</el-button-->
          <el-button type="text" @click="handleEdit(scope.row)"  size="mini">编辑</el-button>
          <el-button type="text" style='color: red;' @click="handleClick(scope.row)" size="mini">删除</el-button>
        </template>
      </el-table-column>
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
    <el-dialog
    	title='编辑库存'
    	:visible.sync="dialogShow"
      width="40%"
    	>
    	 <el-form :model="form2" :rules="rules" ref="ruleForm2" label-width="100px">
    	 	<el-form-item label="商品编号：" >
        	<el-col :span="14">
        		<el-input v-model="form2.goodsNum" disabled autocomplete="off"></el-input>
        	</el-col>
        </el-form-item>
        <el-form-item label="商品名称：">
        	<el-col :span="14">
        		<el-input v-model="form2.goodsName" disabled autocomplete="off"></el-input>
        	</el-col>
        </el-form-item>
        <el-form-item label="价格："  prop="goodsPrice">
        	<el-col :span="14">
        		<el-input v-model="form2.goodsPrice" autocomplete="off"></el-input>
        	</el-col>
        </el-form-item>
        <el-form-item label="库存量："  prop="goodsCount">
        	<el-col :span="14">
          	<el-input v-model="form2.goodsCount" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="库存预警值："  prop="goodsWarning">
        	<el-col :span="14">
          	<el-input v-model="form2.goodsWarning" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
	      <el-button  @click="dialogShow = false" size="medium">取 消</el-button>
	    	<el-button type="primary" @click="submit" size="medium">确 定</el-button>
	    </span>
    </el-dialog>


  </d2-container>
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
        form2:{
        	goodsNum:'',
        	goodsName:'',
        	goodsPrice:'',
        	goodsCount:'',
        	goodsWarning:''
        },
        dialogVisible: false,
        dialogShow:false,
        currentPage1:5,
        tableData: [{
          goodsNum: '131510',
          goodsImg: '王小虎',
          goodsName: 'iphone 6',
          goodsPrice:6000,
          goodsCount:1000,
          goodsWarning:200,
          goodsSales:3000
        },
          {
            goodsNum: '182210',
            goodsImg: '王小虎',
            goodsName: 'iphone 7',
            goodsPrice:8000,
            goodsCount:500,
            goodsWarning:100,
            goodsSales:6000
          }],
          rules: {
        price: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
      }
    },
    methods: {
      handleClick() {
        this.$confirm('你确定要删除此商品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleEdit(row){

      	console.log(row);
      	this.form2 = row;
      	this.dialogShow = true;
      },
      submit(){
      	this.dialogShow = false;
      	console.log(this.form2);
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

