<template>
	<aw-container>
		<div class="zis-table-view">
			<div class="title clearfix">
				<span>退货商品</span>
				<span class="right back" @click="$router.go(-1)"><i class="el-icon-arrow-left"></i>返回</span>
			</div>
			<el-table border :data="tableData" style="width: 100%;display: none;">
				<el-table-column prop="goodsImg" label="商品图片" align="center">
					<template slot-scope="scope">
						<img src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1906469856,4113625838&fm=26&gp=0.jpg" alt="" style="width: 60px;height:60px">
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
			<div class="price clearfix" style="display: none">
				<p class="right">
					<span>合计：</span><span class="red">¥{{totalPrice}}</span>
				</p>
			</div>
			<div class="title mt">服务单信息</div>
			<div class="main">
				<div class="order-form">
					<div class="oder_item">
						<span class="key">服务单号</span>
						<span class="val">{{order.orderId}}</span>
					</div>
					<div class="oder_item">
						<span class="key">申请状态</span>
						<span class="val">{{applyStatus[order.status]}}</span>
					</div>
					<div class="oder_item">
						<span class="key">订单编号</span>
						<span class="val">{{order.orderId}}</span>
						<span class="look" @click="goDetail">查看</span>
					</div>
					<div class="oder_item">
						<span class="key">申请时间</span>
						<span class="val">{{order.createTime|time}}</span>
					</div>
					<div class="oder_item">
						<span class="key">用户账号</span>
						<span class="val">{{order.userId}}</span>
					</div>
					<div class="oder_item">
						<span class="key">联系人</span>
						<span class="val">{{order.contacts}}</span>
					</div>
					<div class="oder_item">
						<span class="key">联系电话</span>
						<span class="val">{{order.phone}}</span>
					</div>
					<div class="oder_item">
						<span class="key">退货原因</span>
						<span class="val">{{order.remake}}</span>
					</div>
					<div class="oder_item">
						<span class="key">问题描述</span>
						<span class="val">{{order.remake}}</span>
					</div>
					<div class="oder_item clearfix">
						<span class="key photo left">凭证照片</span>
						<div class="img_box left">
							<img class="img" v-if="order.imgs" v-for="item in order.imgs"  :src="item" alt="" />
						</div>
					</div>
				</div>
				<div class="order-form" v-if="order.status==0">
					<el-form :model="form2" label-width="160px">
						<el-form-item label="订单金额" prop='name'>
							<el-col :span="13" style='margin-top: 6px;'>
								¥{{order.orderPrice ? 0 : order.orderPrice }}
							</el-col>
						</el-form-item>
						<el-form-item label="退运费">
							<el-col :span='5'>
								<el-radio-group v-model="form2.returnsCostType">
									<el-radio :label=-1>不退运费</el-radio>
									<el-radio :label=1>退运费</el-radio>
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
								<el-input v-model="form2.userName" autocomplete="off"></el-input>
							</el-col>
						</el-form-item>
						<el-form-item label="所在区域">
							<el-col :span='6'>
								<Address :opProps="opProps" :showLevels=true  v-model="form2.address.split('-')" @getAddress='_getAddress'></Address>
							</el-col>
						</el-form-item>
						<el-form-item label="详细地址">
							<el-col :span="6">
								<el-input v-model="form2.detail" autocomplete="off"></el-input>
							</el-col>
						</el-form-item>
						<el-form-item label="联系电话">
							<el-col :span="6">
								<el-input v-model="form2.telephone" autocomplete="off"></el-input>
							</el-col>
						</el-form-item>
						<el-form-item label="处理备注">
							<el-col :span="6">
								<el-input v-model="form2.remake" autocomplete="off"></el-input>
							</el-col>
						</el-form-item>
						<div class="footer">
							<el-button type='primary' @click='submit'>确认退货</el-button>
							<el-button type='danger'>拒绝退货</el-button>
						</div>
					</el-form>
				</div>
				<div class="order-form" v-if="order.status==-1 || order.status == 1">
					<div class="oder_item">
						<span class="key">订单金额</span>
						<span class="val">{{order.orderAmount || 0}}</span>
					</div>
					<div class="oder_item">
						<span class="key">退运费</span>
						<span class="val">{{order.returnExpress || 0}}</span>
					</div>
					<div class="oder_item">
						<span class="key">申请退款金额</span>
						<span class="val">{{order.confirmAmount || 0}}</span>
					</div>
					<div class="oder_item">
						<span class="key">收货人姓名</span>
						<span class="val">{{form2.userName}}</span>
					</div>
					<div class="oder_item">
						<span class="key">收货地址</span>
						<span class="val">{{form2.address+form2.detail}}</span>
					</div>
					<div class="oder_item">
						<span class="key">联系电话</span>
						<span class="val">{{form2.telephone}}</span>
					</div>
				</div>
				<div class="order-form" v-if="order.status!=0">
					<div class="oder_item">
						<span class="key">处理人员</span>
						<span class="val">{{order.sysAdmin}}</span>
					</div>
					<div class="oder_item">
						<span class="key">处理时间</span>
						<span class="val">{{order.disposeTime}}</span>
					</div>
					<div class="oder_item">
						<span class="key">处理备注</span>
						<span class="val">{{order.note}}</span>
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
						<span class="key">处理人员</span>
						<span class="val">{{order.sysAdmin}}</span>
					</div>
					<div class="oder_item">
						<span class="key">处理时间</span>
						<span class="val">{{order.disposeTime}}</span>
					</div>
					<div class="oder_item">
						<span class="key">处理备注</span>
						<span class="val">{{order.note}}</span>
					</div>
				</div>
				<div class="order-form" v-if="status==3">
					<div class="oder_item">
						<span class="key">收货人员</span>
						<span class="val">{{order.consigAdmin}}</span>
					</div>
					<div class="oder_item">
						<span class="key">收货时间</span>
						<span class="val">{{order.consigTime}}</span>
					</div>
					<div class="oder_item">
						<span class="key">收货备注</span>
						<span class="val">{{order.consigNote}}</span>
					</div>
				</div>
				<div class="order-form" v-if="status==4">
					<div class="oder_item">
						<span class="key">处理人员</span>
						<span class="val">{{order.sysAdmin}}</span>
					</div>
					<div class="oder_item">
						<span class="key">处理时间</span>
						<span class="val">{{order.disposeTime}}</span>
					</div>
					<div class="oder_item">
						<span class="key">操作备注</span>
						<span class="val">{{order.note}}</span>
					</div>
				</div>
			</div>

		</div>
	</aw-container>
