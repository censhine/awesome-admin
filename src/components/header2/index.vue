<template>
    <div class="title border_b pl_24 bg1 clearfix">
      <div class="myTitle fl">{{title}}</div>
      <el-button type="default fr ml_24" icon="el-icon-refresh-left" style="margin-top: 15px;" size="mini" @click="handlerReload">刷新</el-button>
      <el-button type="default fr" icon="el-icon-arrow-left" style="margin-top: 15px;" size="mini"  @click="$router.go(-1)">返回</el-button>
    </div>
</template>

<script>
	export default{
    inject:['reload'],
		data(){
			return {

			}
		},
		props:{
			title: String
		},
    methods: {
      handlerReload (){
        this.reload()
        this.$emit('handleSubmit')
      }
    }
	}
</script>

<style scoped>
	.title{
		height: 60px;
		line-height: 60px;
		padding-right: 150px;
	}
</style>
