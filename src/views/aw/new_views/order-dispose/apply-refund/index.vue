<template>
  <aw-container>
<!--  	   <btn-group-->
<!--        :btns='btnData'-->
<!--        @selectBtn='getType'-->
<!--			  :zIndex='index'-->
<!--			>-->
<!--		</btn-group>-->
		<page-header
	  		@getKeys='getKey'
	  		>
  		</page-header>
    	<page-main
			:tableData='tableData'
			:pageTotal='pageTotal'
			@currentChange="currentChange"
	   	@sizeChange="sizeChange"
			>
		</page-main>
  </aw-container>
</template>

<script>
  import {getAxiosApi} from '@/api/requestData'
  import BtnGroup from '@/components/btn-group'
  import PageHeader from'./components/PageHeader'
  import PageMain from'./components/PageMain'
  export default {
  	components:{
  		BtnGroup,
  		PageHeader,
  		PageMain
  	},
    mounted() {
  	  this.getData()
    },
    data () {
      return {
      	index:undefined,
      	pageTotal:0,
    		incomePayData:{
				page:1,
				limit:25,
				name:'',
			},
        search:{
          serviceNum:'',
          applyTimeStart:'',
          applyTimeEnd:'',
          status:''
        },
        btnData:[
          {
            btnText:'全部',
            status:'',
            num:0
          },
          {
            btnText:'待处理',
            status: 1,
            num:0
          },
          {
            btnText:'已处理',
            status: 2,
            num:0
          },
          {
            btnText:'已拒绝',
            status: -1,
            num:0
          }
        ],
        tableData: []
      }
    },
    methods: {
  	  getData(){
        getAxiosApi('/supply/web/refundApply/findPage',{status:this.search.status,orderId:this.search.serviceNum},{applyTimeStart:this.search.applyTimeStart,applyTimeEnd:this.search.applyTimeEnd,pageSize:this.incomePayData.limit,pageNo:this.incomePayData.page})
          .then( res =>{
          this.tableData = res.data.data
          this.pageTotal = res.data.total
        }).catch(_=>{})
      },
      getType(index){
        console.log(index);
        this.index = index;
        this.search.status = index
        this.getData()
      },
      getKey(key){
        //console.log(key);
        this.search= {
          status: key.status,
          orderId: key.serviceNum,
          applyTimeStart: (new Date(key.date[0])).getTime(),
          applyTimeEnd: (new Date(key.date[1])).getTime(),
        }
      	this.getData()
    },
    // 上下分页
		currentChange(val) {
		    this.incomePayData.page = val;
		    this.getData()
		},
		// 每页显示多少条
		sizeChange(val){
      this.incomePayData.limit = val;
      this.getData()
		}
   }
  }
</script>

<style scoped lang="scss">
.page{
	margin-top: 40px;
}

</style>

