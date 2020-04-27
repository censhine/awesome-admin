<template>
  <p :style="{textAlign: align,paddingBottom: '15px'}">
    <el-button
      @click="handleCloseTab"
      size="mini"
      type="default"
    ><i class="el-icon-arrow-left"/> {{title}}</el-button>
  </p>
</template>

<script>
  import { mapActions, mapState} from 'vuex'
    export default {
      props:{
        title:{
          type: String,
          default: '返回'
        },
        align:{
          type: String,
          default: {
            textAlign: 'left'
          }
        }
      },
      computed: {
        ...mapState('awadmin/page', [
          'opened',
          'current' //用户获取当前页面的地址，用于关闭
        ])
      },
      methods:{
        ...mapActions('awadmin/page', [
          'close',
        ]),
        handleCloseTab(){
          this.close({tagName:this.current});
          this.$router.go(-1)
        }
      }
    }
</script>

<style scoped>

</style>
