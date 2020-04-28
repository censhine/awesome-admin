<template>
	<aw-container>
    <aw-back title="返回" align="right"></aw-back>
		<div class="wrap">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position='right' label-width="160px" class="demo-ruleForm" size="mini">
				<el-form-item label="分类：" prop="category_id">
					<el-cascader v-model="ruleForm.category_id" :options="ruleForm.options" @change="handleChange"></el-cascader>
				</el-form-item>
				<el-form-item label="商品名称：" prop="name">
					<el-col :span="12">
						<el-input v-model="ruleForm.name"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="商品编码：" prop="code">
					<el-col :span="12">
						<el-input v-model="ruleForm.code"></el-input>
					</el-col>
					<el-col class="tip" :span="8">（商品所标记的唯一编码)</el-col>
				</el-form-item>
				<el-form-item label="商品进价(成本)：" prop="cost">
					<el-col :span="12">
						<el-input v-model="ruleForm.cost"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="商品售价：" prop="price">
					<el-col :span="12">
						<el-input v-model="ruleForm.price"></el-input>
					</el-col>
					<el-col class="tip" :span="8">（供应商店铺里显示的商品卖价）</el-col>
				</el-form-item>
				<el-form-item label="建议代理商售价：" required>
					<el-col :span="5">
						<el-form-item prop='age_start_price'>
							<el-input v-model="ruleForm.age_start_price"></el-input>
						</el-form-item>
					</el-col>
					<el-col style='text-align: center;' :span="2">至</el-col>
					<el-col :span="5">
						<el-form-item prop='age_end_price'>
							<el-input v-model="ruleForm.age_end_price"></el-input>
						</el-form-item>
					</el-col>
					<el-col class="tip" :span="12">（代理商代理到自己店铺里出售的价格区间）</el-col>
				</el-form-item>
				<el-form-item label="商品关键词：">
					<el-col :span="12">
						<el-input v-model="ruleForm.keywords"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="商品描述：">
					<el-col :span="12">
						<el-input type="textarea" v-model="ruleForm.desc"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item>

				</el-form-item>
				<el-form-item>
					<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="ruleForm.fileList" list-type="picture-card" :multiple="true" :on-exceed="handleCheck" :limit="5">
						<i class="el-icon-plus"></i>
					</el-upload>
					<span class="tip"> 可多张图片上传，最多可以上传5张图片</span>
				</el-form-item>
				<el-form-item label="规格类型：" prop="goods_type_id">
					<el-col :span='13'>
						<el-select v-model="ruleForm.goods_type_id" placeholder="请选择规格类型" @change='show($event)' ref="typeSelect">
							<el-option v-for='item in ruleForm.typeData' :key='item.goods_type_id' :label='item.pe_name' :value='item.goods_type_id'>
							</el-option>
						</el-select>
					</el-col>
					<!--<el-col :span='4'>
				    	<el-button type='primary'>增加规格</el-button>
				    </el-col>-->
				</el-form-item>
				<el-form-item v-show='showSku'>
					<vue-sku v-model="ruleForm.attrs" action="http://localhost:8081/index.php" :sku-tree="skuTree" :on-fetch-group="fetchSkuTree" :on-fetch-sku="fetchSku" :on-create-group="createGroup" :on-create-sku="createSku" @on-change="change" />
					<br>
					<sku-table :data="ruleForm.attrs" v-model='ruleForm.data' :flatten="flatten" @on-change-data="handleChangeData" />
				</el-form-item>
				<el-form-item label='商品详情：'>
					<aw-quill style="min-height: 200px; margin-bottom: 20px;" v-model="ruleForm.text" @text-change="textChangeHandler" @selection-change="selectionChangeHandler" @editor-change="editorChangeHandler" />
				</el-form-item>
				<el-form-item label="商品推荐：">
					<el-radio-group v-model="ruleForm.recommend">
						<el-radio label="新品"></el-radio>
						<el-radio label="推荐"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="服务保证：">
					<el-radio-group v-model="ruleForm.service">
						<el-radio label="7天退换货"></el-radio>
						<el-radio label="48小时内发货"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="运费选择：" prop="freight">
					<el-radio-group v-model="ruleForm.freight">
						<el-radio label="卖家承担运费"></el-radio>
						<el-radio label="买家承担运费"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
				</el-form-item>
			</el-form>
		</div>

	</aw-container>
</template>

