<template>
  <div class="aw-panel-search-item" :class="hoverMode ? 'can-hover' : ''" flex>
    <div class="aw-panel-search-item__icon" flex-box="0">
      <div class="aw-panel-search-item__icon-box" flex="main:center cross:center">
        <aw-icon v-if="item.icon" :name="item.icon"/>
        <aw-icon-svg v-else-if="item.iconSvg" :name="item.iconSvg"/>
        <aw-icon v-else name="file-o"/>
      </div>
    </div>
    <div class="aw-panel-search-item__info" flex-box="1" flex="dir:top">
      <div class="aw-panel-search-item__info-title" flex-box="1" flex="cross:center">
        <span>{{item.title}}</span>
      </div>
      <div class="aw-panel-search-item__info-fullTitle" flex-box="0">
        <span>{{item.fullTitle}}</span>
      </div>
      <div class="aw-panel-search-item__info-path" flex-box="0">
        <span>{{item.path}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      default: () => ({})
    },
    hoverMode: {
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.aw-panel-search-item {
  height: 64px;
  margin: 0px -20px;
  &.can-hover {
    @extend %unable-select;
    margin: 0px;
    &:hover {
      background-color: #F5F7FA;
      .aw-panel-search-item__icon {
        .aw-panel-search-item__icon-box {
          i {
            font-size: 24px;
            color: $color-primary;
          }
        }
      }
      .aw-panel-search-item__info {
        .aw-panel-search-item__info-title {
          color: $color-text-main;
        }
        .aw-panel-search-item__info-fullTitle {
          color: $color-text-normal;
        }
        .aw-panel-search-item__info-path {
          color: $color-text-normal;
        }
      }
    }
  }
  .aw-panel-search-item__icon {
    width: 64px;
    .aw-panel-search-item__icon-box {
      height: 64px;
      width: 64px;
      border-right: 1px solid $color-border-3;
      i {
        font-size: 20px;
        color: $color-text-sub;
      }
      svg {
        height: 20px;
        width: 20px;
      }
    }
  }
  .aw-panel-search-item__info {
    margin-left: 10px;
    .aw-panel-search-item__info-title {
      font-size: 16px;
      line-height: 16px;
      font-weight: bold;
      color: $color-text-normal;
    }
    .aw-panel-search-item__info-fullTitle {
      font-size: 10px;
      line-height: 14px;
      color: $color-text-placehoder;
    }
    .aw-panel-search-item__info-path {
      margin-bottom: 4px;
      font-size: 10px;
      line-height: 14px;
      color: $color-text-placehoder;
    }
  }
}
</style>
