<template>
  <div>
    <el-dialog
      :title="textMap['create']"
      :visible.sync="veryDialogFormVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      width="600px">
      <el-form
        :model="form"
        :rules="rules"
        label-width="80px"
        ref="verifyForm">

        <el-form-item
          label="审核"
          prop="verify">
          <el-radio-group v-model="form.verify">
            <el-radio label="1">通过</el-radio>
            <el-radio label="2">不通过</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item prop="reason">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入不通过的理由"
            v-model="form.reason">
          </el-input>
        </el-form-item>

        <div class="dialog-footer">
          <el-button
            @click="veryDialogFormVisible = false"
            size="small">取消</el-button>

          <el-button
            type="primary"
            :loading="dialogLoading"
            @click="create"
            size="small">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        props:{
          formData: {
            type: Object,
            default(){

            }
          }
        },
        data(){
          return {
            veryDialogFormVisible: false,
            dialogLoading: false,
            dialogStatus: '',
            textMap: {
              update: '编辑审核',
              create: '审核'
            },
            form: {
              verify: '',
              reason: ''
            },
            rules:{
                verify:[{required:true,message:"请选择审核状态",trigger:"change"}]
            }
          }
        },
      methods:{
          create(){
            this.$refs.verifyForm.validate((valid) => {
              if (valid) {
                if(this.form.verify == 2 && this.form.reason == ""){
                  this.$message({message:'请填写不通过的理由!',type:"error"})
                  return false
                }
                this.veryDialogFormVisible = false
                this.$message({message:'信息提交成功!'+JSON.stringify({...this.form}),type:"success"})
                this.$refs.verifyForm.resetFields()
              } else {
                this.$message({message:'请检查填写!',type:"error"})
                return false;
              }
            });
          },
          isShowDia(parentToChildData, isVisible){
          if (!parentToChildData) {
            return
          }
          if(this.$refs.verifyForm){
            this.$refs.verifyForm.clearValidate()
          }
          this.veryDialogFormVisible = isVisible
        }
      }
    }
</script>

<style scoped>
.dialog-footer{
  text-align: right;
}
</style>
