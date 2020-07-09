<template>
	<div class="wrap">
		<div class="btn">
			<!--<el-button type="default" @click="exportExcel" size='mini'>
				<aw-icon name="download" /> 导出数据
			</el-button>-->
			<el-button type="default" @click="closeAll" size='mini'>
				批量关闭
			</el-button>
			<el-button type="default" @click="dels" size='mini'>
				批量删除
			</el-button>
		</div>
		<el-table :data="tableData" border @selection-change="handleSelectionChange" style="width: 100%">
			<el-table-column
				type="selection"
				width="55"
				align="center">
			</el-table-column>
			<el-table-column
				prop="orderNum"
				label="订单编号"
				align="center">
			</el-table-column>
			<el-table-column
				prop="createTime"
				label="提交时间"
				align="center">
			</el-table-column>
			<el-table-column
				prop="contractNum"
				label="合同编号"
				align="center">
			</el-table-column>
			<el-table-column
				prop="userAccount"
				label="用户账号"
				align="center">
			</el-table-column>
			<el-table-column
				prop="consignee"
				label="收货人"
				align="center">
			</el-table-column>
			<el-table-column
				prop="orderAmount"
				label="订单金额"
				align="center">
			</el-table-column>
			<el-table-column
				prop="payMethods"
				label="支付方式"
				align="center">
				<template slot-scope='scope'>
					{{payMethods[scope.row.payMethods]}}
				</template>
			</el-table-column>
			<el-table-column prop="orderSource" label="订单来源" align="center">
			</el-table-column>
			<el-table-column prop="orderStatus" label="订单状态" align="center">
				<template slot-scope='scope'>
					{{orderStatus[scope.row.orderStatus]}}
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center" fixed="right">
				<template slot-scope="scope">
					<el-button type="text" @click="goDetail(scope.row)" size="mini">查看</el-button>
					<el-button v-if='scope.row.orderStatus == 0' type="text" @click="close(scope.row)" size="mini">关闭</el-button>
					<el-button v-if='scope.row.orderStatus == 1' type="text" @click="sendGoods(scope.row)" size="mini">发货</el-button>
					<el-button v-if='scope.row.orderStatus == 2||scope.row.orderStatus == 3' type="text" @click="goLogistics(scope.row)" size="mini">订单跟踪</el-button>
					<el-button v-if='scope.row.orderStatus == 1' type="text" @click="cancelOrder(scope.row)" size="mini">取消</el-button>
					<el-button v-if='scope.row.orderStatus == 4' type="text" style='color: red;' @click="del(scope.row,scope.$index)" size="mini">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<pagination
			:pageTotal="pageTotal"
			@handleCurrentChange="handleCurrentChange"
			@handleSizeChange="handleSizeChange">
		</pagination>
		<el-dialog title='发货' :visible.sync="dialogShow" width="40%">
			<el-form :model="form2" :rules="rules" ref="ruleForm" label-width="100px">
				<div class="info">
					<el-row>
						<el-col :span='8'>
							<span>订单编号：{{form2.orderCode}}</span>
						</el-col>
						<el-col :span='8'>
							<span>手机号码：{{form2.phone}}</span>
						</el-col>
						<el-col :span='8'>
							<span>收货人：{{form2.contact}}</span>
						</el-col>
					</el-row>
					<el-row style='margin-top: 16px;'>
						<el-col :span='16'>
							<span>收货地址：{{form2.address}}</span>
						</el-col>
						<el-col :span='8'>
							<span>邮政编码：{{form2.postCode}}</span>
						</el-col>
					</el-row>
				</div>
				<el-form-item label="物流公司：" prop='expressCode'>
					<el-select v-model="form2.expressCode" placeholder="请选择物流公司" style="width:260px;">
						<el-option
							v-for='(item,index) in express'
							:key='index'
							:label="item.name"
							:value="item.code" />
					</el-select>
				</el-form-item>
				<el-form-item label="物流单号：" prop="logisticsCode">
					<el-col :span="10">
						<el-input v-model="form2.logisticsCode" autocomplete="off"></el-input>
					</el-col>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
	      <el-button  @click="dialogShow = false" size='medium'>取 消</el-button>
	    	<el-button type="primary" @click="submit('ruleForm')" size='medium'>确 定</el-button>
	    </span>
		</el-dialog>
		<el-dialog title="温馨提示" :visible.sync="dialogVisible" width="30%">
			<span><i class="el-icon-question" style="color: #409EFF;"></i> {{tips}}</span>
			<span slot="footer" class="dialog-footer">
    <el-button  @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
		</el-dialog>
	</div>
