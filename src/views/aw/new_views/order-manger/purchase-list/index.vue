<template>
  <aw-container>
<!--    <btn-group-->
<!--		:btns='btnData'-->
<!--		@selectBtn='getType'-->
<!--		:zIndex='index'-->
<!--		>-->
<!--	</btn-group>-->
	<page-header
      ref="header"
  		@getKeys='getKeys'
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
  import {getAxiosApi} from "@/api/requestData";
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
      	pageTotal:0,
    		page:{
          pageNum:1,
          pageSize:25,
			  },
        form:{
          orderNo:'',
          phone:'',
          startTime:'',
          endTime:'',
        },
        btnData:[
          {
            btnText:'全部订单',
            num:0
          },
          {
            btnText:'待发货',
            num:0
          },
          {
            btnText:'已发货',
            num:0
          },
          {
            btnText:'已完成',
            num:0
          },
          {
            btnText:'已关闭',
            num:0
          }
        ],
        tableData: [],
      }
    },
    mounted() {
  	  this.getData()
    },
    methods: {
  	  getData(){
        getAxiosApi('/supply/web/merchantOrder/list',{},{...this.form,...this.page}).then(res=>{
          this.$refs.header.clearFields()
          this.tableData = res.data.data
          this.pageTotal = res.data.total
        }).catch(_=>{})
      },
    //上下分页
		currentChange(val){
		    this.page.pageNum = val;
		    this.getData()
		},
		// 每页显示多少条
		sizeChange(val){
		  this.page.pageSize = val;
      this.getData()
		},
		//切换按钮（状态）
		getType(index){
			this.index = index;
		},
    getKeys(key){
      console.log(key.date);
        this.form = {
          orderNo:key.orderNo,
          phone:key.phone,
          startTime:!key.date[0] ? '' : (new Date(key.date[0])).getTime()*1000,
          endTime:!key.date[1] ? '' :(new Date(key.date[1])).getTime()*1000,
        }
      this.getData()
		}
    }
  }
</script>

<style scoped lang="scss">

</style>

