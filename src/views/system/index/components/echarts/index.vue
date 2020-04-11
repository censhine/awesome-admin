<template>
  <div v-if="chartData">
    <h2>{{chartData.title}}</h2>
    <ve-line :data="chartData"></ve-line>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VCharts from 'v-charts'
  Vue.use(VCharts)

  export default {
    name: 'echarts',
    props:{
      chartData:{
          type: Object,
          default(){

          }
        }
    }
  }
</script>