</template>

<script>
	import Pagination from "@/components/pagination";
	import Vue from 'vue'
	import pluginExport from '@d2-projects/vue-table-export'
	Vue.use(pluginExport)
	export default {
		components: {
			Pagination,

		},
		props: {
			tableData: Array,
			pageTotal: Number
		},
		data() {
			return {
				form2: {
					orderCode: '',
					phone: '',
					contact: '',
					address: '',
					postCode: '',
					expressCode: '',
					logisticsCode: ''
				},
				dialogShow: false,
				dialogVisible: false,
				tips: '',
				express: [{
						name: '顺丰速运',
						code: 'SF'
					},
					{
						name: '申通快递',
						code: 'ST'
					},
					{
						name: '中通快递',
						code: 'ZT'
					}
				],
				columns: [{
						label: '订单编号',
						prop: 'orderNum',
						align: 'center'
					},
					{
						label: '提交时间',
						prop: 'createTime',
						align: 'center'
					},
					{
						label: '合同编号',
						prop: 'contractNum',
						align: 'center'
					},
					{
						label: '用户账号',
						prop: 'userAccount',
						align: 'center'
					},
					{
						label: '收货人',
						prop: 'consignee',
						align: 'center'
					},
					{
						label: '订单金额',
						prop: 'orderAmount',
						align: 'center'
					},
					{
						label: '支付方式',
						prop: 'payMethods',
						align: 'center'
					},
					{
						label: '订单来源',
						prop: 'orderSource',
						align: 'center'
					},
					{
						label: '订单状态',
						prop: 'orderStatus',
						align: 'center'
					}
				],
				rules: {
					expressCode: [{
						required: true,
						message: '请输入运费模板名称',
						trigger: 'change'
					}],
					logisticsCode: [{
						required: true,
						message: '请输入物流单号',
						trigger: 'blur'
					}]
				},
				selectArr: [],
				selectDel: [],
				orderStatus: {
					'0': '待付款',
					'1': '待发货',
					'2': '已发货',
					'3': '已完成',
					'4': '已关闭'
				},
				payMethods: {
					'0': '支付宝',
					'1': '微信',
					'2': '银联卡',
					'3': '知豆余额'
				},
			}
		},
		methods: {
			handleSelectionChange(val) {
				if(val) {
					this.selectArr = [];
					this.selectDel = [];
					for(let item of val) {
						this.selectArr.push(item.orderNum);
						this.selectDel.push(item.orderNum);
					}
				}
			},
			setArr(array) {
				return Array.from(new Set(array));
			},
			closeAll() {
				if(this.selectArr.length !== 0) {
					let arr = this.setArr(this.selectArr);
					this.dialogVisible = true;
					this.tips = '确定要批量关闭订单吗？'
				} else {
					this.$message.error('请选择至少一条订单');
				}
			},
			dels() {
				if(this.selectDel.length !== 0) {
					let arr = this.setArr(this.selectDel);
					this.dialogVisible = true;
					this.tips = '确定要批量删除订单吗？'
				} else {
					this.$message.error('请选择至少一条订单');
				}
			},
			cancelOrder(row) {
				this.$router.push({
					path: '/zis/order-public/cancel'
				})
			},
			close() {
				this.$confirm('你确定要关闭订单吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '操作成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			del(row, index) {
				this.$confirm('你确定要删除订单吗?', '提示', {
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
						message: '已取消'
					});
				});
			},
			goLogistics(row) {
				this.$router.push({
					path: '/zis/order-public/logistics'
				})
			},
			sendGoods(row) {
				console.log(row);
				this.form2.orderCode = row.orderNum;
				this.form2.phone = row.userAccount;
				this.form2.contact = row.consignee;
				this.dialogShow = true;
			},
			goDetail(row) {
				this.$router.push({
					path: '/zis/order-public/detail'
				})
			},
			submit(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			// 上下分页
			handleCurrentChange(val) {
				this.$emit('currentChange', val)
			},
			// 每页显示多少条
			handleSizeChange(val) {
				this.$emit('sizeChange', val)
			},
			exportExcel() {
				this.$export.excel({
						columns: this.columns,
						data: this.tableData,
						header: '导出订单列表',
						merges: ['A1', 'E1']
					})
					.then(() => {
						this.$message('导出表格成功')
					})
			}
		}
	}
</script>

<style scoped lang="scss">
	.btn {
		margin: 20px 0;
	}

	.info {
		padding: 0 19px;
		margin-bottom: 20px;
	}
</style>
