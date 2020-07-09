<template>
	<div class="wrap">
		<div class="btn">
			<el-button type="default" @click="goAdd" size='mini' v-if="auth.add">
				<i class="el-icon-plus"></i> 添加商品
			</el-button>
			<el-button type="default" @click="putWay" size='mini' v-if="auth.add">
				批量上架
			</el-button>
			<el-button type="default" @click="soldOut" size='mini' v-if="auth.add">
				批量下架
			</el-button>
			<el-button type="default" @click="dels" size='mini' v-if="auth.add">
				批量删除
			</el-button>
		</div>
		<el-table :data="tableData" border @selection-change="handleSelectionChange" style="width: 100%">
			<el-table-column
				type="selection"
				align="center">
			</el-table-column>
			<!--<el-table-column
				prop="goodsNum"
				label="商品ID"
				align="center">
			</el-table-column>-->
			<el-table-column
				prop="productName"
				label="商品名称"
        width="260"
				style='width: 220px;overflow: hidden;white-space: nowrap !important;text-overflow: ellipsis;'
				>
			</el-table-column>
			<el-table-column
				prop="productPic"
				label="商品图片"
				align="center">
				<template slot-scope="scope">
					<img :src="scope.row.productPic" alt="" style="width: 60px;height:60px">
				</template>
			</el-table-column>

			<!--<el-table-column
				prop="goodsBrand"
				label="商品品牌"
				align="center">
			</el-table-column>-->
<!--			<el-table-column -->
<!--				prop="categoryId" -->
<!--				label="商品分类" -->
<!--				align="center">-->
<!--			</el-table-column>-->
			<el-table-column
				prop="price"
				label="价格"
				align="center">
				<template slot-scope="scope">
          {{scope.row.attributes[0].price}}
<!--					<template v-for='(item,index) in scope.row.attributes'>-->
<!--						<span>{{item.price}}</span>-->
<!--					<i v-show='!index==scope.row.attributes.length-1'>，</i>-->
<!--					</template>-->
				</template>
			</el-table-column>
			<el-table-column
				prop="productStock"
				label="总库存"
				align="center">
			</el-table-column>
			<el-table-column
				prop="saleNum"
				label="销量"
				align="center">
			</el-table-column>
			<el-table-column
				prop="status"
				label="状态"
				align="center">
				<template slot-scope="scope">

          <el-popover trigger="hover" placement="top" v-if="scope.row.remake">
            <p>不通过原因: {{ scope.row.remake }}</p>
            <div slot="reference" class="name-wrapper">
              {{status[scope.row.status]}}
            </div>
          </el-popover>
          {{status[scope.row.status]}}
				</template>
			</el-table-column>
			<el-table-column
				prop="createTime"
				label="发布时间"
				align="center">
				<template slot-scope="scope">
					{{scope.row.createTime|time}}
				</template>
			</el-table-column>

			<el-table-column
				prop="modifyTime"
				label="修改时间"
				align="center">
				<template slot-scope="scope">
					{{scope.row.modifyTime|time}}
				</template>
			</el-table-column>
			<el-table-column
				label="操作"
				align="center"
				fixed="right"
				width='140'>
				<template slot-scope="scope">
					<!--<el-button type="text" size="mini" @click='goDetail(scope.row)'>查看</el-button>-->
					<el-button type="text" size="mini" @click='goEdit(scope.row)'>编辑</el-button>
					<el-button v-if='scope.row.status==-1||scope.row.status==3' type="text" @click='upGoods(scope.row)' size="mini">上架</el-button>
					<el-button v-if='scope.row.status==1||scope.row.status==2' type="text" @click='downGoods(scope.row)' size="mini">下架</el-button>
					<el-button v-if='scope.row.status==1||scope.row.status==2' type="text" size="mini" @click='setting(scope.row)'>分成设置</el-button>
					<el-button type="text" style='color: red;' @click="del(scope.row,scope.$index)" size="mini">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<pagination
			:pageTotal="pageTotal"
			@handleCurrentChange="handleCurrentChange"
			@handleSizeChange="handleSizeChange">
		</pagination>
		<el-dialog title="温馨提示" :visible.sync="dialogVisible" width="30%">
			<span><i class="el-icon-question" style="color: #409EFF;"></i> {{tips}}</span>
			<span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click='confirms'>确 定</el-button>
  </span>
		</el-dialog>
		<el-dialog title='设置商品分成比例' :visible.sync="dialogShow" width="30%">
			<el-form :model="form" ref="ruleForm" :rules='rules' label-width="160px">
				<el-form-item label="设置分成比例：" prop="proportion">
					<el-col :span="12">
						<el-input v-model="form.percentage" autocomplete="off">
							<template slot="append">%</template>
						</el-input>
					</el-col>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
	      <el-button  @click="dialogShow = false" size='medium'>取 消</el-button>
	    	<el-button type="primary" @click="submit('ruleForm')" size='medium'>确 定</el-button>
	    </span>
		</el-dialog>
	</div>
</template>

