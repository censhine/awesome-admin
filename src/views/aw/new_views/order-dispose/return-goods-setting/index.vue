<template>
	<aw-container>
		<el-dialog title='添加原因' :visible.sync="dialogShow" width="40%">
			<el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px">
				<el-form-item label="退货原因类型：" prop='type'>
					<el-col :span="13">
						<el-input v-model="form.type" autocomplete="off"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="排序：" prop="sort">
					<el-col :span="13">
						<el-input v-model="form.sort" autocomplete="off"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="是否启用：">
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
		<el-dialog title='编辑原因' :visible.sync="dialogShow2" width="40%">
			<el-form :model="form2" :rules="rules" ref="ruleForm2" label-width="120px">
				<el-form-item label="退货原因类型：" prop='type'>
					<el-col :span="13">
						<el-input v-model="form2.type" autocomplete="off"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="排序：" prop="sort">
					<el-col :span="13">
						<el-input v-model="form2.sort" autocomplete="off"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="是否启用：">
					<el-col :span="13">
						<el-switch v-model="form2.enable"></el-switch>
					</el-col>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
	      <el-button  @click="dialogShow2 = false" size='medium'>取 消</el-button>
	    	<el-button type="primary" @click="submit2('ruleForm2')" size='medium'>确 定</el-button>
	    </span>
		</el-dialog>
		<el-dialog title="温馨提示" :visible.sync="dialogVisible" width="30%">
			<span><i class="el-icon-question" style="color: #409EFF;"></i> 是否批量删除退货原因？</span>
			<span slot="footer" class="dialog-footer">
    <el-button  @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
		</el-dialog>
		<div class="header">
			<el-button type='default' size='mini' @click="showDialog"><i class="el-icon-plus"></i>添加原因</el-button>
			<el-button type='default' size='mini' @click='dels'>批量删除</el-button>
			<el-button type="success" size='mini' @click='handleFormReset'>
				<aw-icon name="refresh" />刷新</el-button>
		</div>

		<el-table :data="tableData" border @selection-change="handleSelectionChange" style="width: 100%">
			<el-table-column type="selection" align="center">
			</el-table-column>
			<el-table-column fixed prop="type" label="原因类型" align="center">
			</el-table-column>
			<el-table-column prop="sort" label="排序" align="center">
			</el-table-column>
			<el-table-column prop="enable" label="是否启用" align="center">
				<template slot-scope='scope'>
					<el-switch v-model="scope.row.enable"></el-switch>
				</template>
			</el-table-column>
			<el-table-column prop="createTime" label="发布时间" align="center">
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-button type="text" size="mini" @click='edit(scope.row)'>编辑</el-button>
					<el-button type="text" style='color: red;' @click="del(scope.row,scope.$index)" size="mini">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
   		<pagination :pageTotal="pageTotal" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"></pagination>


	</aw-container>
</template>

<script>
	import Pagination from "@/components/pagination";
	export default {
		components:{
			Pagination
		},
		data() {
			return {
				pageTotal:10,
    		incomePayData:{
				page:1,
				limit:1,
				name:''
			},
				dialogShow: false,
				dialogShow2: false,
				dialogVisible: false,
				tableData: [{
					type: '质量',
					sort: 1,
					enable: true,
					createTime: '2020-03-20'
				}, {
					type: '假货',
					sort: 2,
					enable: false,
					createTime: '2020-03-20'
				}],
				form: {
					type: '',
					sort: '',
					enable: false
				},
				form2: {
					type: '',
					sort: '',
					enable: false
				},
				rules: {
					type: [{
						required: true,
						message: '请输入退货原因',
						trigger: 'blur'
					}],
					sort: [{
							required: true,
							message: '请输入排序',
							trigger: 'blur'
						},
						{
							pattern: /^[1-9]\d*$/,
							message: '只能输大于0的数字'
						}
					]

				},
				selectArr: []
			}
		},
		methods: {
			handleSelectionChange(val) {
				if(val){
						this.selectArr = [];
						for(let item of val) {
					this.selectArr.push(item.orderNum);
				}
					}

			},
			setArr(array) {
				return Array.from(new Set(array));
			},
			dels() {
				if(this.selectArr.length !== 0) {
					let arr = this.setArr(this.selectArr);
					this.dialogVisible = true;
				} else {
					this.$message.error('请选择至少一条原因');
				}
			},

			del(row, index) {
				this.$confirm('你确定要删除此原因吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.tableData.splice(index, 1);
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
			showDialog() {
				if(this.$refs.ruleForm) {
					this.$refs.ruleForm.clearValidate();
				}
				this.dialogShow = true;
			},
			edit(row) {
				if(this.$refs.ruleForm2) {
					this.$refs.ruleForm2.clearValidate();
				}
				this.dialogShow2 = true;
				this.form2 = row;
			},
			handleSizeChange(val) {
				this.incomePayData.page = val;
			},
			handleCurrentChange(val) {
				this.incomePayData.limit = val;
			},
			handleFormReset () {
        this.$router.push({
        	path:'/refresh'
        })
      },
			submit(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						alert('submit!');
						console.log(this.form)
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			submit2(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
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
	.header {
		margin-bottom: 20px;
	}
</style>
