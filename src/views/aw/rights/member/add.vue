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
          label="成员名称"
          prop="user_name">
          <el-input type="text" placeholder="请输入成员名称" v-model="form.user_name"></el-input>
        </el-form-item>

        <el-form-item
          label="成员姓名"
          prop="real_name">
          <el-input placeholder="请输入成员姓名" v-model="form.real_name"></el-input>
        </el-form-item>

        <el-form-item
          label="手机号码"
          prop="phone">
          <el-input placeholder="请输入手机号码" v-model="form.phone"></el-input>
        </el-form-item>

        <el-form-item
          label="所属部门"
        >
          <el-select v-model="form.depart">
            <el-option label="供应商" value="1"></el-option>
            <el-option label="代理商" value="2"></el-option>
            <el-option label="普通用户" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="登录密码"
          >
          <el-input placeholder="请输入登录密码" v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item
          label="确认密码"
          >
          <el-input placeholder="请输入确认密码" v-model="form.repassword"></el-input>
        </el-form-item>

        <el-form-item
          label="备注信息"
          prop="remarks">
          <el-input type="textarea" rows="3" placeholder="请输入备注信息" v-model="form.remarks"></el-input>
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
        status: '',
        textMap: {
          update: '编辑成员',
          create: '添加成员'
        },
        form: {
          user_name: '',
          real_name: '',
          phone:'',
          depart: 1,
          password:'',
          repassword:'',
          remarks:''
        },
        rules:{
          user_name:[{required:true,message:"请填写",trigger:"blur"}],
          real_name:[{required:true,message:"请填写",trigger:"blur"}],
          phone:[{required:true,message:"请填写",trigger:"blur"}],
          depart:[{required:true,message:"请填写",trigger:"blur"}],
          password:[{required:true,message:"请填写",trigger:"blur"}],
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
