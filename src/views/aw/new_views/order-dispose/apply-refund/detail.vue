<template>
	<aw-container>
		<div class="zis-table-view">
			<div class="title clearfix">
				<span>服务单信息</span>
				<span class="right back" @click="$router.go(-1)"><i class="el-icon-arrow-left"></i>返回</span>
			</div>
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
						<span class="val">{{order.tradeNo}}</span>
						<span class="look" @click='goDetail'>查看</span>
					</div>
					<div class="oder_item">
						<span class="key">申请时间</span>
						<span class="val">{{order.createTime|time}}</span>
					</div>
					<div class="oder_item">
						<span class="key">用户账号</span>
						<span class="val">{{order.userId}}</span>
					</div>
				</div>
				<div class="order-form">
					<div class="oder_item">
						<span class="key">订单金额</span>
						<span class="val">¥{{order.orderPrice}}</span>
					</div>
					<div class="oder_item">
						<span class="key">确认退款金额</span>
						<span class="val">¥{{order.applyPrice}}</span>
					</div>
					<div class="oder_item">
						<span class="key">退款方式</span>
						<span class="val">{{ApplyModeTxt[order.applyMode]}}</span>
					</div>
					<div class="oder_item">
						<span class="key">退款类型</span>
						<span class="val">{{order.applyType}}</span>
					</div>
					<div class="oder_item">
						<span class="key">退款原因</span>
						<span class="val">{{order.reason}}{{order.remake}}</span>
					</div>
					<div class="oder_item clearfix" v-if="order.status==1">
						<span class="key left"><span style="color:red">*</span>处理备注</span>
						<span class="val">
							<el-col :span='6'><el-input v-model='form.operationRemark' rows="3"></el-input></el-col>
						</span>
					</div>
					<div class="footer" v-if="order.status==1">
						<el-button type='primary' @click='submit(2)'>确认退款</el-button>
						<el-button type='danger' @click="submit(-1)">拒绝退款</el-button>
					</div>
				</div>
				<div class="order-form" v-if="order.status==-1">
					<div class="oder_item">
						<span class="key">处理人员</span>
						<span class="val">{{order.disposeStaff}}</span>
					</div>
					<div class="oder_item">
						<span class="key">处理时间</span>
						<span class="val">{{order.disposeTime|time}}</span>
					</div>
					<div class="oder_item">
						<span class="key">操作备注</span>
						<span class="val">{{order.operationRemark}}</span>
					</div>
				</div>
			</div>
		</div>
	</aw-container>
</template>

<script>
  import {getAxiosApi} from '@/api/requestData'
	export default {
		data() {
			return {
				status:'1',
        ApplyModeTxt:{
				  1:'支付宝',
          2:'微信'
        },
				form:{
					note:''
				},
				order:{
					serviceNum:'112331589',
					status:1,
					orderNum:'19979564565',
					createTime:'2020-04-17 19:00:20',
					userAccount:'1885545445',
					orderAmount:'200.00',
					confirmAmount:'200.00',
					moneyMethods:'退回到原支付渠道',
					moneyType:'取消订单',
					returnCause:'商品质量不行，不想要了',
					sysAdmin:'客服小李',
					disposeTime:'2020-04-10 12:20:00',
					note:'已退款'
				},
        applyStatus:{'0':'待处理','1':'待处理','2':'已处理','-1':'已拒绝'}
			}
		},
    mounted() {
		  getAxiosApi('/supply/web/refundApply/getEntity',{},{id:this.$route.query.id},'get').then(res=>{
		    this.order = res.data
      }).catch(_=>{})
    },
    methods: {
			_getAddress(val) {
				this.form2.address = val;
			},
			submit(status) {
				if(this.form.operationRemark){
          getAxiosApi('/supply/web/refundApply/refund',{orderId:this.$route.query.orderId,status:status,operationRemark:this.form.operationRemark},{}).then(res=>{
            if(res.status > 0){
              this.$message.success('提交成功')
              this.$router.go(-1)
            }else{
              this.$message.error(res.tip)
            }
          }).catch(_=>{})
        }else{
          this.$message.error('请填写处理备注')
				}
			},
			goDetail(){
				this.$router.push({
      	  	path:'/zis/order-public/detail'
      	  })
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
		margin: 40px auto 30px;
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
				color:#409eff;
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
