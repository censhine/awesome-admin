<template>
  <div class="header">
    <el-form
      :inline="true"
      :model="form"
      ref="form"
      size="mini"
      style="margin:20px 0 0px;padding: 20px 10px 0;background: #fff"
    >
      <el-form-item label="输入手机号：" prop="phone">
        <el-input
          clearable
          v-model="form.phone"
          placeholder="手机号"
          style="width: 140px;"/>
      </el-form-item>
      <el-form-item label="输入订单号：" prop="orderNo">
        <el-input
          clearable
          v-model="form.orderNo"
          placeholder="订单号"
          style="width: 140px;"/>
      </el-form-item>
      <el-form-item label="提交时间：" prop="date" >
        <el-date-picker
          v-model="form.date"
          type="daterange"
          style='width: 330px;'
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="handleFormSubmit">
          <aw-icon name="search"/>
          查询
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        form: {
          phone:'',
          orderNo:'',
          date:''
        },
      }
    },
    methods:{
      clearFields() {
        this.$refs.form.resetFields()
      },
      handleFormSubmit () {
        this.$emit('getKeys',this.form);
      }
    }
  }
</script>

<style>
</style>
