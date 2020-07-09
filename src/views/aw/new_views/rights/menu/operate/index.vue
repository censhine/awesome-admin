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
     />

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
const MODULE_NAME = 'menu'
const REFRESH = 'menuListRefresh'
const SUBMIT = 'menuSubmit'
import {findPageList,insertInfo,deleteInfo,updateInfo,getEntityInfo,getTreeList} from '@/api/requestData'
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
      table:[],
      page: {
        current: 1,
        size: 1000,
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
      getTreeList(MODULE_NAME,null,null),
      this.$store.dispatch('awadmin/db/databasePage', { user: true })
    ])
      .then(res => {
        this.page.size = res.pageSize || 1000
      })
      .then(() => {
        this.handleSubmit()
      })

    this.$bus.on(REFRESH,(args)=>{
      this.handleRefresh(args)
    })
    this.$bus.on(SUBMIT,(args)=>{
      this.handleSubmit(args)
    })
  },
  methods: {
    // 刷新列表页面
    handleRefresh(isTurning = false) {
      if (isTurning) {
        !(this.page.current - 1) || this.page.current--
      }
      // this.$nextTick(() => {
      //   this.$refs.header.handleFormSubmit()
      // })
      this.handleSubmit({},true)
    },
    // 分页变化改动
    handlePaginationChange(val) {
      this.page = val
      this.handleSubmit({},true)
      // this.$nextTick(() => {
      //   this.$refs.header.handleFormSubmit()
      // })
    },
    // 排序刷新
    handleSort(val) {
      this.order = val
      this.$nextTick(() => {
        this.$refs.header.handleFormSubmit()
      })
    },
    handleFormSubmit(form){
      this.handleSubmit(form,true)
    },
    // 提交查询请求
    handleSubmit(form, isRestore = false) {
      if (isRestore) {
        this.page.current = 1
      }
      this.loading = true
      getTreeList(MODULE_NAME,{
        ...form,
        ...this.order,
      },{
        pageNo: this.page.current,
        pageSize: this.page.size
      })
        .then(res => {
          this.table = res.data || []
          this.page.total = res.data.total
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
