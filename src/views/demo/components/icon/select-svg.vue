<template>
  <aw-container>
    <template slot="header">svg 图标选择器</template>
    <div class="aw-mb">
      <p class="aw-mt-0 aw-mb-10">一般用法 | {{icon || '未选择'}}</p>
      <aw-icon-svg-select v-model="icon"/>
    </div>
    <div class="aw-mb">
      <p class="aw-mt-0 aw-mb-10">用户可以输入 | {{icon2 || '未选择'}}</p>
      <aw-icon-svg-select v-model="icon2" :user-input="true"/>
    </div>
  </aw-container>
</template>

<script>
export default {
  data () {
    return {
      icon: '',
      icon2: ''
    }
  }
}
</script>
