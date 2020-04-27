<template>
	<d2-container>
		<div class="zis-table-view">
			<div class="title clearfix">
				<span>服务单信息</span>
				<span class="right back" @click="$router.go(-1)">返回</span>
			</div>
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
				</div>
				<div class="order-form">
					<div class="oder_item">
						<span class="key">订单金额</span>
						<span class="val">¥6000</span>
					</div>
					<div class="oder_item">
						<span class="key">确认退款金额</span>
						<span class="val">¥6000</span>
					</div>
					<div class="oder_item">
						<span class="key">退款方式</span>
						<span class="val">退回到原支付渠道</span>
					</div>
					<div class="oder_item">
						<span class="key">退款类型</span>
						<span class="val">取消订单</span>
					</div>
					<div class="oder_item">
						<span class="key">退款原因</span>
						<span class="val">拍错了</span>
					</div>
					<div class="oder_item clearfix" v-if="status==1">
						<span class="key left">处理备注</span>
						<span class="val">
							<el-col :span='6'><el-input v-model='form.note'></el-input></el-col>
						</span>
					</div>
					<div class="footer">
							<el-button type='primary' @click='submit'>确认退款</el-button>
							<el-button type='danger'>拒绝退款</el-button>
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
	export default {
		data() {
			return {
				status:'1',
				form:{
					note:''
				}
			}
		},
		methods: {
			_getAddress(val) {
				this.form2.address = val;
			},
			submit() {
				console.log(this.form);
			}
		}
	}
</script>
<style scoped lang="scss">
  .right{
    float:right;
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
