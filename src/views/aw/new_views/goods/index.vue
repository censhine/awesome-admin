<template>
  <aw-container>
<!--  	<btn-group-->
<!--      :btns='btnData'-->
<!--      @selectBtn='getType'-->
<!--      :zIndex='index'-->
<!--    >-->
<!--	</btn-group>-->
  	<page-header
  		@getKeys='getKey'
  		@updateData='getData'
  		>
  	</page-header>
   	<page-main
   		:tableData='tableData'
   		:pageTotal="pageTotal"
   		@updateData='getData'
   		@currentChange="currentChange"
   		@sizeChange="sizeChange"
   		>
   	</page-main>
  </aw-container>
</template>

<script>
	// import BtnGroup from '@/components/btn-group'
	import PageHeader from './components/PageHeader'
  import PageMain from './components/PageMain'
  import { getGoodsList } from'@/api/goods/list/goods'
  export default {
  	components:{
  		PageHeader,
  		PageMain,
  		// BtnGroup
  	},
    data () {
    	return {
    		index:undefined,
    		pageTotal:null,
	        btnData:[
	        	 {
	            btnText:'全部商品',
	            num:1000
	          },
	          {
	            btnText:'售卖中',
	            num:1000
	          },
	          {
	            btnText:'已下架',
	            num:1000
	          },
	          {
	            btnText:'审核失败',
	            num:1000
	          },
	          {
	            btnText:'待审核',
	            num:1000
	          }

	        ],
	        tableData: [],
    	}
    },
    mounted(){
    	this.getData()
    },
    methods:{
    	getData(){
    		getGoodsList({ProductName:'',brandId:''},{pageNum:1,pageSize:5})
    		.then( res =>{
    				this.tableData = res.data.data
    				this.pageTotal = res.data.total
    		})
    	},
    	getType(index){
				this.index = index;
			},
			getKey(form){
				getGoodsList({productName:form.goodsName,brandId:form.brand},{pageNum:1,pageSize:5})
    		.then( res =>{
    			if(res.status == '1'){
    				this.tableData = res.data.data
    				this.pageTotal = res.data.total
    			}
    			form.goodsName = ''
    			form.cateGory = ''
    			form.brand = ''
    		})
			},
			// 上下分页
		currentChange(val){
		     getGoodsList({},{pageNum:val,pageSize:5})
				.then( res => {
					if(res.status == '1'){
						this.tableData = res.data.data
						this.pageTotal = res.data.total
					}

				})
		},
		// 每页显示多少条
		sizeChange(val){
		    getGoodsList({},{pageNum:1,pageSize:val})
				.then( res => {
						if(res.status == '1'){
						this.tableData = res.data.data
						this.pageTotal = res.data.total
					}
				})
		},
    }

  }
</script>

<style scoped lang="scss">

</style>

