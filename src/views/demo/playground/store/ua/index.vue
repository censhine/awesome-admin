<template>
  <aw-container>
    <p class="aw-mt-0">useragent</p>
    <el-input :value="uaData.ua"></el-input>
    <p>格式化数据 in vuex: state.awadmin.ua.data</p>
    <aw-highlight :code="uaStr"/>
  </aw-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('awadmin/ua', {
      uaData: 'data'
    }),
    uaStr () {
      const { browser, engine, os, device, cpu } = this.uaData
      return JSON.stringify({ browser, engine, os, device, cpu }, null, 2)
    }
  }
}
</script>
