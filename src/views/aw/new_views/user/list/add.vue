<template>
  <div>
    <el-dialog
      :title="textMap['create']"
      :visible.sync="addDialogFormVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      width="600px">
      <el-form
        :model="form"
        :rules="rules"
        label-width="120px"
        ref="addForm">
        <el-form-item
          label="手机号码"
          prop="phone">
          <el-input
            v-model="form.phone"
            placeholder="请输入手机号"
            ></el-input>
        </el-form-item>

        <el-form-item
          label="角色类型"
          prop="role">
          <el-select v-model="form.role">
            <el-option label="普通用户" value="1"></el-option>
            <el-option label="商家" value="2"></el-option>
            <el-option label="供应商" value="3"></el-option>
            <el-option label="律师" value="4"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="性别"
          prop="sex">
          <el-radio-group v-model="form.sex">
            <el-radio label="保密" value="0"></el-radio>
            <el-radio label="男" value="1"></el-radio>
            <el-radio label="女" value="2"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="生日"
          prop="birthday"
          >
          <el-date-picker v-model="form.birthday"></el-date-picker>
        </el-form-item>

        <el-form-item
          label="城市"
          prop="city"
        >
          <el-cascader v-model="city" :options="[{label:'广东省',value:1,children:[{label:'深圳市',value:1},{label:'广州市',value:2},{label:'东莞市',value:3},]}]"></el-cascader>
        </el-form-item>

        <el-form-item label="个性签名" prop="sign">
          <el-input rows="3" type="textarea" placeholder="请输入个性签名" v-model="form.sign"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input type="password" placeholder="请输密码" v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item label="确认密码">
          <el-input type="password" placeholder="请输确认密码" v-model="form.repassword"></el-input>
        </el-form-item>

        <el-form-item label="账户启用状态">
          <el-switch active-value="1" inactive-value="0" v-model="form.status"></el-switch>
        </el-form-item>

        <div class="dialog-footer">
          <el-button
            @click="addDialogFormVisible = false"
            size="small">取消</el-button>

          <el-button
            type="primary"
            :loading="dialogLoading"
            @click="create"
            size="small">保存</el-button>
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
            addDialogFormVisible: false,
            dialogLoading: false,
            dialogStatus: '',
            imageUrl: '',
            className: 'hideMsg',
            city: '',
            textMap: {
              update: '编辑',
              create: '添加'
            },
            form: {
              phone: '',
              sex: '',
              birthday: '',
              status: ''
            },
            rules:{
                phone:[{required:true,message:"请填写手机号",trigger:"blur"}],
                role:[{required:true,message:"请选择角色",trigger:"change"}],
                status:[{required:true,message:"请选择状态",trigger:"blur"}],
            }
          }
      },
      methods:{
          create(){
            this.$refs.addForm.validate((valid) => {
              if (valid) {
                this.addDialogFormVisible = false
                this.$message.success('信息提交成功!'+JSON.stringify({...this.form}))
                this.$refs.addForm.resetFields()
              } else {
                if(!this.imageUrl){
                  this.className = 'showMsg'
                  return
                }
                this.$message.error('请检查填写!')
                return false;
              }
            });
          },
          isShowDia(parentToChildData, isVisible){
          if (!parentToChildData) {
            return
          }
          if(this.$refs.addForm){
            this.className = 'hideMsg'
            this.$refs.addForm.clearValidate()
          }
          this.addDialogFormVisible = isVisible
        },
        handleAvatarSuccess(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
          if(this.imageUrl){
            this.className = 'hideMsg'
          }
        },
        beforeAvatarUpload(file) {
          const isIMG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif';
          const isLt2M = file.size / 1024 / 1024 < 2;
          if (!isIMG) {
            this.$message.error('上传头像图片只能是 JPG/JPEG/PNG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isIMG && isLt2M;
        }
      }
    }
</script>

<style scoped>
.showMsg{
  display: block;
}
.hideMsg{
  display: none;
}
.dialog-footer{
  text-align: right;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px solid #DCDFE6;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
