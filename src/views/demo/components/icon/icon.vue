<template>
  <aw-container>
    <template slot="header">图标组件</template>
    <aw-icon class="aw-mr-10"/>
    <aw-icon name="github" class="aw-mr-10"/>
    <aw-icon name="github" style="font-size: 100px;" class="aw-mr-10"/>
    <aw-icon name="github" class="icon-demo"/>
  </aw-container>
</template>

<script>
export default {
  data () {
    return {
      filename: __filename
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-demo {
  transition: all .3s;
  font-size: 100px;
  color: #409EFF;
  @extend %unable-select;
  &:hover{
    color: #F56C6C;
    transform: scale(1.2) rotate(30deg);
  }
}
</style>
