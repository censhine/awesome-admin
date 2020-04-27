<template>
	<d2-container>
		<div class="wrap" id="logistics">
			<div class="title clearfix">
				<span class="lf_title">物流跟踪</span>
				<span class="rf_btn right" @click="handleCloseTab">关 闭</span>
			</div>
			<div class="time_line">
			  <el-timeline>
			    <el-timeline-item class='color'
			      v-for="(activity, index) in activities"
			      :key="index"
			      :timestamp="activity.timestamp">
			      {{activity.content}}
			    </el-timeline-item>
			  </el-timeline>
			</div>
		</div>
	</d2-container>
</template>

<script>
	import { mapState, mapActions} from 'vuex'
	export default{
		data(){
			return{
				activities: [{
			          content: '妥投投递并签收，签收人：他人收 他人收',
			          timestamp: '2018-04-15'
			        },{
			          content: '到达广东省邮政速递物流有限公司深圳航空邮件处理中心处理中心（经转',
			          timestamp: '2018-04-15'
			        },{
			          content: '离开中山市 发往深圳市（经转)',
			          timestamp: '2018-04-15'
			        },{
			          content: '到达广东省邮政速递物流有限公司中山三角邮件处理中心处理中心',
			          timestamp: '2018-04-15'
			        }, {
			          content: '离开泉州市 发往中山市',
			          timestamp: '2018-04-13'
			        }, {
			          content: '泉州市速递物流分公司南区电子商务业务部已收件',
			          timestamp: '2018-04-11'
			        }]
			}
		},
		computed:{
			...mapState('d2admin/page', [
			  'opened',
			  'current' //用户获取当前页面的地址，用于关闭
			])
		},
		methods:{
			...mapActions('d2admin/page',[
    		'close',
			]),
			handleCloseTab(){
		  this.close({tagName:this.current});
		  this.$router.go(-1)
		}
		}
	}
</script>

<style scoped lang='scss'>
.wrap{
	width: 800px;
	border: 1px solid #e4e4e4;
  .right{
    float: right;
  }
	.title{
		line-height: 40px;
		padding: 0 20px;
		background: #f2f2f2;
		.rf_btn{
			&:hover{
				cursor: pointer;
			}
		}
	}
	.time_line{
		margin: 50px 0 0 30px;
		padding-bottom: 30px;

	}
}
</style>
<style lang="scss">
	#logistics{
		.color{
			&:first-child{
				.el-timeline-item__node{
					background: #409eff;
				}
			}
		}
	}

</style>
