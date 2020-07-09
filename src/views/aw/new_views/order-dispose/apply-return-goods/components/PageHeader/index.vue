<template>
	<div class="header">
		<el-form
      :inline="true"
      :model="form"
      ref="form"
      size="mini"
      style="margin:20px 0 0px;padding: 20px 10px 0;background: #fff"
    >
      <el-form-item label="输入搜索：" prop="serveId">
        <el-input
          v-model="form.serveId"
          placeholder="服务单号"
          style="width: 140px;"/>
      </el-form-item>
      <el-form-item label="联系人：" prop="keyWord">
        <el-input
          v-model="form.keyWord"
          placeholder="联系人/手机号码"
          style="width: 140px;"/>
      </el-form-item>
      <el-form-item label="提交时间：" prop="date" >
        <el-date-picker
		      v-model="form.date"
		      type="daterange"
		      style='width: 330px;'
		      format="yyyy 年 MM 月 dd 日"
		      value-format="yyyy-MM-dd"
		      range-separator="至"
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
          serveId:'',
          keyWord: '',
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
