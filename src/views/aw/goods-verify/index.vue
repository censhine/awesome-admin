<template>
  <d2-container>
    <div class="btn-group">
      <span class="btn-list"
            :class="{'active':index===zIndex}"
            v-for="(item,index) in btns" :key="index"
            @click="tabBtn(index)"
      >{{item.btnText}} <i>({{item.num}})</i>  </span>
    </div>
    <el-divider></el-divider>
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
          placeholder="商品名称/商品货号"
          style="width: 140px;"/>
      </el-form-item>
      <el-form-item label="商品分类：" prop="type">
        <el-select
          v-model="form.type"
          placeholder="请选择商品分类"
          style="width: 160px;">
          <el-option label="状态 1" value="1"/>
          <el-option label="状态 2" value="2"/>
          <el-option label="状态 3" value="3"/>
          <el-option label="状态 4" value="4"/>
          <el-option label="状态 5" value="5"/>
        </el-select>
      </el-form-item>
      <el-form-item label="商品品牌：" prop="type">
        <el-select
          v-model="form.type"
          placeholder="请选择商品品牌"
          style="width: 160px;">
          <el-option label="状态 1" value="1"/>
          <el-option label="状态 2" value="2"/>
          <el-option label="状态 3" value="3"/>
          <el-option label="状态 4" value="4"/>
          <el-option label="状态 5" value="5"/>
        </el-select>
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
      <el-form-item>
        <el-button
          type="primary"
          @click="goAdd">
          <d2-icon name="add"/>
          添加商品
        </el-button>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        type="selection"
        align="center"
      >
      </el-table-column>
      <el-table-column
        fixed
        prop="goodsNum"
        label="商品ID"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="goodsImg"
        label="商品图片"
        align="center"
      >
        <template slot-scope="scope">
          <img :src="scope.row.goodsImg" alt="" style="width: 60px;height:60px">
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
        label="总库存"
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
        prop="status"
        label="状态"
        align="center"
      >
      </el-table-column>

        <el-table-column
          prop="startTime"
          label="发布时间"
          align="center"
        >
        </el-table-column>
          <el-table-column
            prop="endTime"
            label="修改时间"
            align="center"
          >
          </el-table-column>
      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="text"  size="mini" @click="handleVerify(scope.$index)">审核</el-button>
          <el-button type="text" size="mini" @click="handleView(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <verify :form-data="formData" ref="verifyDialog"/>

    <el-divider></el-divider>

    <div class="page">
	    	<el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page.sync="currentPage"
	      :page-size="10"
        :page-sizes="[10, 20, 30, 50]"
        layout="total, sizes, prev, pager, next, jumper"
	      :total="100">
	    </el-pagination>
    </div>

    <!--<el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
 		>
      <span>你确定要删除该商品吗？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>-->

  </d2-container>
</template>

<script>
  import day from 'dayjs'
  export default {
    components:{
      'Verify': ()=>import('./verify')
    },
    data () {
      return {
        form: {
          type: '1',
          user: ''
        },
        currentPage:1,
        dialogVisible: false,
        dialogStatus:'',
        dialogLoading: false,
        formData: {},
        currentPage1:5,
        btns:[
          {
            btnText:'全部商品',
            num:1000
          },
          {
            btnText:'售卖中',
            num:1000
          },
          {
            btnText:'已下架',
            num:1000
          },
          {
            btnText:'审核失败',
            num:1000
          },
          {
            btnText:'待审核',
            num:1000
          }
        ],
        zIndex:0,
        tableData: [{
          goodsNum: '131510',
          goodsImg: 'https://img14.360buyimg.com/n0/jfs/t1/18745/20/11316/542184/5c8f1730E08fc84f8/4b4e196956302b74.jpg',
          goodsName: '冰丝短袖网眼T恤男夏季超薄款运动',
          goodsPrice:6000,
          goodsCount:1000,
          goodsSales:200,
          status:'已下架',
          startTime:'2020-03-20',
          endTime:'2020-05-01'
        },
          {
            goodsNum: '182210',
            goodsImg: 'https://img14.360buyimg.com/n0/jfs/t1/18745/20/11316/542184/5c8f1730E08fc84f8/4b4e196956302b74.jpg',
            goodsName: '冰丝短袖网眼T恤男夏季超薄款运动',
            goodsPrice:8000,
            goodsCount:500,
            goodsSales:100,
            status:'审核失败',
            startTime:'2020-02-20',
            endTime:'2020-04-01'
          }]
      }
    },
    methods: {
      // 弹出审核对话框
      handleVerify(index) {
        this.formData = { ...this.tableData[index] }
        this.$nextTick(() => {
          if (this.$refs.form) {
            this.$refs.form.clearValidate()
          }
          this.dialogStatus = 'update'
          this.dialogLoading = false
          this.$refs.verifyDialog.isShowDia(this.formData,true)
        })
      },
      handleView(row){
        this.$router.push({path:'/zis/goods-verify/detail',query:row})
      },
      del() {
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
      tabBtn(index){
        this.zIndex = index;
      },
      handleFormSubmit () {
        console.log('提交')
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
      goAdd(){
      	this.$router.push({
      		path:'/zis/goods-verify/add'
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
.btn-group{
  .btn-list{
    display: inline-block;
    width: 120px;
    text-align: center;
    line-height: 34px;
    margin-right: 10px;
    border: 1px solid #ccc;
    cursor: pointer;
    &.active{
      background: #409EFF;
      color: #fff;
      border: 1px solid #409EFF;
    }
  }
}
.page{
	margin-top: 40px;
}

</style>

