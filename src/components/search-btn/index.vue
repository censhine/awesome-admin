<template>
	<div class="wrap">
		<div class="search">
			<span>输入搜索：</span>
			 <el-input
          v-model="searchStr"
          :placeholder="placeStr"
          size='mini'
          clearable
          style="width: 190px;margin-right:20px"/>
           <el-button
          type="primary"
          size='mini'
          @click="handleFormSubmit">
          <d2-icon name="search"/>
          查询
        </el-button>
        <el-button
          type="success"
          size='mini'
          @click="handleReload">
          <d2-icon name="refresh"/>
          刷新
        </el-button>
		</div>
		<el-divider></el-divider>
	</div>
</template>

<script>
	export default{

		data() {
			return{
				searchStr:''
			}
		},
		props:{
			placeStr:String
		},
		methods:{
			handleFormSubmit () {
        this.$emit('search', this.searchStr);
      },
      handleReload () {
			  this.$router.push({path:'/refresh'})
      }
		}
	}
</script>

<style>
	.search{
		margin: 20px 0;
	}
</style>
