<template>
  <aw-container class="page">
    <!--第一层数据表-->
    <div id="table-info1">
    <el-row>
      <el-col :span="8">
        <el-row class="aw-item-box">
          <el-col :span="8" class="aw-items-left">
            <i class="el-icon-platform-eleme"/>
          </el-col>
          <el-col :span="16" class="aw-items-right">
            <el-row class="name">在售商品数</el-row>
            <el-row class="count">889</el-row>
          </el-col>
        </el-row>
      </el-col>

      <el-col :span="8">
        <el-row class="aw-item-box">
          <el-col :span="8" class="aw-items-left">
            <i class="el-icon-user-solid"/>
          </el-col>
          <el-col :span="16" class="aw-items-right">
            <el-row class="name">今日订单总数</el-row>
            <el-row class="count">889</el-row>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row class="aw-item-box">
          <el-col :span="8" class="aw-items-left">
            <i class="el-icon-s-help"/>
          </el-col>
          <el-col :span="16" class="aw-items-right">
            <el-row class="name">今日交易总数</el-row>
            <el-row class="count">889</el-row>
          </el-col>
        </el-row>
      </el-col>
      </el-row>

    <el-row>
      <el-col :span="8">
        <el-row class="aw-item-box">
          <el-col :span="8" class="aw-items-left">
            <i class="el-icon-s-finance"/>
          </el-col>
          <el-col :span="16" class="aw-items-right">
            <el-row class="name">昨日交易总额</el-row>
            <el-row class="count">889</el-row>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row class="aw-item-box">
          <el-col :span="8" class="aw-items-left">
            <i class="el-icon-s-data"/>
          </el-col>
          <el-col :span="16" class="aw-items-right">
            <el-row class="name">近7日交易总额</el-row>
            <el-row class="count">889</el-row>
          </el-col>
        </el-row>
      </el-col>

    </el-row>
    </div>
    <!--第二层数据表-->
    <div id="table-info2">
    <el-row>
      <el-col :span="11" class="aw-bg-box">
        <el-row class="aw-item-title aw-darkgreay-bg">
          <el-col :span="24">订单总览</el-col>
        </el-row>
        <el-col :span="6">
          <p>123</p>
          <span>今日新增</span>
        </el-col>
        <el-col :span="6">
          <p>123</p>
          <span>昨日新增</span>
        </el-col>
        <el-col :span="6">
          <p>123</p>
          <span>本月新增</span>
        </el-col>
        <el-col :span="6">
          <p>123</p>
          <span>抢单总数</span>
        </el-col>
      </el-col>
      <el-col :span="11" class="aw-bg-box">
        <el-row class="aw-item-title aw-darkgreay-bg">
          <el-col :span="24">用户总览</el-col>
        </el-row>
          <el-col :span="6">
            <p>123</p>
            <span>今日新增</span>
          </el-col>
          <el-col :span="6">
            <p>123</p>
            <span>昨日新增</span>
          </el-col>
          <el-col :span="6">
            <p>123</p>
            <span>本月新增</span>
          </el-col>
          <el-col :span="6">
            <p>123</p>
            <span>抢单总数</span>
          </el-col>
      </el-col>
    </el-row>

      <el-row>
        <el-col :span="11" class="aw-bg-box">
          <el-row class="aw-item-title aw-darkgreay-bg">
            <el-col :span="24">商家总览</el-col>
          </el-row>
          <el-col :span="6">
            <p>123</p>
            <span>今日新增</span>
          </el-col>
          <el-col :span="6">
            <p>123</p>
            <span>昨日新增</span>
          </el-col>
          <el-col :span="6">
            <p>123</p>
            <span>本月新增</span>
          </el-col>
          <el-col :span="6">
            <p>123</p>
            <span>抢单总数</span>
          </el-col>
        </el-col>
        <el-col :span="11" class="aw-bg-box">
          <el-row class="aw-item-title aw-darkgreay-bg">
            <el-col :span="24">供应商总览</el-col>
          </el-row>
          <el-col :span="6">
            <p>123</p>
            <span>今日新增</span>
          </el-col>
          <el-col :span="6">
            <p>123</p>
            <span>昨日新增</span>
          </el-col>
          <el-col :span="6">
            <p>123</p>
            <span>本月新增</span>
          </el-col>
          <el-col :span="6">
            <p>123</p>
            <span>抢单总数</span>
          </el-col>
        </el-col>
      </el-row>

    </div>

    <div class="aw-margin-bottm-10">
      <echarts :chart-data="orderChartData"/>
    </div>

    <div class="aw-margin-bottm-10">
      <echarts :chart-data="transChartData"/>
    </div>

  </aw-container>
</template>

<script>
  import D2Badge from './components/aw-badge'
  import D2Help from './components/aw-help'
  import D2PageCover from './components/aw-page-cover'
  import Echarts from "./components/echarts/index";

  export default {
    components: {
      Echarts,
      D2Badge,
      D2Help,
      D2PageCover
    },
    data () {
      return {
        filename: __filename,
        orderChartData: {
            title: '订单统计',
            columns: ['日期', '访问用户', '下单用户', '下单率'],
            rows: [
              { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
              { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
              { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
              { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
              { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
              { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
            ]
        },
        transChartData: {
          title: '交易统计',
          columns: ['日期', '交易数', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  #table-info1{
    margin-bottom: 20px;
  }
  .page {
    .logo {
      width: 120px;
    }
    .btn-group {
      color: $color-text-placehoder;
      font-size: 12px;
      line-height: 12px;
      margin-top: 0px;
      margin-bottom: 20px;
      .btn-group__btn {
        color: $color-text-sub;
        &:hover {
          color: $color-text-main;
        }
        &.btn-group__btn--link {
          color: $color-primary;
        }
      }
    }
  }

  .aw-item-box{
    .aw-items-left{
      >i{
        font-size: 80px;
        color: $color-primary;
      }
    }
    height: 105px;
    border: 1px solid #ededed;
    padding: 10px;
    box-sizing: border-box;
    text-align: left;
    margin-right: 5px;
    margin-bottom: 10px;
    .name {
      margin-bottom: 10px;
      font-size: 16px;
      color: #555555;
    }
    .count{
      color: $color-primary;
      font-size: 15px;
    }
  }

  .aw-bg-box{
    border: 1px solid #ededed;
    margin: 5px 10px;
    text-align: center;
    box-sizing: border-box;
    padding: 3px 5px;
    .aw-item-title{
      text-align:left;
    }
  }

</style>