<script>
	import { Sku, SkuTable } from './sku'
	const skuTree = [{
			id: 10740,
			text: '颜色'
		},
		{
			id: 40732,
			text: '尺寸'
		}
	]

	const sku = [{
			id: 3,
			text: '蓝色'
		},
		{
			id: 10,
			text: '红色'
		},
		{
			id: 30,
			text: '土豪金'
		},
		{
			id: 137,
			text: '黑色'
		},
		{
			id: 138,
			text: '灰色'
		},
		{
			id: 121,
			text: 'xxl'
		},
		{
			id: 94,
			text: 'xxxl'
		}
	]

	export default {
		name: 'edit',
		components: {
			'vue-sku': Sku,
			'sku-table': SkuTable,
      d2Back: ()=>import("@/components/aw-back")
		},
		data() {
			return {
				showSku:false,
				ruleForm: {
					category_id: '',
					name: '',
					code: '',
					cost: '',
					price: '',
					age_start_price: '',
					age_end_price: '',
					keywords: '',
					desc: '',
					goods_type_id: '',
					type: [],
					resource: '',
					freight: '',
					text: '',
					data: [],
					attrs: [
					{
						'id': 10740,
						'text': '颜色',
						'leaf': [{
								'id': 3,
								'text': '蓝色',
								'is_show': false
							},
							{
								'id': 10,
								'text': '红色',
								'is_show': false
							}]
					}],
					fileList: [{
						name: 'food.jpeg',
						url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
					}],
					options: [{
						value: 'zhinan',
						label: '指南',
						children: [{
							value: 'shejiyuanze',
							label: '设计原则',
							children: [{
								value: 'yizhi',
								label: '一致'
							}]
						}, {
							value: 'daohang',
							label: '导航',
							children: [{
								value: 'cexiangdaohang',
								label: '侧向导航'
							}, {
								value: 'dingbudaohang',
								label: '顶部导航'
							}]
						}]
					}],
					typeData: [{
							goods_type_id: 6,
							pe_name: "手机"
						},
						{
							goods_type_id: 9,
							pe_name: "笔记本"
						}
					]
				},

				rules: {
					category_id: [{
						required: true,
						message: '请选择分类',
						trigger: 'change'
					}],
					name: [{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur'
					}],
					code: [{
						required: true,
						message: '请输入商品编号',
						trigger: 'blur'
					}],
					cost: [{
						required: true,
						message: '请输入商品进价',
						trigger: 'blur'
					},{
						pattern:/^[1-9]\d*$/,
						message:'只能输大于0的数字'
					}],
					price: [{
						required: true,
						message: '请输入商品售价',
						trigger: 'blur'
					},{
						pattern:/^[1-9]\d*$/,
						message:'只能输大于0的数字'
					}],
					age_start_price: [{
						required: true,
						message: '请输入建议售价',
						trigger: 'blur'
					},{
						pattern:/^[1-9]\d*$/,
						message:'只能输大于0的数字'
					}],
					age_end_price: [{
						required: true,
						message: '请输入建议售价',
						trigger: 'blur'
					},{
						pattern:/^[1-9]\d*$/,
						message:'只能输大于0的数字'
					}],
					goods_type_id: [{
						required: true,
						message: '请选择规格类型',
						trigger: 'change'
					}],
					type: [{
						type: 'array',
						required: true,
						message: '请至少选择一个活动性质',
						trigger: 'change'
					}],
					resource: [{
						required: true,
						message: '请选择活动资源',
						trigger: 'change'
					}],
					freight: [{
						required: true,
						message: '请选择运费模式',
						trigger: 'change'
					}],
					desc: [{
						required: true,
						message: '请填写活动形式',
						trigger: 'blur'
					}]
				},


				skuTree,

				flatten: [
//				{
//						'skus': [{
//								'k_id': 10740,
//								'k': '颜色',
//								'v_id': 3,
//								'v': '蓝色'
//							},
//							{
//								'k_id': 40732,
//								'k': '尺寸',
//								'v_id': 121,
//								'v': 'xxl'
//							}
//						],
//						'price': 222222,
//						'stock': 12222,
//						'marked_price': 12312
//				},
//					{
//						'skus': [{
//								'k_id': 10740,
//								'k': '颜色',
//								'v_id': 10,
//								'v': '红色'
//							},
//							{
//								'k_id': 40732,
//								'k': '尺寸',
//								'v_id': 94,
//								'v': 'xxxl'
//							}
//						]
//					}
				]
			};
		},
		methods: {
			show(e){
				console.log(e);
				this.showSku = true;
			},
			textChangeHandler(delta, oldDelta, source) {
				// console.group('QuillEditor textChangeHandler')
				// console.log(delta, oldDelta, source)
				// console.groupEnd()
			},
			selectionChangeHandler(range, oldRange, source) {
				// console.group('QuillEditor selectionChangeHandler')
				// console.log(range, oldRange, source)
				// console.groupEnd()
			},
			editorChangeHandler(eventName, ...args) {
				// console.group('QuillEditor editorChangeHandler')
				// console.log(eventName, args)
				// console.groupEnd()
			},
			handleChange(value) {
				console.log(value);
			},
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
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			handleCheck(files, fileList) {
				this.$message.error('图片上传数量不可以超过5张');
			},
			handleCollapse(val) {
				console.log(val);
			},
			fetchSkuTree() {
				return new Promise(resolve => {
					resolve(skuTree)
				})
			},

			fetchSku(id) {
				return new Promise(resolve => {
					resolve(sku)
				})
			},

			createGroup(text) {
				return new Promise((resolve, reject) => {
					if(text) {
						resolve(parseInt(Math.random() * 100, 10) + 1)
					} else {
						reject(new Error())
					}
				})
			},

			createSku(data) {
				return new Promise((resolve, reject) => {
					console.log(data)
					resolve(data.data.map(item => {
						return {
							id: parseInt(Math.random() * 100, 10) + parseInt(Math.random() * 100, 10),
							text: item
						}
					}))
				})
			},

			change(data) {},

			handleChangeData(data) {
				this.ruleForm.data = data;
				console.log(this.ruleForm.data);
			}
		}
	}
</script>

<style scoped lang="scss">
	.wrap {
		width: 1200px;
		.demo-ruleForm {
			margin-top: 30px;
		}
		.tip {
			font-size: 12px;
			color: #999;
		}
		.ml {
			margin-left: 15px;
		}
	}
</style>
<style>
	.el-cascader--mini,
	.el-select {
		width: 400px;
	}
</style>
