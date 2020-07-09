<template>
  <aw-container>
<!--    <btn-group-->
<!--			:btns='btnData'-->
<!--			@selectBtn='getType'-->
<!--			:zIndex='index'-->
<!--			>-->
<!--	</btn-group>-->
	<page-header
  		@keyWords='getKeyWords'
  		>
  	</page-header>
    <page-main
		:tableData='tableData'
   		:pageTotal="pageTotal"
   		@currentChange="currentChange"
   		@sizeChange="sizeChange"
    	>
    </page-main>
  </aw-container>
</template>

<script>
  import BtnGroup from '@/components/btn-group'
  import PageHeader from'./components/PageHeader'
  import PageMain from './components/PageMain'
  export default {
  	components:{
  		BtnGroup,
  		PageHeader,
  		PageMain
  	},
    data () {
      return {
      	index:undefined,
      	pageTotal:10,
    		incomePayData:{
				page:1,
				limit:1,
				name:''
			},
        btnData:[
          {
            btnText:'全部订单',
            num:1000
          },
          {
            btnText:'待发货',
            num:1000
          },
          {
            btnText:'已发货',
            num:1000
          },
          {
            btnText:'已完成',
            num:1000
          },
          {
            btnText:'已关闭',
            num:1000
          }
        ],
        tableData: [{
          orderNum: '131510',
          createTime: '2020-04-02 15:30:00',
          shopName:'张三旗舰店',
          userAccount:'13612345678',
          orderAmount:'1000',
          payMethods:'0',
          orderSource:'APP',
          orderStatus:'0'
        },
          {
            orderNum: '182210',
            createTime: '2020-04-05 15:30:00',
            shopName:'李四旗舰店',
            userAccount:'13874569856',
            orderAmount:'800',
            payMethods:'1',
            orderSource:'APP',
            orderStatus:'2'
          }],
      }
    },
    methods: {
    		// 上下分页
		currentChange(val){
		    this.incomePayData.page = val;
		},
		// 每页显示多少条
		sizeChange(val){
		    this.incomePayData.limit = val;
		},
		//切换按钮（状态）
		getType(index){
			this.index = index;
		},
		getKeyWords(key){
			console.log(key);
		}
    }
  }
</script>

<style scoped lang="scss">

</style>

