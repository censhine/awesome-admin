<template>
  <d2-container :is-back-to-top="true">
    <page-main
      :loading="loading"
      :tree-data="tree"
      @refresh="handleRefresh"
      ref="main"/>
  </d2-container>
</template>

<script>
import util from '@/utils/util'
import axios from 'axios'
//import { getGoodsCategoryList } from '@/api/goods/category'
import { getCateList } from '@/api/goods/category'
export default {
  name: 'zis-goods-category',
  components: {
    'PageMain': () => import('./components/PageMain')
  },
  data() {
    return {
      tree: [],
      loading: true
    }
  },
  mounted() {
    this.handleSubmit()
  },
  methods: {
    // 重新载入页面
    handleRefresh() {
      this.$nextTick(() => {
        this.handleSubmit()
      })
    },
    // 提交查询请求
    handleSubmit() {
      this.loading = true
      axios.get('/category.json').then(res=>{
        this.tree = util.formatDataToTree(res.data, 'goods_category_id')
        if (this.$refs.main) {
          this.$refs.main.filterText = ''
          this.$refs.main.resetForm()
          this.$refs.main.resetElements()
        }
      }).finally(()=>{
        this.loading = false
      })

      // getCateList(null)
      //   .then(res => {
      //     console.log(res);
      //     this.tree = util.formatDataToTree(res.data, 'goods_category_id')
      //     if (this.$refs.main) {
      //       this.$refs.main.filterText = ''
      //       this.$refs.main.resetForm()
      //       this.$refs.main.resetElements()
      //     }
      //   }).catch((e)=>{
      //   console.log(e);
      // })
      //   .finally(() => {
      //     this.loading = false
      //   })
    }
  }
}
</script>
