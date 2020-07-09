<template>
  <div>
    <el-dialog
      title="查看"
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
          label="上级菜单"
          prop="role">
          <el-select v-model="form.parent_menu">
            <el-option label="资料审核管理" value="1"></el-option>
            <el-option label="商品管理" value="2"></el-option>
            <el-option label="用户管理" value="3"></el-option>
            <el-option label="合同管理" value="4"></el-option>
            <el-option label="库存管理" value="5"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="类型"
          prop="type">
          <el-radio-group v-model="form.type">
            <el-radio label="菜单" value="0"></el-radio>
            <el-radio label="按钮" value="1"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="排序"
          prop="sort">
          <el-input type="number" v-model="form.sort"></el-input>
        </el-form-item>

        <el-form-item label="菜单路径" prop="path">
          <el-input type="text" placeholder="请输入菜单路径" v-model="form.path"></el-input>
        </el-form-item>

        <el-form-item
          label="赋权角色"
          prop="role">
          <el-select v-model="form.role">
            <el-option label="管理员" value="1"></el-option>
            <el-option label="管理员1" value="2"></el-option>
            <el-option label="管理员2" value="3"></el-option>
            <el-option label="管理员3" value="4"></el-option>
            <el-option label="管理员3" value="5"></el-option>
          </el-select>
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
          parent_menu: '合同管理',
          role: '管理员1',
          type: '菜单',
          sort: '1',
          path: 'zis/menu/list',
        },
        rules:{
          parent_menu:[{required:true,message:"请填写手机号",trigger:"change"}],
          type:[{required:true,message:"请选择类型",trigger:"change"}],
          path:[{required:true,message:"请填写路径",trigger:"blur"}],
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
        const isIMG = file.type === 'image/jpeg'
          || file.type === 'image/jpg'
          || file.type === 'image/png'
          || file.type === 'image/gif';
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
