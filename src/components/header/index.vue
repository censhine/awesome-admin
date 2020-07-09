<template>
    <div class="title border_b pl_24 bg1 clearfix">
      <div class="myTitle fl">{{title}}</div>
    </div>
</template>

<script>
	export default{
		data(){
			return {

			}
		},
		props:{
			title: String
		},
    methods: {

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
