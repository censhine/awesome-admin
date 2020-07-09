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
          label="部门名称"
          prop="depart_name">
          <el-input type="text" placeholder="请输入部门名称" v-model="form.depart_name"></el-input>
        </el-form-item>

        <el-form-item
          label="职能描述"
          prop="depart_desc">
          <el-input type="textarea" rows="3" placeholder="请输入职能描述" v-model="form.job_desc"></el-input>
        </el-form-item>

        <el-form-item
          label="是否启用"
          prop="verify">
          <template slot-scope="scope">
            <el-switch inactive-value="0" active-value="1" v-model="form.status"></el-switch>
          </template>
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
        default() {

        }
      }
    },
    data(){
      return {
        veryDialogFormVisible: false,
        dialogLoading: false,
        dialogStatus: '',
        status: '1',
        textMap: {
          update: '编辑部门',
          create: '添加部门'
        },
        form: {
          depart_name: '',
          job_desc: '',
          status: '1'
        },
        rules:{
          depart_name:[{required:true,message:"请填写",trigger:"change"}],
        }
      }
    },
    methods:{
      create(){
        this.$refs.verifyForm.validate((valid) => {
          if (valid) {
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
        if(parentToChildData.dialogStatus){
          this.textMap.create = this.textMap[parentToChildData.dialogStatus]
          this.form = parentToChildData
        }
        if(this.$refs.verifyForm){
          this.$refs.verifyForm.resetFields()
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
