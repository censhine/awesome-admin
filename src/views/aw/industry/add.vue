<template>
  <aw-container>
    <el-form v-model="form" :rules="rules" ref="form" label-position='right' label-width="130px">

      <el-form-item label="行业名称" prop="industry_name">
        <el-input v-model="form.industry_name"></el-input>
        <el-button type="text" @click="chooseItem('open')">选择行业</el-button>
      </el-form-item>

      <el-form-item label="选择行业" :style="style">
        <el-select v-model="choose_industry_name" @change="handleChange">
          <el-option v-for="(item,index) in industry_list" :key="index" :label="item" :value="index"></el-option>
        </el-select>
        <el-button type="text" @click="chooseItem('close')">关闭</el-button>
      </el-form-item>

      <el-form-item label="行业logo">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="/System/fileUpload.mvc"
          :on-change="getFiles"
          :data="addFilesDate"
          :file-list="fileList">
          <el-button size="small" type="primary">选择图片</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item label="行业简介" prop="industry_indro">
        <el-input type="textarea" rows="5" v-model="form.industry_indro" placeholder="请输入行业简介">
        </el-input>
      </el-form-item>

      <el-form-item label="是否启用" prop="status">
        <el-switch v-model="form.status" inactive-value="0" active-color="#67C23A" active-value="1" @change="handleSwitch"></el-switch>
      </el-form-item>

      <el-form-item>
        <p style="text-align: left"><el-button type="success" size="mini" @click="handleCreate">确定</el-button></p>
        <aw-back title="取消" icon-class="icon-back-hidden" align="left" style="margin-top: -50px; margin-left: 70px;"></aw-back>
      </el-form-item>
    </el-form>
  </aw-container>
</template>

<script>
  export default {
    data() {
      return {
        style:'display: none',
        addFilesDate:{},
        industry_list:[
          'A 农、林、牧、渔业；',
          'B 采矿业；',
          'C 制造业；',
          'D 电力、热力、燃气及水生产和供应业；',
          'E 建筑业；',
          'F 交通运输、仓储和邮政业；',
          'G 信息传输、软件和信息技术服务业；',
          'H 批发和零售业；',
          'I 住宿和餐饮业；',
          'J 金融业；',
          'K 房地产业；',
          'L 租赁和商务服务业；',
          'M 科学研究和技术服务业；',
          'N 水利、环境和公共设施管理业；',
          'O 居民服务、修理和其他服务业；',
          'P 教育；',
          'Q 卫生和社会工作；',
          'R 文化、体育和娱乐业；',
          'S 公共管理、社会保障和社会组织；',
          'T 国际组织',
        ],
        fileList:[],
        choose_industry_name:'',
        form:{
          industry_name:'',
          industry_intro: '',
          status: '',
          sort: '',
          logo: ''
        },
        rules:{
          industry_name:[{required:true,message:'不能为空',trigger:'blur'}],
        }
      }
    },
    methods:{
      chooseItem(type){
        const display = {"open":"block","close":"none"}
        this.style = `display:${display[type]}`
      },
      handleChange(value){
        this.$message.success(value.toString())
        this.form.industry_name = this.industry_list[value]
      },
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
