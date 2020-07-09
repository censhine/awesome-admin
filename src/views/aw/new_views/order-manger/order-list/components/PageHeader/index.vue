<template>
	<div class="wrap">
	   <search-btn :placeStr='placeStr' @search='getKeys'></search-btn>	   
	</div>
</template>

<script>
	import SearchBtn from '@/components/search-btn'
	export default{
		components:{
  		SearchBtn
  	},
  	data(){
  		return{
  			placeStr:'订单编号/商品编号/所属店铺',
  		}
  	},
  	methods:{
  		getKeys(key){
    		this.$emit('keyWords',key);
    	},
  	}
	}
</script>

<style>
</style>