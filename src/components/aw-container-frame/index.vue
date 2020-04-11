<template>
  <aw-container v-bind="$attrs">
    <iframe
      class="aw-container-frame"
      :src="src"
      frameborder="0"/>
  </aw-container>
</template>

<script>
export default {
  name: 'aw-container-frame',
  props: {
    src: {
      type: String,
      required: false,
      default: 'https://d2.pub/zh/doc/aw-admin'
    }
  }
}
</script>

<style lang="scss" scoped>
.aw-container-frame {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
}
</style>
