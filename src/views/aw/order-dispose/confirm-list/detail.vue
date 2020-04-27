<template>
	<d2-container>
		<div class="wrap">
			 <div class="header clearfix">
				<span class="status left">当前订单状态：{{orderStatus[order.orderStatus]}}</span>
				<el-button class='right' style='margin-top: 12px;margin-right: 20px;' type='success' size='medium'><d2-icon name="refresh"/>刷新</el-button>
				<el-button class='right' style='margin-top: 12px;margin-right: 20px;' @click="handleCloseTab" type='primary' size='medium'>关闭页面</el-button>
				<el-button v-if='order.orderStatus==0' class='right' style='margin-top: 12px;margin-right: 20px;' @click='closeOrder' type='primary' size='medium'>关闭订单</el-button>
				<el-button v-if='order.orderStatus==1' class='right' style='margin-top: 12px;margin-right: 20px;' @click='cancelOrder' type='primary' size='medium'>取消订单</el-button>
				<el-button v-if='order.orderStatus==2||order.orderStatus==3' class='right' style='margin-top: 12px;margin-right: 20px;' @click='goLogistics' type='primary' size='medium'>订单跟踪</el-button>
				<el-button v-if='order.orderStatus==4' class='right' style='margin-top: 12px;margin-right: 20px;' @click='del' type='danger' size='medium'>删除订单</el-button>
			</div>
			<div class="main">
				<h2>订单基本信息</h2>
				<el-row>
					<el-col :span='8'>
						<el-row>
							<el-col :span='8' style='text-align: right;'>订单编号：</el-col>
							<el-col :span='12'>{{order.orderNum}}</el-col>
						</el-row>
						<el-row>
							<el-col :span='8' style='text-align: right;'>用户账号：</el-col>
							<el-col :span='12'>{{order.userAccount}}</el-col>
						</el-row>
						<el-row>
							<el-col :span='8' style='text-align: right;'>支付方式：</el-col>
							<el-col :span='12'>{{payMethods[order.payMethods]}}</el-col>
						</el-row>
						<el-row>
							<el-col :span='8' style='text-align: right;'>订单来源：</el-col>
							<el-col :span='12'>{{order.orderSource}}</el-col>
						</el-row>
						<el-row>
							<el-col :span='8' style='text-align: right;'>订单类型：</el-col>
							<el-col :span='12'>{{orderType[order.orderType]}}</el-col>
						</el-row>
						<el-row>
							<el-col :span='8' style='text-align: right;'>配送方式：</el-col>
							<el-col :span='12'>{{order.distribution}}</el-col>
						</el-row>
						<el-row>
							<el-col :span='8' style='text-align: right;'>物流单号：</el-col>
							<el-col :span='12'>{{order.expressNum}}</el-col>
						</el-row>
					</el-col>
					<el-col :span='8'>
						<el-row>
							<el-col :span='8' >发货单流水号：</el-col>
							<el-col :span='12'>{{order.sendNum}}</el-col>
						</el-row>
						<el-row>
							<el-col :span='8'>自动确认收货时间：</el-col>
							<el-col :span='12'>{{order.confirmTime}}</el-col>
						</el-row>
						<el-row>
							<el-col :span='8'>合同编号：</el-col>
							<el-col :span='12'>{{order.contractNum}}</el-col>
						</el-row>
						<el-row>
							<el-col :span='8'>合同类型：</el-col>
							<el-col :span='12'>{{contractType[order.contractType]}}</el-col>
						</el-row>
						<el-row>
							<el-col :span='8'>商家：</el-col>
							<el-col :span='12'>{{order.agent}}</el-col>
						</el-row>
						<el-row>
							<el-col :span='8'>供应商：</el-col>
							<el-col :span='12'>{{order.sup}}</el-col>
						</el-row>
						<el-row>
							<el-col :span='8'>律师：</el-col>
							<el-col :span='12'>{{order.legal}}</el-col>
						</el-row>
					</el-col>
					<el-col :span='8'>
						<el-row>
							<el-col :span='6'>收货人：</el-col>
							<el-col :span='12'>{{order.contact}}</el-col>
						</el-row>
						<el-row>
							<el-col :span='6'>手机号码：</el-col>
							<el-col :span='12'>{{order.linkPhone}}</el-col>
						</el-row>
						<el-row>
							<el-col :span='6'>邮政编码：</el-col>
							<el-col :span='12'>{{order.postCode}}</el-col>
						</el-row>
						<el-row>
							<el-col :span='6'>收货地址：</el-col>
							<el-col :span='12'>{{order.address}}</el-col>
						</el-row>
						<el-row>
							<el-col :span='6'>商品合计：</el-col>
							<el-col :span='12'>{{order.total}}</el-col>
						</el-row>
						<el-row>
							<el-col :span='6'>运费：</el-col>
							<el-col :span='12'>{{order.freight}}</el-col>
						</el-row>
						<el-row>
							<el-col :span='6'>订单总金额：</el-col>
							<el-col :span='12'>{{order.orderTotal}}</el-col>
						</el-row>
						<el-row>
							<el-col :span='6'>应付款金额：</el-col>
							<el-col :span='12'>{{order.payment}} <span class="edit" @click="edit"> 修改费用</span></el-col>
						</el-row>
					</el-col>
				</el-row>
				<h2>商品信息</h2>
				<el-table border :data="tableData" style="width: 100%">
				<el-table-column prop="goodsImg" label="商品图片" align="center">
					<template slot-scope="scope">
						<img src="https://img10.360buyimg.com/mobilecms/s250x250_jfs/t1/118089/4/1918/61159/5e9d4c3fE842885fe/8c8906debe7bbc4e.jpg" alt="" style="width: 60px;height:60px">
					</template>
				</el-table-column>
				<el-table-column prop="goodsName" label="商品名称">
					<template slot-scope="scope">
						<p>{{scope.row.goodsName}}</p>
						<p>品牌:{{scope.row.goodsBrand}}</p>
					</template>
				</el-table-column>
				<el-table-column prop="goodsPrice" label="价格/货号">
					<template slot-scope="scope">
						<p>价格:¥{{scope.row.goodsPrice}}</p>
						<p>货号:No{{scope.row.goodsArtNo}}</p>
					</template>
				</el-table-column>
				<el-table-column prop="goodsSize" label="属性" align='center'>
					<template slot-scope="scope">
						<p>尺寸:{{scope.row.goodsSize}}颜色:{{scope.row.goodsColor}}</p>
					</template>
				</el-table-column>
				<el-table-column prop="goodsCount" label="数量" align='center'>
				</el-table-column>
				<el-table-column prop="inventory" label="库存" align='center'>
				</el-table-column>
				<el-table-column prop="total" label="小计" align='center'>
					<template slot-scope="scope">
						<p>¥{{scope.row.total}}</p>
					</template>
				</el-table-column>
			</el-table>
			<div class="price clearfix">
				<p class="right">
					<span>合计：</span><span class="red">¥{{totalPrice}}</span>
				</p>
			</div>
			<div class="admin" v-if="order.orderStatus!=0">
				<h2>操作信息</h2>
			<el-table border :data="tableData2" style="width: 100%">
				<el-table-column prop="operator" label="操作者"></el-table-column>
				<el-table-column prop="createTime" label="操作时间"></el-table-column>
				<el-table-column prop="orderStatus" label="订单状态">
					<template slot-scope="scope">
						<p>{{orderStatus[scope.row.orderStatus]}}</p>
					</template>
				</el-table-column>
				<el-table-column prop="payStatus" label="付款状态" align='center'>
					<template slot-scope="scope">
						<p>{{payStatus[scope.row.payStatus]}}</p>
					</template>
				</el-table-column>
				<el-table-column prop="sendStatus" label="发货状态" align='center'>
					<template slot-scope="scope">
						<p>{{sendStatus[scope.row.sendStatus]}}</p>
					</template>
				</el-table-column>
				<el-table-column prop="note" label="备注" align='center'></el-table-column>

			</el-table>
			</div>

			</div>
		</div>
		<el-dialog
    	title='修改费用'
    	:visible.sync="dialogShow"
      width="30%"
    	>
    	 <el-form :model="form" ref="ruleForm" :rules='rules' label-width="160px">
        <el-form-item label="订单应付金额："  prop="payment">
        	<el-col :span="10">
          	<el-input v-model="form.payment" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
	      <el-button  @click="dialogShow = false" size='medium'>取 消</el-button>
	    	<el-button type="primary" @click="submit('ruleForm')" size='medium'>确 定</el-button>
	    </span>
    </el-dialog>

	</d2-container>
