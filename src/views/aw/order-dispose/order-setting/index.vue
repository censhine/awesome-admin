<template>
	<aw-container>
    <aw-header title="订单设置"></aw-header>
		<div class="wrap">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position='right' label-width="160px" class="demo-ruleForm" >
	   	   	 <el-form-item label='正常订单超过：' prop='noPay'>
	   	   	 	 <el-col :span='10'>
	   	   	 	 	<el-input placeholder="请输入"  v-model='ruleForm.noPay'>
					    <template slot="append">分</template>
					</el-input>
				</el-col>
				<el-col :span='6' style='margin-left: 10px;'>
					未付款,订单自动关闭
				</el-col>
	   	   	 </el-form-item>
	   	   	 <el-form-item label='发货超过：' prop='noGoods' >
	   	   	 	 <el-col :span='10'>
	   	   	 	 	<el-input placeholder="请输入" v-model='ruleForm.noGoods'>
					    <template slot="append">天</template>
					</el-input>
				</el-col>
				<el-col :span='6' style='margin-left: 10px;'>
					未收货，订单自动完成
				</el-col>
	   	   	 </el-form-item>
	   	   	 <el-form-item label='订单完成超过：'prop='autoEnd'>
	   	   	 	 <el-col :span='10'>
	   	   	 	 	<el-input placeholder="请输入" v-model='ruleForm.autoEnd'>
					    <template slot="append">天</template>
					</el-input>
				</el-col>
				<el-col :span='8' style='margin-left: 10px;'>
					自动结束交易，不能申请售后
				</el-col>
	   	   	 </el-form-item>
	   	   	 <el-form-item label='订单完成超过：' prop='autoPraise'>
	   	   	 	 <el-col :span='10'>
	   	   	 	 	<el-input placeholder="请输入" v-model='ruleForm.autoPraise'>
					    <template slot="append">天</template>
					</el-input>
				</el-col>
				<el-col :span='6' style='margin-left: 10px;'>
					自动五星好评
				</el-col>
	   	   	 </el-form-item>
	   	   	 <el-form-item style='margin-top: 44px;'>
				<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
			</el-form-item>
	   </el-form>
		</div>

	</aw-container>
</template>

<script>
	export default{
		data(){
			return{
				ruleForm:{
					noPay:'',
					noGoods:'',
					autoEnd:'',
					autoPraise:''
				},
				rules: {
					noPay: [{
						required: true,
						message: '请输入订单超时时间',
						trigger: 'blur'
					},
					{
						pattern:/^[1-9]\d*$/,
						message:'只能输大于0的数字'
					}],

					noGoods: [{
						required: true,
						message: '请输入发货超时时间',
						trigger: 'blur'
					},{
						pattern:/^[1-9]\d*$/,
						message:'只能输大于0的数字'
					}],
					autoEnd: [{
						required: true,
						message: '请输入订单完成超过自动结束交易时间',
						trigger: 'blur'
					},{
						pattern:/^[1-9]\d*$/,
						message:'只能输大于0的数字'
					}],
					autoPraise: [{
						required: true,
						message: '请输入订单完成超过自动五星好评时间',
						trigger: 'blur'
					},{
						pattern:/^[1-9]\d*$/,
						message:'只能输大于0的数字'
					}],
				}
			}
		},
		methods:{
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						console.log(this.ruleForm);
					} else {
						console.log(this.ruleForm);
						console.log('error submit!!');
						return false;
					}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
.wrap{
	width: 800px;
	margin: 100px auto;
}
</style>
