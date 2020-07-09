<template>
	<div class="header">
		<el-form
      :inline="true"
      :model="form"
      ref="form"
      size="mini"
      style="margin:20px 0 0px;padding: 20px 10px 0;background: #fff"
    >
      <el-form-item label="输入搜索：" prop="keys">
        <el-input
          v-model="form.keys"
          placeholder="订单编号/商品编号"
          style="width: 140px;"/>
      </el-form-item>
       <el-form-item label="收货人：" prop="user">
        <el-input
          v-model="form.user"
          placeholder="收货人/手机号"
          style="width: 140px;"/>
      </el-form-item>
       <el-form-item label="提交时间：" prop="date">
        <el-date-picker
	      v-model="form.date"
	      type="daterange"
	      range-separator="至"
	      format="yyyy 年 MM 月 dd 日"
	      value-format="yyyy-MM-dd"
	      start-placeholder="开始日期"
	      end-placeholder="结束日期">
		</el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="handleFormSubmit">
          <aw-icon name="search"/>
          查询
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          type="success"
          @click="handleFormReset">
          <aw-icon name="refresh"/>
          刷新
        </el-button>
      </el-form-item>
    </el-form>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				form: {
		          keys: '',
		          user: '',
		          date:''
		        },
			}
		},
		methods:{
			handleFormSubmit () {
		        this.$emit('getKeys',this.form);
		    },
			handleFormReset () {
		        this.$router.push({
		        	path:'/refresh'
		        })
      		},
		}
	}
</script>

<style>
</style>
