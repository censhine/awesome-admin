<template>
	<d2-container>
		<div class="zis-table-view">
			<div class="title clearfix">
				<span>退货商品</span>
				<span class="right back" @click="$router.go(-1)">返回</span>
			</div>
			<el-table border :data="tableData" style="width: 100%">
				<el-table-column prop="goodsImg" label="商品图片" align="center">
					<template slot-scope="scope">
						<img src="../../../../../public/image/goods/phone.jpg" alt="" style="width: 60px;height:60px">
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
			<div class="title mt">服务单信息</div>
			<div class="main">
				<div class="order-form">
					<div class="oder_item">
						<span class="key">服务单号</span>
						<span class="val">31358454545</span>
					</div>
					<div class="oder_item">
						<span class="key">申请状态</span>
						<span class="val">31358454545</span>
					</div>
					<div class="oder_item">
						<span class="key">订单编号</span>
						<span class="val">201707196398345</span>
						<span class="look">查看</span>
					</div>
					<div class="oder_item">
						<span class="key">申请时间</span>
						<span class="val">2017-07-19 14:48:38</span>
					</div>
					<div class="oder_item">
						<span class="key">用户账号</span>
						<span class="val">18000000000</span>
					</div>
					<div class="oder_item">
						<span class="key">联系人</span>
						<span class="val">大梨</span>
					</div>
					<div class="oder_item">
						<span class="key">联系电话</span>
						<span class="val">18000000000</span>
					</div>
					<div class="oder_item">
						<span class="key">退货原因</span>
						<span class="val">质量问题</span>
					</div>
					<div class="oder_item">
						<span class="key">问题描述</span>
						<span class="val">描述文字</span>
					</div>
					<div class="oder_item">
						<span class="key">凭证照片</span>
						<span class="val">31358454545</span>
					</div>
				</div>
				<div class="order-form" v-if="status==1">
					<el-form :model="form2" label-width="160px">
						<el-form-item label="订单金额" prop='name'>
							<el-col :span="13">
								¥{{form2.orderMoney}}
							</el-col>
						</el-form-item>
						<el-form-item label="退运费">
							<el-col :span='5'>
								<el-radio-group v-model="form2.returnFreight">
									<el-radio label="不退运费"></el-radio>
									<el-radio label="退运费"></el-radio>
								</el-radio-group>
							</el-col>
						</el-form-item>
						<el-form-item label="确认退款金额">
							<el-col :span="3">
								<el-input v-model="form2.confirmMoney" autocomplete="off"></el-input>
							</el-col>
						</el-form-item>
						<el-form-item label="收货人姓名">
							<el-col :span="6">
								<el-input v-model="form2.consigneeName" autocomplete="off"></el-input>
							</el-col>
						</el-form-item>
						<el-form-item label="所在区域">
							<el-col :span='6'>
								<Address :propsOptions='addressObj' v-model="form2.address" @getAddress='_getAddress'></Address>
							</el-col>
						</el-form-item>
						<el-form-item label="详细地址">
							<el-col :span="6">
								<el-input v-model="form2.addressInfo" autocomplete="off"></el-input>
							</el-col>
						</el-form-item>
						<el-form-item label="联系电话">
							<el-col :span="6">
								<el-input v-model="form2.phone" autocomplete="off"></el-input>
							</el-col>
						</el-form-item>
						<el-form-item label="处理备注">
							<el-col :span="6">
								<el-input v-model="form2.note" autocomplete="off"></el-input>
							</el-col>
						</el-form-item>
						<div class="footer">
							<el-button type='primary' @click='submit'>确认退货</el-button>
							<el-button type='danger'>拒绝退货</el-button>
						</div>
					</el-form>
				</div>
				<div class="order-form" v-if="status==2">
					<div class="oder_item">
						<span class="key">订单金额</span>
						<span class="val">¥6000</span>
					</div>
					<div class="oder_item">
						<span class="key">退运费</span>
						<span class="val">退运费</span>
					</div>
					<div class="oder_item">
						<span class="key">申请退款金额</span>
						<span class="val">¥6000</span>
					</div>
					<div class="oder_item">
						<span class="key">收货人姓名</span>
						<span class="val">张三疯</span>
					</div>
					<div class="oder_item">
						<span class="key">收货地址</span>
						<span class="val">广东省深圳市龙华区振华时代广场</span>
					</div>
					<div class="oder_item">
						<span class="key">联系电话</span>
						<span class="val">13598764567</span>
					</div>
					<div class="oder_item">
						<span class="key">处理人员</span>
						<span class="val">admin</span>
					</div>
					<div class="oder_item">
						<span class="key">处理时间</span>
						<span class="val">2020-07-19 14:48:38</span>
					</div>
					<div class="oder_item">
						<span class="key">处理备注</span>
						<span class="val">同意退货</span>
					</div>
					<div class="oder_item clearfix">
						<span class="key left">收货备注</span>
						<span class="val">
						<el-col :span='6'><el-input></el-input></el-col>
					</span>
					</div>
					<div class="footer">
						<el-button type='primary'>确认收货</el-button>
					</div>
				</div>
				<div class="order-form" v-if="status==3">
					<div class="oder_item">
						<span class="key">收货人员</span>
						<span class="val">admin</span>
					</div>
					<div class="oder_item">
						<span class="key">收货时间</span>
						<span class="val">2020-07-19 14:48:38</span>
					</div>
					<div class="oder_item">
						<span class="key">处理备注</span>
						<span class="val">同意退货</span>
					</div>
					<div class="oder_item">
						<span class="key">收货备注</span>
						<span class="val">
						确认收货
					</span>
					</div>
				</div>
				<div class="order-form" v-if="status==4">
					<div class="oder_item">
						<span class="key">处理人员</span>
						<span class="val">admin</span>
					</div>
					<div class="oder_item">
						<span class="key">处理时间</span>
						<span class="val">2020-07-19 14:48:38</span>
					</div>
					<div class="oder_item">
						<span class="key">操作备注</span>
						<span class="val">质量没问题，拒绝退货</span>
					</div>
				</div>
			</div>

		</div>
	</d2-container>
