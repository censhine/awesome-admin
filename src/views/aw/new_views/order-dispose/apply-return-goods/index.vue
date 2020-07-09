<template>
  <aw-container>
<!--  	<btn-group-->
<!--		:btns='btnData'-->
<!--		@selectBtn='getType'-->
<!--		:zIndex='index'-->
<!--		>-->
<!--	</btn-group>-->
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
          serveId:'',
          applyTimeStart:'',
          applyTimeEnd:'',
          date:'',
          keyWord:''
        },
      btnData:[
        {
          btnText:'全部申请',
          num:1000
        },
        {
          btnText:'待处理',
          num:1000
        },
        {
          btnText:'退货中',
          num:1000
        },
        {
          btnText:'已完成',
          num:1000
        },
        {
          btnText:'已拒绝',
          num:1000
        }],
        tableData: [{
          serviceNum: '131510',
          createTime: '2020-04-02 15:30:00',
          userAccount:'13612345678',
          returnAmount:'1000',
          contact:'小李子哦',
          applyStatus:'0',
          disposeTime:'2020-04-02 15:30:00',
        },
        {
            serviceNum: '182210',
            createTime: '2020-04-05 15:30:00',
            userAccount:'13874569856',
            returnAmount:'800',
            contact:'小六子呀',
            applyStatus:'2',
            disposeTime:'2020-04-02 15:30:00',
          }]
      }
    },
    mounted() {
        this.handleSubmit()
    },
    methods: {
  	  handleSubmit() {
        getAxiosApi('/supply/web/returnsApply/findPage',{serveId:this.search.serveId},{applyTimeStart:this.search.applyTimeStart,applyTimeEnd:this.search.applyTimeEnd,orderId:this.search.serviceNum,keyWord:this.search.keyWord,pageSize:this.incomePayData.limit,pageNo:this.incomePayData.page})
          .then( res =>{
            this.tableData = res.data
            this.pageTotal = res.data.total
          }).catch(_=>{})
      },
    	getType(index){
	        this.index = index
          this.handleSubmit()
	    },
	    getKey(key){
  	    this.search = key
        this.search.applyTimeStart =  (new Date(key.date[0])).getTime()
        this.search.applyTimeEnd =  (new Date(key.date[1])).getTime()
        this.handleSubmit()
	    },
    // 上下分页
		currentChange(val){
		    this.incomePayData.page = val
        this.handleSubmit()
		},
		// 每页显示多少条
		sizeChange(val){
		    this.incomePayData.limit = val
        this.handleSubmit()
		}
    }
  }
</script>

<style scoped lang="scss"></style>