</template>

<script>
  import {getAxiosApi} from "@/api/requestData";
  import Address from '@/components/zis-address';
	export default {
		components: {
			Address
		},
		data() {
			return {
        status:'3',
        opProps:{
          value: 'zh',
            label: 'zh',
          children: 'children',
          checkStrictly: false,
          emitPath: false,
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
						goodsColor: '黑色',
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
						goodsColor: '玫瑰金',
						goodsCount: 1,
						total: 6000
					}
				],
				totalPrice: 18000,
				form2: {
					orderMoney: 200,
          returnsCostType: '',
					confirmMoney: 200,
					consigneeName: '张三疯',
					address: [],
					addressInfo: '天龙大道25号',
					phone: '13545679874',
					note: '同意退货'
				},
				order:{
				  orderId:'',
					serviceNum:'112331589',
					status:0,
					orderNum:'19979564565',
					createTime:'2020-04-17 19:00:20',
					userAccount:'1885545445',
					contact:'小草莓',
					linkPhone:'13612345678',
					returnCause:'质量问题',
					describe:'这个商品的质量太差了',
					orderAmount:'200.00',
					returnExpress:0,
					confirmAmount:'200.00',
					consignee:'大橙子',
					address:'深圳市龙华区振华时代广场',
					consigPhone:'13898746532',
					note:'确认商品是质量问题，允许退货',
					sysAdmin:'客服小李',
					disposeTime:'2020-04-10 12:20:00',
					goodsNote:'商家已收到货',
					consigTime:'2020-04-10 15:00:12',
					consigAdmin:'客服葡萄',
					consigNote:'平台已收到货'
				},
				applyStatus:{'0':'待处理','1':'已成功','-1':'已拒绝','2':'已完成','3':'已拒绝'}
			}
		},
    mounted() {
		  getAxiosApi('/supply/web/returnsApply/getEntity',{},{id:this.$route.query.id}).then(res=>{
        this.order = res.data[0].SAftermarketDO
        this.form2 = res.data[0].SAddressDO
      }).catch(_=>{})
    },
    methods: {
			_getAddress(val) {
				this.form2.address = val;
			},
			submit() {
				console.log(this.form2);
			},
			goDetail() {
				this.$router.push({
      	  	path:'/zis/order-public/detail',
            query:{
      	  	  id: this.order.orderId
            }
      	  })
			}
		}
	}
</script>
<style scoped lang="scss">
.back{
	color: #409EFF;
}
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
		.photo{
			height: 80px;
			line-height: 80px;
		}
		.val {
			padding-left: 10px;

		}
		.img_box{
			width: 400px;
		}
		.img{
				width: 60px;
				height: 60px;
				margin: 10px 20px 0 0;
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
