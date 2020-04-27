<template>
  <div class="ease-sku-table">

    <el-table
      border
      size="mini"
      :data="lists"
      v-if="lists.length"
      :span-method="handleSpanMethod">
      <template v-for="(label, index) in columns">
        <!-- 为什么要判断label: 动态添加规格名的时候规格名不为undefiend时未动态显示, 没有看table-column实现暂时这么解决  -->
        <el-table-column
          v-if="label"
          :label="label"
          :key="index">
          <template slot-scope="scope">
            {{scope.row.skus[index] && scope.row.skus[index].v}}
          </template>
        </el-table-column>
      </template>

      <el-table-column
        prop="price"
        label="销售价格"
        width="160">
        <template slot-scope="scope">
          <el-input :precision="2" :min="0" controls-position="right" v-model="scope.row.price" size="mini"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="stock"
        label="商品库存"
        width="160">
        <template slot-scope="scope">
          <el-input :precision="2" :min="0" controls-position="right" v-model="scope.row.stock" size="mini"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="inventory_num"
        label="库存预警值"
        width="160">
        <template slot-scope="scope">
          <el-input :precision="2" :min="0" controls-position="right" v-model="scope.row.inventory_num" size="mini"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="sku"
        label="SKU编号"
        width="160">
        <template slot-scope="scope">
          <el-input :precision="2" :min="0" controls-position="right" v-model="scope.row.sku" size="mini"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="sort"
        label="排序"
        width="160">
        <template slot-scope="scope">
          <el-input :precision="2" :min="0" controls-position="right" v-model="scope.row.sort" size="mini"></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Vue from 'vue'
import { Table, TableColumn, InputNumber } from 'element-ui'
import { flatten } from '../utils'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(InputNumber)

export default {
  name: 'sku-table',

  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    // 需要附加的字段
    flatten: {
      type: Array,
      default () {
        return []
      }
    },
    // 自定义sku的id key
    optionValue: {
      type: String,
      default: 'id'
    },
    // 自定义sku的text key
    optionText: {
      type: String,
      default: 'text'
    }
  },

  data () {
    return {
      rowspan: [],
      lists: []
    }
  },

  computed: {
    filter () {
      return this.data.filter(item => item.text && item.leaf.length)
    },

    columns () {
      return this.filter.map(item => item[this.optionText])
    }
  },

  watch: {
    filter: {
      deep: true,
      immediate: true,
      handler () {
        this.lists = flatten(this.filter, this.flatten)
        this.computeRowspan()
      }
    },

    lists: {
      deep: true,
      immediate: true,
      handler (data) {
        this.$emit('on-change-data', data)
      }
    }
  },

  methods: {
    computeRowspan () {
      this.rowspan = []
      const rowspan = (index) => {
        let span = []
        let dot = 0

        this.lists.map((item, idx) => {
          if (idx === 0) {
            span.push(1)
          } else {
            if (item.skus[index].v === this.lists[idx - 1].skus[index].v) {
              span[dot] += 1
              span.push(0)
            } else {
              dot = idx
              span.push(1)
            }
          }
        })

        this.rowspan.push(span)
      }

      this.filter.map((item, index) => {
        rowspan(index)
      })
    },

    handleSpanMethod ({ row, column, rowIndex, columnIndex }) {
      for (let i = 0; i < this.filter.length; i++) {
        if (columnIndex === i) {
          if (this.rowspan[i] && this.rowspan[i][rowIndex]) {
            return {
              rowspan: this.rowspan[i][rowIndex],
              colspan: 1
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }
      }
    }
  }
}
</script>
