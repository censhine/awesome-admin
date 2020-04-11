<template>
  <div class="aw-container-ghost">
    <div v-if="$slots.header" class="aw-container-ghost__header" ref="header">
      <slot name="header"/>
    </div>
    <div class="aw-container-ghost__body" ref="body">
      <slot/>
    </div>
    <div v-if="$slots.footer" class="aw-container-ghost__footer" ref="footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script>
import normal from './mixins/normal'

export default {
  name: 'aw-container-ghost',
  mixins: [normal],
  mounted() {
    // 增加滚动事件监听
    this.addScrollListener()
  },
  beforeDestroy() {
    // 移除滚动事件监听
    this.removeScrollListener()
  }
}
</script>
