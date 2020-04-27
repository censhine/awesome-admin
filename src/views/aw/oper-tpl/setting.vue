<template>
	<d2-container>
		<div class="settings-wrap">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position='right' label-width="220px" class="demo-ruleForm" >
	   	  <h2>
          <el-form-item label="商家设置:">
          <el-col :span='10'></el-col>
          </el-form-item>
        </h2>
        <el-form-item label='商家入驻平台收取押金：' prop='noPay'>
	   	   	 	 <el-col :span='10'>
	   	   	 	 	<el-input placeholder="请输入"  v-model='ruleForm.noPay'>
					    <template slot="append">元</template>
					</el-input>
				</el-col>
				<el-col :span='6' style='margin-left: 10px;'>
				</el-col>
	   	   	 </el-form-item>
	   	   	 <el-form-item label='商家免费开店数：' prop='noGoods' >
	   	   	 	 <el-col :span='10'>
	   	   	 	 	<el-input placeholder="请输入" v-model='ruleForm.noGoods'>
					    <template slot="append">店</template>
					</el-input>
				</el-col>
				<el-col :span='6' style='margin-left: 10px;'>
				</el-col>
	   	   	 </el-form-item>
	   	   	 <el-form-item label='商家再次开店收取费用：'prop='autoEnd'>
	   	   	 	 <el-col :span='10'>
	   	   	 	 	<el-input placeholder="请输入" v-model='ruleForm.autoEnd'>
					    <template slot="append">元/店</template>
					</el-input>
				</el-col>
				<el-col :span='8' style='margin-left: 10px;'>
				</el-col>
	   	   	 </el-form-item>
	   	   	 <el-form-item label='商家开通DIY模式收费：' prop='autoPraise'>
	   	   	 	 <el-col :span='10'>
	   	   	 	 	<el-input placeholder="请输入" v-model='ruleForm.autoPraise'>
					    <template slot="append">元/店</template>
					</el-input>
				</el-col>
				<el-col :span='6' style='margin-left: 10px;'>
				</el-col>
	   	   	 </el-form-item>

        <el-form-item label=' 商家群开通群人数限制：' prop='autoCharge'>
          <el-col :span='10'>
            <el-input placeholder="请输入" v-model='ruleForm.autoCharge'>
              <template slot="append">人/群</template>
            </el-input>
          </el-col>
          <el-col :span='6' style='margin-left: 10px;'>
          </el-col>
        </el-form-item>

        <el-form-item label=' 商家群升级至：' prop='autoStand'>
          <el-col :span='10'>
            <el-input placeholder="请输入" v-model='ruleForm.autoStand'>
              <template slot="append">人/群，收费</template>
            </el-input>
          </el-col>
          <el-col :span='6' style='margin-left: 10px;'>
            <el-input placeholder="请输入" v-model='ruleForm.groupUpgrade'>
              <template slot="append">元</template>
            </el-input>
          </el-col>
        </el-form-item>

        <h2>
          <el-form-item label="代理商设置:">
            <el-col :span='10'></el-col>
          </el-form-item>
        </h2>

        <el-form-item label=' 供应商入住平台收费押金：' prop='ageCharge'>
          <el-col :span='10'>
            <el-input placeholder="请输入" v-model='ruleForm.ageCharge'>
              <template slot="append">元</template>
            </el-input>
          </el-col>
          <el-col :span='6' style='margin-left: 10px;'>
          </el-col>
        </el-form-item>

        <el-form-item label=' 允许供应商开店数：' prop='ageAllowStores'>
          <el-col :span='10'>
            <el-input placeholder="请输入" v-model='ruleForm.ageAllowStores'>
              <template slot="append">店</template>
            </el-input>
          </el-col>
          <el-col :span='6' style='margin-left: 10px;'>
          </el-col>
        </el-form-item>

	   	   	 <el-form-item style='margin-top: 44px;'>
				<el-button type="primary" @click="submitForm('ruleForm')">确定提交</el-button>
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
					noPay:'1000',
					noGoods:'1',
					autoEnd:'2000',
					autoPraise:'10000',
          autoCharge:'200',
          autoStand:'500',
          groupUpgrade:'未定',
          ageCharge: 1000,
          ageAllowStores:1,
				},
				rules: {
					noPay: [{
						required: true,
						message: '请输入',
						trigger: 'blur'
					},
					{
						pattern:/^[1-9]\d*$/,
						message:'只能输大于0的数字'
					}],

					noGoods: [{
						required: true,
						message: '请输入',
						trigger: 'blur'
					},{
						pattern:/^[1-9]\d*$/,
						message:'只能输大于0的数字'
					}],
					autoEnd: [{
						required: true,
						message: '请输入',
						trigger: 'blur'
					},{
						pattern:/^[1-9]\d*$/,
						message:'只能输大于0的数字'
					}],
					autoPraise: [{
						required: true,
						message: '请输入',
						trigger: 'blur'
					},{
						pattern:/^[1-9]\d*$/,
						message:'只能输大于0的数字'
					}],
          autoCharge: [{
            required: true,
            message: '请输入',
            trigger: 'blur'
          },{
            pattern:/^[1-9]\d*$/,
            message:'只能输大于0的数字'
          }],
          autoStand: [{
            required: true,
            message: '请输入',
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

<style lang="scss">
.settings-wrap{
	width: 800px;
  h2 label{
    font-size:16px;
    font-weight: 600;
  }
}
</style>