</template>

<script>
	import Address from '@/components/zis-address';
	export default {
		components: {
			Address
		},
		data() {
			return {
				status:'1',
				addressObj: {
					checkStrictly: true
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
						total: 6000
					},
					{
						goodsImg: '王小虎',
						goodsName: 'iphone 6',
						goodsBrand: '苹果',
						goodsPrice: 6000,
						goodsArtNo: 1000,
						goodsSize: 'X',
						goodsColor: '白色',
						goodsCount: 1,
						total: 6000
					},
					{
						goodsImg: '王小虎',
						goodsName: 'iphone 6',
						goodsBrand: '苹果',
						goodsPrice: 6000,
						goodsArtNo: 1000,
						goodsSize: 'X',
						goodsColor: '白色',
						goodsCount: 1,
						total: 6000
					}
				],
				totalPrice: 18000,
				form2: {
					orderMoney: 200,
					returnFreight: '退运费',
					confirmMoney: 200,
					consigneeName: '张三疯',
					address: [],
					addressInfo: '天龙大道25号',
					phone: '13545679874',
					note: '同意退货'
				}
			}
		},
		methods: {
			_getAddress(val) {
				this.form2.address = val;
			},
			submit() {
				console.log(this.form2);
			}
		}
	}
</script>
<style scoped lang="scss">
	.order-form {
		margin-top: 20px;
		border: 1px solid #e4e4e4;
	}

	.oder_item {
		border-bottom: 1px solid #e4e4e4;
		&:last-child {
			border-bottom: none;
		}
		.key {
			border-right: 1px solid #e4e4e4;
			display: inline-block;
			width: 160px;
			height: 50px;
			line-height: 50px;
			text-align: right;
			background: #F9FAFC;
			padding-right: 10px;
		}
		.val {
			padding-left: 10px;
		}
		.look {
			padding-left: 20px;
			color: #409EFF;
			&:hover {
				cursor: pointer;
			}
		}
	}

	.footer {
		width: 800px;
		margin: 30px auto;
		text-align: center;
	}
</style>
<style lang="scss">
  .right{
    float: right;
  }
	.zis-table-view {
		.title {
			height: 40px;
			line-height: 40px;
			background: #f3f3f3;
			padding: 0 20px;
			.back {
				&:hover {
					cursor: pointer;
				}
			}
		}
		.mt {
			margin: 20px 0;
		}
		.el-table__header-wrapper {
			table {
				th {
					text-align: center;
					background: #F9FAFC;
				}
			}
		}
		.price {
			height: 50px;
			line-height: 50px;
			background: #F9FAFC;
			padding-right: 20px;
			font-size: 16px;
			.red {
				color: #F04844;
				font-weight: bold;
			}
		}
		.main {
			padding-bottom: 30px;
			.el-form-item__label {
				background: #F9FAFC;
				height: 50px;
				line-height: 50px;
				border-right: 1px solid #e4e4e4;
			}
			.el-form-item {
				margin-bottom: 0;
				border-bottom: 1px solid #e4e4e4;
			}
			.el-col {
				padding-left: 10px;
			}
			.el-input {
				margin-top: 5px;
			}
		}
	}
</style>
