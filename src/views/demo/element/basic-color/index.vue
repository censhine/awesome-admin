<template>
  <aw-container>

    <h1 class="aw-mt-0">主色</h1>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="color color-primary">
          <aw-element-basic-color-info name="Blue" sass="$color-primary" color="#409EFF"/>
        </div>
      </el-col>
    </el-row>

    <h1>辅助色</h1>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="color color-info">
          <aw-element-basic-color-info name="Blue" sass="$color-primary" color="#409EFF"/>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="color color-success">
          <aw-element-basic-color-info name="Blue" sass="$color-primary" color="#409EFF"/>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="color color-warning">
          <aw-element-basic-color-info name="Blue" sass="$color-primary" color="#409EFF"/>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="color color-danger">
          <aw-element-basic-color-info name="Blue" sass="$color-primary" color="#409EFF"/>
        </div>
      </el-col>
    </el-row>

    <h1>中性色</h1>
    <el-row :gutter="20" class="aw-mb">
      <el-col :span="6">
        <div class="color color-text-main">
          <aw-element-basic-color-info name="Blue" sass="$color-primary" color="#409EFF"/>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="color color-text-normal">
          <aw-element-basic-color-info name="Blue" sass="$color-primary" color="#409EFF"/>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="color color-text-sub">
          <aw-element-basic-color-info name="Blue" sass="$color-primary" color="#409EFF"/>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="color color-text-placehoder">
          <aw-element-basic-color-info name="Blue" sass="$color-primary" color="#409EFF"/>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="color color-border-1">
          <aw-element-basic-color-info theme="dark" name="Blue" sass="$color-primary" color="#409EFF"/>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="color color-border-2">
          <aw-element-basic-color-info theme="dark" name="Blue" sass="$color-primary" color="#409EFF"/>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="color color-border-3">
          <aw-element-basic-color-info theme="dark" name="Blue" sass="$color-primary" color="#409EFF"/>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="color color-border-4">
          <aw-element-basic-color-info theme="dark" name="Blue" sass="$color-primary" color="#409EFF"/>
        </div>
      </el-col>
    </el-row>

  </aw-container>
</template>

<script>
export default {
  components: {
    'aw-element-basic-color-info': () => import('./components/info.vue')
  },
  data () {
    return {
      filename: __filename
    }
  }
}
</script>

<style lang="scss" scoped>
.color {
  border-radius: 4px;
  height: 90px;
}

.color-primary {
  background-color: $color-primary;
}

.color-info {
  background-color: $color-info;
}
.color-success {
  background-color: $color-success;
}
.color-warning {
  background-color: $color-warning;
}
.color-danger {
  background-color: $color-danger;
}

.color-text-main {
  background-color: $color-text-main;
}
.color-text-normal {
  background-color: $color-text-normal;
}
.color-text-sub {
  background-color: $color-text-sub;
}
.color-text-placehoder {
  background-color: $color-text-placehoder;
}

.color-border-1 {
  background-color: $color-border-1;
}
.color-border-2 {
  background-color: $color-border-2;
}
.color-border-3 {
  background-color: $color-border-3;
}
.color-border-4 {
  background-color: $color-border-4;
}
</style>
