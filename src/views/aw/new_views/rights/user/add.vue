<template>
  <div>
    <el-dialog
      title="添加"
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
          label="账号"
          prop="account">
          <el-input type="text" v-model="form.account"></el-input>
        </el-form-item>

        <el-form-item
          label="角色"
          prop="roleIds">
          <el-checkbox-group v-model="checkedRoleIds" @change="handleCheckedRoleChange">
            <el-checkbox  v-for="role in form.roleIds" :label="role.id" :key="role.id">{{role.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

       <el-form-item
         label="邮箱"
         prop="email">
         <el-input type="text" v-model="form.email"></el-input>
       </el-form-item>

        <el-form-item label="手机号" prop="telehone">
          <el-input type="text" v-model="form.telehone"></el-input>
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
  const MODULE_NAME = 'childUser'
  const REFRESH = 'childUserListRefresh'
  const SUBMIT = 'childUserSubmit'
  import {findPageList,insertInfo,deleteInfo,updateInfo,getEntityInfo} from '@/api/requestData'
  import util from '@/utils/util'
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
            addDialogFormVisible: false,
            dialogLoading: false,
            dialogStatus: '',
            imageUrl: '',
            className: 'hideMsg',
            city: '',
            checkedRoleIds:[],
            textMap: {
              update: '编辑',
              create: '添加'
            },
            form: {
              "account": "",
              "createTime": 0,
              "email": "",
              "headImage": "",
              "modifyTime": 0,
              "parentId": "",
              "password": "",
              "randomPassword": "",
              "roleIds": [],
              "roleIdsStr": "",
              "telehone": "",
              "userName": ""
            },
            rules:{
              account:[{required:true,message:"请填写",trigger:"blur"}],
              email:[{required:true,message:"请填写",trigger:"blur"}],
              telehone:[{required:true,message:"请填写",trigger:"blur"}],
            }
          }
      },
      methods:{
        handleCheckedRoleChange(value) {
          this.checkedRoleIds = value
          //console.log(this.checkedRoleIds)
        },
        create() {
          this.$refs.addForm.validate((valid) => {
            if (valid) {
              this.addDialogFormVisible = false
              let insertData = {...this.form};
              insertData.userName = insertData.account
              insertData.roleIds = this.checkedRoleIds
              insertData.roleIdsStr = this.checkedRoleIds.join()
              insertInfo(MODULE_NAME, insertData).then((res)=>{
                if(res.status){
                  this.$message.success('信息提交成功!')
                  this.$refs.addForm.resetFields();
                  this.$bus.emit(REFRESH,true)
                }else{
                  this.$message.error(res.tip)
                }

              }).catch(e=>{
                this.$message.error(e.toString())
              })
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
          findPageList('role',null,{pageSize:1000,pageNo:1}).then(res=>{
            this.form.roleIds = res.data.data
            console.log(this.form.roleIds)
          }).catch(e=>{

          })
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
