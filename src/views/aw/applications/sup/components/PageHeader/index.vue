<template>
  <el-form
    :inline="true"
    :model="form"
    ref="form"
    size="mini"
    style="margin-bottom: -18px;">
    <aw-header title="供应商资料审核"></aw-header>
    <el-form-item label="用户账号" prop="name">
      <el-input
        v-model="form.name"
        prefix-icon="el-icon-search"
        placeholder="用户ID/用户账号"
        @keyup.enter.native="handleFormSubmit(true)"
        style="width: 200px;"
        :clearable="true"/>
    </el-form-item>

    <el-form-item label="地区">
      <Address :props-options="propsOptions" v-model="form.address" @getAddress="_getAddress"/>
    </el-form-item>

    <el-form-item label="提交时间">
      <el-date-picker
        v-model="form.submitDate"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions">
      </el-date-picker>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        icon="el-icon-search"
        :disabled="loading"
        @click="handleFormSubmit(true)">查询</el-button>
    </el-form-item>

    <el-form-item>
      <el-button
        icon="el-icon-refresh"
        @click="handleFormReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Address from '@/components/aw-address'

export default {
  props: {
    loading: {
      default: false
    },
    catData: {
      default: () => []
    }
  },
  data() {
    return {
      propsOptions: { checkStrictly: true },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: '',
      form: {
        name: undefined,
        address: undefined,
        submitDate: undefined
      },
      catProps: {
        value: 'goods_category_id',
        label: 'name',
        children: 'children',
        checkStrictly: true,
        emitPath: false
      }
    }
  },
  methods: {
    handleFormSubmit(isRestore = false) {
      this.$emit('submit', this.form, isRestore)
    },
    _getAddress(addr){
      this.form.address = addr
    },
    handleFormReset() {
      this.$refs.form.resetFields()
    }
  },
  components:{
    Address
  }
}
</script>
