<template>
  <div class="aw-header">
    <h2 class="tip">{{title}}</h2>
  </div>
</template>

<script>
    export default {
        props:{
          title: String,
          required: true
        }
    }
</script>

<style scoped lang="scss">
  .aw-header{
    .tip {
      font-weight: 500;
      padding: 8px 8px;
      background-color: #ededed;
      border-radius: 4px;
      border-left: 5px solid $color-primary;
      margin: 0 0 20px 0;
    }
  }
</style>
