<template>
  <aw-container type="card">
    <template slot="header">
      当前状态 {{active ? '开启过渡动画' : '关闭过渡动画'}}
    </template>
    <el-button type="primary" @click="set(!active)">
      {{active ? '关闭页面过渡动画' : '打开页面过渡动画'}}
    </el-button>
  </aw-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('awadmin/transition', [
      'active'
    ])
  },
  methods: {
    ...mapActions('awadmin/transition', [
      'set'
    ])
  }
}
</script>
