<template>
	<d2-container>
		<div class="wrap">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position='right' label-width="220px" class="demo-ruleForm" >
	   	   	 <el-form-item label='代理合同每人申领免费次数：' prop='noPay'>
	   	   	 	 <el-col :span='10'>
	   	   	 	 	<el-input placeholder="请输入"  v-model='ruleForm.noPay'>
					    <template slot="append">次</template>
					</el-input>
				</el-col>
				<el-col :span='6' style='margin-left: 10px;'>
				</el-col>
	   	   	 </el-form-item>
	   	   	 <el-form-item label='购销合同每人申领免费次数：' prop='noGoods' >
	   	   	 	 <el-col :span='10'>
	   	   	 	 	<el-input placeholder="请输入" v-model='ruleForm.noGoods'>
					    <template slot="append">次</template>
					</el-input>
				</el-col>
				<el-col :span='6' style='margin-left: 10px;'>
				</el-col>
	   	   	 </el-form-item>
	   	   	 <el-form-item label='代理合同下载收费标准：'prop='autoEnd'>
	   	   	 	 <el-col :span='10'>
	   	   	 	 	<el-input placeholder="请输入" v-model='ruleForm.autoEnd'>
					    <template slot="append">元</template>
					</el-input>
				</el-col>
				<el-col :span='8' style='margin-left: 10px;'>
				</el-col>
	   	   	 </el-form-item>
	   	   	 <el-form-item label='购销合同下载收费标准：' prop='autoPraise'>
	   	   	 	 <el-col :span='10'>
	   	   	 	 	<el-input placeholder="请输入" v-model='ruleForm.autoPraise'>
					    <template slot="append">元</template>
					</el-input>
				</el-col>
				<el-col :span='6' style='margin-left: 10px;'>
				</el-col>
	   	   	 </el-form-item>
        <el-form-item label=' 代理合同法援收费标准：' prop='autoCharge'>
          <el-col :span='10'>
            <el-input placeholder="请输入" v-model='ruleForm.autoCharge'>
              <template slot="append">份</template>
            </el-input>
          </el-col>
          <el-col :span='6' style='margin-left: 10px;'>
          </el-col>
        </el-form-item>
        <el-form-item label=' 购销合同法援收费标准：' prop='autoStand'>
          <el-col :span='10'>
            <el-input placeholder="请输入" v-model='ruleForm.autoStand'>
              <template slot="append">份</template>
            </el-input>
          </el-col>
          <el-col :span='6' style='margin-left: 10px;'>
          </el-col>
        </el-form-item>
	   	   	 <el-form-item style='margin-top: 44px;'>
				<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
			</el-form-item>
	   </el-form>
		</div>

	</d2-container>
</template>

<script>
	export default{
		data(){
			return{
				ruleForm:{
					noPay:'5',
					noGoods:'5',
					autoEnd:'1',
					autoPraise:'1',
          autoCharge:'100',
          autoStand:'100'
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
          autoCharge: [{
            required: true,
            message: '请输入订单完成超过自动五星好评时间',
            trigger: 'blur'
          },{
            pattern:/^[1-9]\d*$/,
            message:'只能输大于0的数字'
          }],
          autoStand: [{
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
	margin-top: 20px;
}
</style>
