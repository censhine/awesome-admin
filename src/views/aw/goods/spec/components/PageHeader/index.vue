<template>
  <el-form
    :inline="true"
    :model="form"
    ref="form"
    size="mini"
    @submit.native.prevent
    style="margin-bottom: -18px;">
    <aw-header title="规格管理"></aw-header>
    <el-form-item label="所属模型" prop="goods_type_id">
      <el-select
        v-show="typeData.length"
        v-model="form.goods_type_id"
        placeholder="请选择"
        clearable
        value="">
        <el-option
          v-for="(item, index) in typeData"
          :key="index"
          :label="item.type_name"
          :value="item.goods_type_id"/>
      </el-select>
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
export default {
  props: {
    loading: {
      default: false
    },
    typeId: {
      default: null
    },
    typeData: {
      default: () => []
    }
  },
  data() {
    return {
      form: {
        goods_type_id: undefined
      }
    }
  },
  watch: {
    typeId: {
      handler(val) {
        this.form.goods_type_id = val
      },
      immediate: true
    }
  },
  methods: {
    handleFormSubmit(isRestore = false) {
      this.$emit('submit', this.form, isRestore)
    },
    handleFormReset() {
      this.form.goods_type_id = undefined
    }
  }
}
</script>
