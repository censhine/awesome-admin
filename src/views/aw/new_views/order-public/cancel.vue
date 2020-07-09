<template>
	<aw-container>
		<div class="wrap" id="logistics">
			<div class="title clearfix">
				<span class="lf_title">取消订单</span>
				<span class="rf_btn right" @click="handleCloseTab"><i class="el-icon-arrow-left"></i>返回</span>
			</div>
			<div class="form">
				<el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px">
					<el-form-item label="取消原因：" prop='cause'>
						<el-col :span="13">
							<el-input type="textarea" v-model="form.cause"></el-input>
							<span class="tips">会记录在商家给客户的留言中</span>
						</el-col>
					</el-form-item>
					<el-form-item label="订单金额：">
						<el-col :span="13">
							¥ {{form.orderAmount}}
						</el-col>
					</el-form-item>
					<el-form-item label="退运费：">
						<el-radio-group v-model="form.cost">
							<el-radio @change='noMoney' label="不退运费"></el-radio>
							<el-radio @change='returnMoney' label="退运费"></el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item v-show='showExpressAmount' label="运费退款金额：" prop='expressAmount'>
						<el-col :span="13">
							<el-input v-model="form.expressAmount" autocomplete="off"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="确认退款金额：" prop='confirmAmount'>
						<el-col :span="13">
							<el-input v-model="form.confirmAmount" autocomplete="off"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="退款方式：">
						<el-radio-group v-model="form.returnMoney">
							<el-radio label="退回到原支付渠道"></el-radio>
							<el-radio label="生成退款申请"></el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="退款说明：">
						<el-col :span="13">
							<el-input type="textarea" v-model="form.instructions"></el-input>
						</el-col>
					</el-form-item>
					<div class="footer">
						<el-button type='primary' @click='submit("ruleForm")'>确定</el-button>
						<el-button type='danger' style='margin-left: 20px;'>取消</el-button>
					</div>
				</el-form>
			</div>
		</div>
	</aw-container>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	export default {
		data() {
			return {
				showExpressAmount: false,
				form: {
					cause: '',
					orderAmount: '200.00',
					cost: '不退运费',
					expressAmount: '12',
					confirmAmount: '200',
					returnMoney: '',
					instructions: ''
				},
				rules: {
					cause: [{
						required: true,
						message: '取消原因不能为空',
						trigger: 'blur'
					}],
					expressAmount: [{
						required: true,
						message: '运费不能为空',
						trigger: 'blur'
					}, {
						pattern: /^[1-9]\d*$/,
						message: '只能输大于0的数字'
					}],
					confirmAmount: [{
						required: true,
						message: '退款金额不能为空',
						trigger: 'blur'
					}, {
						pattern: /^[1-9]\d*$/,
						message: '只能输大于0的数字'
					}]
				},
			}
		},
    mounted() {

    },
    computed: {
			...mapState('awadmin/page', [
				'opened',
				'current' //用户获取当前页面的地址，用于关闭
			])
		},
		methods: {
			...mapActions('awadmin/page', [
				'close',
			]),
			handleCloseTab() {
				this.close({
					tagName: this.current
				});
				this.$router.go(-1)
			},
			returnMoney(label) {
				if(label == '退运费') {
					this.showExpressAmount = true;
				}
			},
			noMoney(label) {
				if(label == '不退运费') {
					this.showExpressAmount = false;
				}
			},
			submit(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						console.log(this.form);
					} else {
						console.log(this.form);
						console.log('error submit!!');
						return false;
					}
				});
			},
		}
	}
</script>

<style scoped lang='scss'>
	.wrap {
		width: 1200px;
		border: 1px solid #e4e4e4;
		.title {
			line-height: 40px;
			padding: 0 20px;
			background: #f2f2f2;
			.rf_btn {
				color: #409EFF;
				&:hover {
					cursor: pointer;
				}
			}
		}
		.form {
			padding: 80px 80px 80px 320px;
			.footer {
				margin: 40px 0px 0px 120px;
			}
			.tips {
				color: #999;
				font-size: 12px;
			}
		}
	}
</style>
