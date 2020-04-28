<template>
  <aw-container>
    <el-form v-model="form" :rules="rules" ref="form" label-position='right' label-width="130px">
      <el-form-item label="选择合同类型" prop="contract_type">
        <el-select v-model="form.contract_type">
          <el-option label="代理合同" value="1"></el-option>
          <el-option label="购销合同" value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="合同备注" prop="contract_comment">
        <el-input type="textarea" rows="5" v-model="form.contract_comment" placeholder="请输入合同备注">
        </el-input>
      </el-form-item>

      <el-form-item label="是否启用" prop="status">
        <el-switch v-model="form.status" inactive-value="0" active-color="#67C23A" active-value="1" @change="handleSwitch"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-upload
          class="upload-demo"
          ref="upload"
          action="/System/fileUpload.mvc"
        :on-change="getFiles"
        :data="addFilesDate"
        :file-list="fileList">
        <el-button size="small" type="primary">文档导入</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item label="文档预览区" prop="content">
        <aw-quill v-model="form.content" style="min-height: 300px"></aw-quill>
      </el-form-item>

      <el-form-item>
        <p style="text-align: left"><el-button type="success" size="mini" @click="handleCreate">确定</el-button></p>
        <aw-back title="取消" icon-class="icon-back-hidden" align="left" style="margin-top: -48px; margin-left: 70px;"></aw-back>
      </el-form-item>
    </el-form>
    </aw-container>
</template>

<script>
    export default {
        components:{
          d2Back: ()=>import('@/components/aw-back')
        },
        data() {
          return {
            addFilesDate:{},
            fileList:[],
            form:{
              contract_type:'',
              contract_comment: '',
              status: '',
              content: ''
            },
            rules:{
                contract_type:[{required:true,message:'请选择合同类型',trigger:'change'}],
                contract_comment: '',
                status: '',
                content: ''
            }
          }
        },
      methods:{
        handleCreate(){
          this.$refs.form.validate((valid)=>{
            if(valid){
                this.$message.success(JSON.stringify({...this.$refs.form}))
            }else{
              this.$message({message:'请检查填写!',type:"error"})
              return false;
            }
          })
        },
        handleSwitch(index){
          this.$message.success(index)
        },
        getFiles(file){
          this.$message.success(JSON.stringify(file))
        }
      }
    }
</script>

<style scoped>

</style>
