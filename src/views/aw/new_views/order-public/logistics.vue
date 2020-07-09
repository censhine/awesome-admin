<template>
	<aw-container>
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
			      :timestamp="activity.time">
			      {{activity.status}}
			    </el-timeline-item>
			  </el-timeline>
			</div>
		</div>
	</aw-container>
</template>

<script>
	import { mapState, mapActions} from 'vuex'
  import {getAxiosApi} from "@/api/requestData";
	export default{
		data(){
			return{
				activities: []
			}
		},
    mounted() {
      getAxiosApi('/supply/web/merchantOrder/track',null,{orderNo:this.$route.query.orderNo},'get')
        .then(res=> {
          if(res.status > 0){
            this.activities = res.data || []
          }else{
            this.$message.error(res.tip)
          }
        }).catch(_=>{});
    },
    computed:{
			...mapState('awadmin/page', [
			  'opened',
			  'current' //用户获取当前页面的地址，用于关闭
			])
		},
		methods:{
			...mapActions('awadmin/page',[
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
