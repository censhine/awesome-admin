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
        label-width="80px"
        ref="addForm">
        <el-form-item
          label="标题"
          prop="title">
          <el-input
            v-model="form.title"
            placeholder="请输入标题"
            ></el-input>
        </el-form-item>

        <el-form-item
          label="链接地址"
          prop="link">
          <el-input
            v-model="form.link"
            placeholder="请输入链接地址"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="排序"
          prop="order">
          <el-input
            type="number"
            v-model="form.order"
            placeholder="请输入排序值"
          ></el-input>
        </el-form-item>

        <el-form-item prop="logo" label="轮播图">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-form-item__error" :class="className">
              请上传轮播图
            </div>
          </el-upload>
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
            textMap: {
              update: '编辑',
              create: '添加'
            },
            form: {
              title: '',
              link: '',
              order: ''
            },
            rules:{
                title:[{required:true,message:"请填写标题",trigger:"blur"}],
                link:[{required:true,message:"请填写链接",trigger:"blur"}],
                order:[{required:true,message:"请填写排序值",trigger:"blur"}],
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
