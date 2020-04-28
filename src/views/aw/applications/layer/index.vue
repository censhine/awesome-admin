<template>
  <aw-container :is-back-to-top="true">
    <page-header
      slot="header"
      :loading="loading"
      :cat-data="cat"
      @submit="handleSubmit"
      ref="header"/>

    <page-main
      :loading="loading"
      :cat-data="cat"
      :table-data="table"
      @sort="handleSort"
      @refresh="handleRefresh"/>

    <!--    <pagination :pageTotal="page.total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"></pagination>-->
    <page-footer
      slot="footer"
      :loading="loading"
      :current="page.current"
      :size="page.size"
      :total="page.total"
      @change="handlePaginationChange"/>
  </aw-container>
</template>

<script>
  import util from '@/utils/util'
  import { getBrandList } from '@/api/goods/brand'
  import { getGoodsCategoryList } from '@/api/goods/category'

  export default {
    components: {
      'PageHeader': () => import('./components/PageHeader'),
      'PageMain': () => import('./components/PageMain'),
      'PageFooter': () => import('@/layout/header-aside/components/footer')
    },
    data() {
      return {
        loading: true,
        cat: [],
        table: [
          {id:10001,user_name:"windr",nick_name:"张少华",phone:18523232323,area:"广东深圳",industry:"美食",create_time:"2020-04-28 10:10:10",status:"0"},
          {id:10002,user_name:"windr",nick_name:"张少华",phone:18523232323,area:"广东广州",industry:"电子产品",create_time:"2020-04-28 10:10:10",status:"0"},
          {id:10003,user_name:"windr",nick_name:"张少华",phone:18523232323,area:"广东深圳",industry:"美食",create_time:"2020-04-28 10:10:10",status:"1"},
          {id:10004,user_name:"windr",nick_name:"张少华",phone:18523232323,area:"广东深圳",industry:"电子产品",create_time:"2020-04-28 10:10:10",status:"2"},
          {id:10005,user_name:"windr",nick_name:"张少华",phone:18523232323,area:"广东深圳",industry:"美食",create_time:"2020-04-28 10:10:10",status:"0"},
        ],
        page: {
          current: 1,
          size: 0,
          total: 0
        },
        order: {
          order_type: undefined,
          order_field: undefined
        }
      }
    },
    mounted() {
      Promise.all([
        getGoodsCategoryList(null),
        this.$store.dispatch('awadmin/db/databasePage', { user: true })
      ])
        .then(res => {
          //this.cat = util.formatDataToTree(res[0].data, 'goods_category_id')
          this.page.size = res[1].get('size').value() || 25
        })
        .then(() => {
          this.handleSubmit()
        })
    },
    methods: {
      // 刷新列表页面
      handleRefresh(isTurning = false) {
        if (isTurning) {
          !(this.page.current - 1) || this.page.current--
        }

        this.$nextTick(() => {
          this.$refs.header.handleFormSubmit()
        })
      },
      // 上下分页
      handleCurrentChange(val){
        this.page.current = val;
        this.getMessages()
      },
      // 每页显示多少条
      handleSizeChange(val){
        this.page.limit = val;
        this.getMessages()
      },
      // 分页变化改动
      handlePaginationChange(val) {
        this.page = val
        this.$nextTick(() => {
          this.$refs.header.handleFormSubmit()
        })
      },
      getMessages(){
        let param = Object.assign({},this.page)
        getGoodsCategoryList(param).then(res => {
          console.log(res)
          this.loading = false;
          this.page.total = res.data.total;
          //this.table = res.data.items;
        })
      },
      // 排序刷新
      handleSort(val) {
        this.order = val
        this.$nextTick(() => {
          this.$refs.header.handleFormSubmit()
        })
      },
      // 提交查询请求
      handleSubmit(form, isRestore = false) {
        if (isRestore) {
          this.page.current = 1
        }
        console.log(form);
        this.loading = true
        getBrandList({
          ...form,
          ...this.order,
          ...this.order,
          page_no: this.page.current,
          page_size: this.page.size
        })
          .then(res => {
            //this.table = res.data.items || []
            this.page.total = res.data.total_result
          })
          .finally(() => {
            this.loading = false
          })
      }
    }
  }
</script>
