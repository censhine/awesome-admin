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
  const MODULE_NAME = 'childUser'
  const REFRESH = 'childUserListRefresh'
  const SUBMIT = 'childUserSubmit'
  import {findPageList,insertInfo,deleteInfo,updateInfo,getEntityInfo} from '@/api/requestData'
  export default {
    components: {
      'PageHeader': () => import('./components/PageHeader'),
      'PageMain': () => import('./components/PageMain'),
      'PageFooter': () => import('@/layout/header-aside/components/footer')
    },
    data() {
      return {
        loading: true,
        loadTimes: 0,
        cat: [],
        table:[],
        page: {
          current: 1,
          size: 25,
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
        findPageList(MODULE_NAME,{userName:this.$refs.header.form.userName},{pageSize:this.page.size,pageNo:this.page.current}),
        this.$store.dispatch('awadmin/db/databasePage', { user: true })
      ])
        .then(res => {
          this.page.size = res[0].data.pageSize || 25
        })
        .then(() => {
          this.handleRefresh(true)
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
        this.$nextTick(() => {
          this.$refs.header.handleFormSubmit()
        })
      },
      // 分页变化改动
      handlePaginationChange(val) {
        this.page = val
        this.$nextTick(() => {
          this.$refs.header.handleFormSubmit()
        })
      },
      childUserSubmit(){

      },
      handleFormSubmit(){

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
        this.loading = true
        findPageList(MODULE_NAME,{userName:this.$refs.header.form.userName},{pageSize:this.page.size,pageNo:this.page.current})
          .then(res => {
            this.table = res.data.data || []
            this.page.total = res.data.total
          })
          .finally(() => {
            this.loading = false
          })
      }
    }
  }
</script>
