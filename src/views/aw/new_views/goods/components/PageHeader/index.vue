<template>

	<div class="header">
		<el-form :inline="true" :model="form" ref="form" size="mini" style="margin:20px 0 0px;padding: 20px 10px 0;background: #fff">
			<el-form-item label="输入搜索：" prop="goodsName">
				<el-input v-model="form.goodsName" placeholder="商品名称/商品货号" style="width: 140px;" />
			</el-form-item>
<!--			<el-form-item label="商品分类：" prop="cateGory">-->
<!--				<el-select v-model="form.cateGory" placeholder="请选择商品分类" style="width: 160px;">-->
<!--					<el-option label="状态 1" value="1" />-->
<!--					<el-option label="状态 2" value="2" />-->
<!--					<el-option label="状态 3" value="3" />-->
<!--					<el-option label="状态 4" value="4" />-->
<!--					<el-option label="状态 5" value="5" />-->
<!--				</el-select>-->
<!--			</el-form-item>-->
			<el-form-item label="商品品牌：" prop="brand">
				<el-select v-model="form.brand" placeholder="请选择商品品牌" style="width: 160px;">
					 <el-option
              v-for="(item,index) in brandData"
              :key="index"
              :label="item.brandName"
              :value="item.id" />
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleFormSubmit">
					<aw-icon name="search" /> 查询
				</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="success" @click="handleFormReset">
					<aw-icon name="refresh" /> 刷新
				</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import {getBrandList} from '@/api/goods/list/goods'
	export default {
		data() {
			return {
				form: {
					goodsName: '',
					cateGory: '',
					brand:''
				},
				brandData:[]

			}
		},
		mounted(){
			this.getBrand()
		},
		methods: {
			 getBrand(){
		    getBrandList().then(res=>{
		      this.brandData = res.data
        })
      },
			handleFormSubmit() {
				this.$emit('getKeys',this.form);
			},
			handleFormReset() {
				this.$emit('updateData')
			}
		}
	}
</script>

<style scoped lang="scss">
	.header {}
</style>
