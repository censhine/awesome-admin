<template>
  <aw-container>
    <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="120px" size="mini">
      <el-form-item :label="label" size="mini">
        <el-input v-model="ruleForm.category_name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认提交</el-button>
        <el-button @click="onBack">取消</el-button>
      </el-form-item>
    </el-form>
  </aw-container>
</template>

<script>
  export default {
    data() {
      return {
        label: this.$route.query.key>0 ? '子分类名称':'类别名称',
        ruleForm: {
          category_name: '',
        },
        rules: {
          category_name: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]}
      }
    },
    methods: {
      onSubmit() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm() {
        this.$refs.ruleForm.resetFields();
      },
      onBack(){
        this.$router.go(-1)
      }
    }
  }
</script>