<script>
	import Pagination from "@/components/pagination";
	import { setDivided, deleteGoods, upDownGoods } from'@/api/goods/list/goods'
	export default {
		components: {
			Pagination,
		},
		props: {
			tableData: Array,
			pageTotal: Number,
		},
		data() {
			return {
				tips: '',
				type:null,
				dialogVisible: false,
				dialogShow: false,
				selectWay: [],
				selectOut: [],
				selectDel: [],
				form: {
					id:'',
					percentage: ''
				},
				rules: {
					percentage: [{
						required: true,
						message: '分成比例不能为空',
						trigger: 'blur'
					}, {
						pattern: /^[1-9]\d*$/,
						message: '只能输大于0的数字'
					}]
				},
        auth:{
				  add: true
        },
				status: {
					'1': '售卖中',
					'-1': '已下架',
					'0': '待审核',
					'3': '审核失败'
				}
			}
		},
    mounted() {
      console.log(this.$permission('/supply/web/product/findPage'));
    },
    methods: {
      // 验证权限
      _validationAuth() {
        this.auth.add = this.$permission('/goods/setting/category/add')
        this.auth.set = this.$permission('/goods/setting/category/set')
        this.auth.del = this.$permission('/goods/setting/category/del')
        this.auth.enable = this.$permission('/goods/setting/category/enable')
        this.auth.disable = this.$permission('/goods/setting/category/disable')
        this.auth.move = this.$permission('/goods/setting/category/move')
      },
			// 上下分页
			handleCurrentChange(val) {
				this.$emit('currentChange', val)
			},
			// 每页显示多少条
			handleSizeChange(val) {
				this.$emit('sizeChange', val)
			},
			handleSelectionChange(val) {
				if(val) {
					this.selectWay = [];
					this.selectOut = [];
					this.selectDel = [];
					for(let item of val) {
						this.selectWay.push(item.id);
						this.selectOut.push(item.id);
						this.selectDel.push(item.id);
					}
				}
			},
			goDetail(row) {
				this.$router.push({
					path: '/zis/goods/detail'
				})
			},
			setArr(array) {
				return Array.from(new Set(array));
			},
			putWay() {
				if(this.selectWay.length !== 0) {
					let arr = this.setArr(this.selectWay);
					this.dialogVisible = true;
					this.tips = '是否批量上架商品？'
					this.type = '1'
				} else {
					this.$message.error('请选择至少一件商品');
				}
			},
			soldOut() {
				if(this.selectOut.length !== 0) {
					let arr = this.setArr(this.selectOut);
					this.dialogVisible = true;
					this.tips = '是否批量下架商品？'
					this.type = '2'
				} else {
					this.$message.error('请选择至少一件商品');
				}
			},
			confirms(){
				if(this.type=='1'){
					upDownGoods({param:this.selectWay.join(','),status:1})
					.then( res =>{
						console.log(res)
						this.$message({
						type: 'success',
						message: '操作成功!'
					});
					this.dialogVisible = false
					this.$emit('updateData')
					})
				}else if(this.type=='2'){
					upDownGoods({param:this.selectOut.join(','),status:-1})
					.then( res =>{
						console.log(res)
						this.$message({
						type: 'success',
						message: '操作成功!'
					});
					this.dialogVisible = false
					this.$emit('updateData')
					})

				}else if(this.type=='3'){
					deleteGoods({param:this.selectDel.join(',')})
					.then( res =>{
						console.log(res)
						if(res){
							this.$message({
						type: 'success',
						message: '删除成功!'
					});
					this.dialogVisible = false
					this.$emit('updateData')
						}
					})
				}
			},
			dels() {
				if(this.selectDel.length !== 0) {
					let arr = this.setArr(this.selectDel);
					this.dialogVisible = true;
					this.tips = '是否批量删除商品？'
					this.type = '3'
				} else {
					this.$message.error('请选择至少一件商品');
				}
			},
			upGoods(row) {
				this.$confirm('你确定要上架此商品吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {

					upDownGoods({param:row.id,status:1})
					.then( res =>{
						console.log(res)
						this.$message({
						type: 'success',
						message: '上架成功!'
					});
					this.$emit('updateData')
					})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消上架'
					});
				});
			},
			goEdit(row){
				this.$router.push({
					path: '/zis/goods/edit',
					query:{
						id:row.id
					}
				})
			},
			downGoods(row) {
				this.$confirm('你确定要下架此商品吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					upDownGoods({param:row.id,status:-1})
					.then( res =>{
						console.log(res)
						this.$message({
						type: 'success',
						message: '下架成功!'
					});
					this.$emit('updateData')
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消下架'
					});
				});
			},
			del(row, index) {
				this.$confirm('你确定要删除此商品吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {

					deleteGoods({param:row.id})
					.then( res =>{
							this.$message({
						type: 'success',
						message: '删除成功!'
					});
					this.$emit('updateData')

					})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			goAdd() {
				this.$router.push({
					path: '/zis/goods/add'
				})
			},
			setting(row) {
				this.dialogShow = true
				this.form.id = row.id
			},
			submit(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						setDivided({id:this.form.id,percentage:this.form.percentage})
				.then( res =>{
					if(res.status =='1'){
						this.$message({
							type:'success',
							message:'分成设置成功'
						})
						setTimeout(()=>{
							this.dialogShow = false
						},1500)
						this.$emit('updateData')
					}
				})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.btn {
		margin: 20px 0;
	}
</style>
<style>
	.el-table_1_column_2 .cell {
		white-space: nowrap !important;
	}
</style>
