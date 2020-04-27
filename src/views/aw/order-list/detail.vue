<template>
	<d2-container>
		<div class="wrap">
			 <div class="header clearfix">
				<span class="status left">当前订单状态：待付款</span>
				<el-button class='right' style='margin-top: 12px;margin-right: 20px;' type='primary' size='medium'>关闭订单</el-button>
			</div>
		</div>
		
	</d2-container>
</template>

<script>
</script>

<style scoped lang="scss">
.wrap{
	width: 1200px;
	.header{
		background: #f3f3f3;
		height: 60px;
		line-height: 60px;
			.status{
	color: #F04844;
	padding-left: 20px;
}
	}

}

</style>