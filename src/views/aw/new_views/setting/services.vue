<template>
	<aw-container>
    <aw-header title="保障服务设置"></aw-header>
		<div class="header">
			 <el-button type='primary' size='medium' @click="dialogShow = true"><i class="el-icon-plus"></i>添加保障服务</el-button>
	   		 <el-button type="default" size='medium'><aw-icon name="refresh"/>刷新</el-button>
		</div>
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
        prop="cause"
        label="保障名称"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="sort"
        label="保障详情"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="enable"
        label="是否启用"
        align="center"
      >
      <template slot-scope='scope'>
      	 <el-switch v-model="scope.row.enable"></el-switch>
      </template>
      </el-table-column>
        <el-table-column
          prop="createTime"
          label="发布时间"
          align="center"
        >
        </el-table-column>
      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="text"  size="mini" @click='edit(scope.row)' >编辑</el-button>
          <el-button type="text" style='color: red;' @click="del(scope.row)" size="mini">删除</el-button>
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
    	title='添加保障服务'
    	:visible.sync="dialogShow"
      width="40%"
    	>
    	 <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px">
    	 	<el-form-item label="保障名称：" prop='type' >
        	<el-col :span="13">
        		<el-input v-model="form.type"   autocomplete="off"></el-input>
        	</el-col>
       </el-form-item>
        <el-form-item label="保障详情："  prop="sort">
        	<el-col :span="13">
        		<el-input type="textarea" rows="6" v-model="form.sort" autocomplete="off"></el-input>
        	</el-col>
        </el-form-item>
        <el-form-item label="是否启用：" >
        	<el-col :span="13">
        		<el-switch v-model="form.enable"></el-switch>
        	</el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
	      <el-button  @click="dialogShow = false" size='medium'>取 消</el-button>
	    	<el-button type="primary" @click="submit('ruleForm')" size='medium'>确 定</el-button>
	    </span>
    </el-dialog>
    <el-dialog
    	title='编辑保障服务'
    	:visible.sync="dialogShow2"
      width="40%"
    	>
    	 <el-form :model="form2" :rules="rules" ref="ruleForm2" label-width="120px">
         <el-form-item label="保障名称：" prop='type' >
           <el-col :span="13">
             <el-input v-model="form2.type"   autocomplete="off"></el-input>
           </el-col>
         </el-form-item>
    	 	<el-form-item label="保障详情：" prop='type' >
        	<el-col :span="13">
        		<el-input v-model="form2.sort"   autocomplete="off"></el-input>
        	</el-col>
       </el-form-item>
        <el-form-item label="是否启用："  prop="sort">
        	<el-col :span="13">
        		<el-input v-model="form2.sort" autocomplete="off"></el-input>
        	</el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
	      <el-button  @click="dialogShow2 = false" size='medium'>取 消</el-button>
	    	<el-button type="primary" @click="submit2('ruleForm2')" size='medium'>确 定</el-button>
	    </span>
    </el-dialog>
	</aw-container>
</template>

<script>
	export default{
		data(){
			return{
				currentPage1:1,
				dialogShow:false,
				dialogShow2:false,
				tableData: [{
		          cause: '七天无理由退换',
		          sort:'满足相应条件，消费者可申请：七天无理由退换',
		          enable: true,
		          createTime:'2020-03-20'
       			 },{
		          cause: '48小时发货',
		          sort:'成功下单，商家48小时内完成发货',
		          enable:false ,
		          createTime:'2020-03-20'
       			 }],
       			 form:{
       			 	type:'',
       			 	sort:'',
       			 	enable:false
       			 },
       			 form2:{
       			 	type:'',
       			 	sort:'',
       			 	enable:false
       			 },
       			 rules:{
       			 	type:[
	       			 		{
	       			 		required: true,
							message: '请输入退货原因',
							trigger: 'blur'
	       			 		}
       			 		],
       			 	sort:[
       			 			{
	       			 		required: true,
							message: '请输入排序',
							trigger: 'blur'
	       			 		},
	       			 		{
	       			 			pattern:/^[1-9]\d*$/,
								message:'只能输大于0的数字'
	       			 		}
       			 		]


       			 }
			}
		},
		methods:{
			del() {
        this.$confirm('你确定要删除此原因吗?', '提示', {
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
      edit(row){
      	this.dialogShow2 = true;
      	this.form2 = row;
      },
      	 handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      submit(formName){
      	this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            console.log(this.form)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      submit2(formName){
      	this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            console.log(this.form2)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
		}
	}
</script>

<style scoped lang="scss">
.header{
	margin-bottom: 20px;
}
.page{
	margin-top: 40px;
}
</style>
