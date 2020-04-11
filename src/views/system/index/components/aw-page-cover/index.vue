<template>
  <div class="aw-page-cover">
    <div class="aw-page-cover__logo">
      <slot/>
    </div>
    <p class="aw-page-cover__title">AWESOME Admin {{$version}}</p>
    <p class="aw-page-cover__sub-title">优雅的中后台集成方案</p>
    <p class="aw-page-cover__build-time">FINAL BUILD TIME {{$buildTime}}</p>
    <slot name="footer"/>
  </div>
</template>

<style lang="scss" scoped>
.aw-page-cover {
  @extend %full;
  @extend %unable-select;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  .aw-page-cover__logo {
    img {
      width: 200px;
    }
  }
  .aw-page-cover__title {
    margin: 0px;
    margin-bottom: 20px;
    font-weight: bold;
    color: $color-text-main;
  }
  .aw-page-cover__sub-title {
    margin: 0px;
    margin-bottom: 5px;
    color: $color-text-normal;
  }
  .aw-page-cover__build-time {
    margin: 0px;
    margin-bottom: 10px;
    font-size: 12px;
    color: $color-text-placehoder;
  }
}
</style>