</template>

<script>
	import { mapState, mapActions} from 'vuex'
	export default{
		data(){
			return{
				order:{
					orderStatus:1,
					orderNum:'1312312313',
					userAccount:'13689745632',
					payMethods:0,
					orderSource:'APP订单',
					orderType:1,
					distribution:'申通快递',
					expressNum:'SF1255658523',
					sendNum:'12659854554',
					confirmTime:'15天',
					contractNum:'202014145448',
					contractType:0,
					agent:'李四癫杂技铺',
					sup:'张三疯供应管理公司',
					legal:'陈律师',
					contact:'王老五',
					linkPhone:'13557855545',
					postCode:'510210',
					address:'深圳龙华振华时代',
					total:8000,
					freight:12,
					orderTotal:8012,
					payment:8012
				},
				tableData: [{
						goodsImg: '王小虎',
						goodsName: 'iphone 6',
						goodsBrand: '苹果',
						goodsPrice: 6000,
						goodsArtNo: 1000,
						goodsSize: 'X',
						goodsColor: '白色',
						goodsCount: 1,
						inventory:100,
						total: 6000
					},
					{
						goodsImg: '王小虎',
						goodsName: 'iphone 6',
						goodsBrand: '苹果',
						goodsPrice: 6000,
						goodsArtNo: 1000,
						goodsSize: 'X',
						goodsColor: '金色',
						goodsCount: 1,
						inventory:60,
						total: 6000
					},
					{
						goodsImg: '王小虎',
						goodsName: 'iphone 6',
						goodsBrand: '苹果',
						goodsPrice: 6000,
						goodsArtNo: 1000,
						goodsSize: 'X',
						goodsColor: '黑色',
						goodsCount: 1,
						inventory:300,
						total: 6000
					}
				],
				totalPrice: 18000,
				tableData2: [{
						operator: '王小虎',
						createTime: '2020-04-14 11:50:00',
						orderStatus: 0,
						payStatus: 1,
						sendStatus: 0,
						note: '完成商品评价'
				}],
				orderStatus:{'0':'待付款','1':'待发货','2':'已发货','3':'已完成','4':'已关闭'},
				payStatus:{'0':'未支付','1':'已支付','2':'已退款'},
				sendStatus:{'0':'未发货','1':'已发货'},
				payMethods:{'0':'支付宝','1':'微信','2':'银联卡','3':'知豆余额'},
				orderType:{'0':'商家进货订单','1':'商家店铺订单'},
				contractType:{'0':'购销合同','1':'代理合同'},
				dialogShow:false,
				form:{
					payment:''
				},
				rules:{
					payment:[{
						required: true,
						message: '金额不能为空',
						trigger: 'blur'
					},{
						pattern:/^[1-9]\d*$/,
						message:'只能输大于0的数字'
					}]
				}
			}
		},
		computed:{
			...mapState('d2admin/page', [
			  'opened',
			  'current' //用户获取当前页面的地址，用于关闭
			])
			},
			methods: {
				...mapActions('d2admin/page', [
					'close',
				]),
				handleCloseTab() {
					this.close({
						tagName: this.current
					});
					this.$router.go(-1)
				},
				edit() {
					this.dialogShow = true;
					this.form.payment = this.order.payment;
				},
				submit(formName) {
					this.$refs[formName].validate((valid) => {
						if(valid) {
							//          alert('submit!');
							this.order.payment = this.form.payment;
							this.dialogShow = false;
						} else {
							console.log('error submit!!');
							return false;
						}
					});
				},
				closeOrder() {
					this.$confirm('你确定要关闭此订单吗?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$message({
							type: 'success',
							message: '关闭成功!'
						});
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消关闭'
						});
					});
				},
				cancelOrder() {
					this.$confirm('你确定要取消此订单吗?', '提示', {
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
							message: '取消操作'
						});
					});
				},
				goLogistics() {
					this.$router.push({
						path: '/zis/order-list/logistics'
					})
				},
				del() {
					this.$confirm('你确定要删除此订单吗?', '提示', {
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
				}
			}
		}
</script>

<style scoped lang="scss">
.wrap{
	width: 1200px;
	.header{
		background: #f3f3f3;
		height: 60px;
		line-height: 60px;
		.status{
			color: #F04844;
			padding-left: 20px;
		}
	}
	.main{
		h2{
			margin: 20px 0 30px;
		}
		.el-col{
			margin: 5px 0;
		}
		.price {
			height: 50px;
			line-height: 50px;
			background: #F9FAFC;
			padding-right: 20px;
			font-size: 16px;
			border: 1px solid #EBEEF5;
			border-top: none;
			.red {
				color: #F04844;
				font-weight: bold;
			}
		}
		.edit{
			color: #409EFF;
			padding-left: 16px;
			&:hover{
				cursor: pointer;
			}
		}
	}

}

</style>
