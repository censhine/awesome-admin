<template>
  <aw-container>
    <template slot="header">自定义操作列</template>
    <aw-crud
      :columns="columns"
      :data="data"
      :rowHandle="rowHandle"
      @custom-emit-1="handleCustomEvent">
    </aw-crud>
    <el-card shadow="never" class="aw-mb">
      <aw-markdown :source="doc"/>
    </el-card>
    <el-card shadow="never" class="aw-mb">
      <aw-highlight :code="code"/>
    </el-card>
    <aw-link-btn
      slot="footer"
      title="文档"
      link="https://d2.pub/zh/doc/aw-crud-v2"/>
  </aw-container>
</template>

<script>
import '../install'
import doc from './doc.md'
import code from './code.js'

export default {
  data () {
    return {
      doc,
      code,
      columns: [
        {
          title: '日期',
          key: 'date'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '地址',
          key: 'address'
        }
      ],
      data: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      rowHandle: {
        custom: [
          {
            text: '自定义按钮',
            type: 'warning',
            size: 'small',
            emit: 'custom-emit-1'
          }
        ]
      }
    }
  },
  methods: {
    handleCustomEvent ({ index, row }) {
      console.log(index)
      console.log(row)
    }
  }
}
</script>
