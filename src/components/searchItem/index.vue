<template>
    <div class="searchBtn bg1 clearfix">
    	<!-- <span class="ml_24">输入搜索：</span> -->
    	<el-input @keyup.enter.native = "searchHandler" size="mini"
    	  :placeholder="placeholderStr"
    	  prefix-icon="el-icon-search"
    	  v-model="searchStr">
    	</el-input>
    	<span class="ml_24">
    	  <el-button type="primary" size="mini" icon="el-icon-search" @click="searchHandler">搜索</el-button>
    	</span>
    </div>
</template>

<script>
  export default{
  	data(){
  		return {
  			searchStr: '',
  		}
  	},
  	props: {
  		placeholderStr: String
  	},
  	methods: {
  		searchHandler (){
  			if(this.searchStr){
  				// this.$store.commit('SET_SEARCH',this.searchStr);
  				this.$emit("searchBtn",this.searchStr);
  			}
  		}
  	}
  }
</script>

<style scoped>
	/deep/ .el-input{
		display: inline-block;
		width: auto;
	}
	.searchBtn{
		height: 65px;
		line-height: 60px;
		padding-right: 150px;
		/* border-bottom: 1px solid #eeeeee; */
	}
</style>
