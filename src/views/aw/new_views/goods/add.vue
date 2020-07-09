
<template>
  <aw-container>
    <div class="wrap">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position='right' label-width="160px" class="demo-ruleForm" size="small">
        <el-form-item label="商品分类：" prop="categoryId">
          <el-cascader v-model="ruleForm.categoryId" @change="changeOptions" placeholder="可选择所属商品分类 试试搜索：手机" :options="catData" :props="catProps" :show-all-levels="false" filterable clearable>
          </el-cascader>
        </el-form-item>
        <el-form-item label="商品标题：" prop="productName">
          <el-col :span="14">
            <el-input v-model="ruleForm.productName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="商品品牌">
          <el-select v-model="ruleForm.brandId" placeholder="请选择商品品牌">
            <el-option v-for="(item,index) in brandData" :key="index" :label="item.brandName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="保障服务：">
          <el-checkbox-group v-model="checkList" @change='handChanges'>
            <el-checkbox v-for='(item,index) in serverType' :label="item.id"  :key='item.id'>{{item.securityName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="运费选择：" prop="costType">
          <el-col :span='8'>
            <el-radio-group v-model="ruleForm.costType" @change='getStatus'>
              <el-radio label="1" value='1'>买家承担运费</el-radio>
              <el-radio label="2" value='2'>卖家包邮</el-radio>
            </el-radio-group>
          </el-col>
        </el-form-item>
        <el-form-item label="运费：" prop="fare">
          <el-col :span="14">
            <el-input :disabled="disable" v-model="ruleForm.fare"></el-input>
          </el-col>
          <el-col :span="1" style='text-align: center;'>
            元
          </el-col>
        </el-form-item>
        <el-form-item label="发货地址：" prop="address">
          <el-col :span="14">
            <el-input v-model="ruleForm.address"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label='商品图片：'>
          <el-upload class="upload-demo"
                     action="uploadUrl"
                     :on-preview="handlePreview"
                     :on-remove="handleRemove"
                     list-type="picture-card"
                     :multiple="true"
                     :on-exceed="handleCheck"
                     :http-request="handleEditChange"
                     :class="{hide:hideUploadEdit}" :limit="5">
            <i class="el-icon-plus"></i>
          </el-upload>
          <span class="tip"> 可多张图片上传，最多可以上传5张图片</span>
        </el-form-item>
        <el-form-item>
          <div class="flex" v-for="(item,index) of ruleForm.attributes" :key="index">
            <div class="left-table" style="width: 160px;">
              <div class="title">
                <div>销售属性</div>
              </div>
              <el-form-item label-width="0" :prop="'attributes.' + index + '.name'" :rules="rules.name">
                <el-col :span='20'>
                  <el-input size="mini" v-model="item.name"></el-input>
                </el-col>
              </el-form-item>
            </div>
            <el-table class="right-table" :data="item.attributes" border stripe size="mini">
              <el-table-column v-for="(col,idx) of columns" :key="idx" v-bind="col">
                <template slot-scope="scope">
                  <el-form-item label-width="0" :prop="'attributes.'+index+'.attributes.'+scope.$index+'.'+col.prop" :rules="rules[col.prop]">

                    <el-input size="small" v-if="col.prop!='img'" v-model="scope.row[col.prop]"></el-input>

                    <el-upload
                      v-else
                      class="avatar-uploader"
                      action="http://192.168.1.136:8088/web/suplly/upload"
                      :show-file-list="false"
                      :on-success="(value)=>{handleAvatarSuccess(col.prop,index,scope.$index,value)}"
                      :before-upload="beforeAvatarUpload">

                      <img v-if="scope.row[col.prop]" :src="scope.row[col.prop]" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>

                    <!--                                        <el-upload v-else-->
                    <!--                                          class="upload-demo"-->
                    <!--                                          :action="uploadUrl"-->
                    <!--                                          :on-success="(val)=>{handleAvatarSuccess('attributes-'+index,val)}"-->
                    <!--                               :before-upload="beforeAvatarUpload">-->
                    <!--                                          <img v-if="'attributes_'+index" :src="'attributes_'+index" class="avatar">-->
                    <!--                                           <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                    <!--                                        </el-upload>-->
                    <!--                                        <el-input size="small"  v-model="scope.row[col.prop]"></el-input>-->
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" width="100">
                <template slot-scope="scope">
                  <span style="color: red;cursor: pointer" @click="handleDel(index,scope.$index)">删除</span>
                </template>
              </el-table-column>
            </el-table>
            <div class="btn" @click="add2(index)">添加自定义标签</div>
          </div>
          <div class="add"  @click="add1">添加规格</div>
        </el-form-item>

        <el-form-item label='商品详情：' style='margin-top: 120px;'>
          <aw-quill style="min-height: 200px; margin-bottom: 20px;" v-model="ruleForm.details" />
        </el-form-item>
        <el-form-item style='margin: 40px 0;'>
          <el-button type="primary" @click="submitForm('ruleForm')">发布商品</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="imgUrl" alt="">
    </el-dialog>
  </aw-container>
</template>

<script>
  import util from '@/libs/util.js'
  import { getBrandList, getService, saveGoods, getCate } from '@/api/goods/list/goods'
  import { getUrl } from '@/api/geturl'
  import { uploadImg } from '@/api/upload'
  import utils from '@/utils/util.js'
  import axios from 'axios'
  const itemObj = () => ({
    values: "",
    img:'',
    price: "",
    origiPrice:'',
    stock: "",
    stNum:'',
    deposit:''
  })
  const cateObj = () => ({
    name: "",
    attributes: [
      itemObj()
    ]
  })
  export default {
    name: 'edit',


    data() {
      let patter = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/
      let isNumber = (rule, value, callback) => {
        if(value == 0){
          return callback(new Error('必须大于零'))
        }else if (!patter.test(value)) {
          return callback(new Error('输入不合法'))
        } else {
          callback()
        }
      }
      return {
        disable: false,
        hideUploadEdit: false,
        dialogVisible: false,
        uploadUrl:'http://192.168.1.136:8088/web/suplly/upload',
        imgUrl: '',
        imgUrl2:'',
        brandData: [],
        checkList: [],
        catData: [],
        catProps: {
          value: 'id',
          label: 'name',
          children: 'children',
          checkStrictly: false,
          emitPath: false
        },
        serverType: [],
        ruleForm: {
          categoryId: '',
          productName: '',
          brandId: '',
          serverType: '',
          costType: '',
          fare: '',
          address: '',
          productPic:'',
          productImg:[],
          details: '',
          attributes: [cateObj()]
        },
        cateGorys: [],
        rules: {
          categoryId: [{
            required: true,
            message: '请选择分类',
            trigger: 'change'
          }],
          productName: [{
            required: true,
            message: '请输入商品名称',
            trigger: 'blur'
          }],
          name: [{
            required: true,
            message: '请输入规格属性',
            trigger: 'blur'
          }],
          values: [{
            required: true,
            message: '请输入规格值',
            trigger: 'blur'
          }],
          productNo: [{
            required: true,
            message: '请输入商品货号',
            trigger: 'blur'
          }],
          price: [{
            required: true,
            message: '请输入商品售价',
            trigger: 'blur'
          }, { validator:isNumber}
          ],
          origiPrice: [{
            required: true,
            message: '请输入商品原价',
            trigger: 'blur'
          },{ validator:isNumber}],
          stock: [{
            required: true,
            message: '请输入库存',
            trigger: 'blur'
          }, {
                       pattern: /^\+?[1-9]\d*$/,
            message: '只能输大于0的数字'
          }],
          stNum: [{
            required: true,
            message: '请输入起订数',
            trigger: 'blur'
          }, {
            pattern: /^\+?[1-9]\d*$/,
            message: '只能输大于0的数字'
          }],
          deposit: [{
            required: true,
            message: '请输入订金金额',
            trigger: 'blur'
          }, { validator:isNumber}],
          costType: [{
            required: true,
            message: '请选择运费模式',
            trigger: 'change'
          }],
          fare: [{
            required: true,
            message: '请输入运费',
            trigger: 'blur'
          }],
          address: [{
            required: true,
            message: '请输入发货地址',
            trigger: 'blur'
          }],
        },
        columns: [{
          align: "center",
          label: "规格值",
          prop: "values"
        },
          {
            align: "center",
            label: "图片",
            prop: "img"
          },
          {
            align: "center",
            label: "销售价(元)",
            prop: "price"
          },
          {
            align: "center",
            label: "原价(元)",
            prop: "origiPrice"
          },
          {
            align: "center",
            label: "库存(件)",
            prop: "stock"
          },
          {
            align: "center",
            label: "一件代发起订量(件)",
            prop: "stNum"
          },
          {
            align: "center",
            label: "订金金额(元)",
            prop: "deposit"
          },
        ]
      };
    },
    mounted() {
      this.getURL()
      this.getBrand()
      this.getServe()
      this.getCates()
    },
    methods: {
      getURL(){
        axios.get('http://192.168.1.19:8094/config',{},{
          headers:{
            "Content-type":"multipart/form-data",
            "token": util.cookies.get('token')
          },
          withCredentials:true
        }).then(res=>{
          if(res.status == 200){
            let url = res.data.data.uploadUrl
            this.uploadUrl = url
          }
        })
      },
      handleAvatarSuccess(fieldName,parentIndex,index, res, file) {
        if(res.data){
          this.className = 'hideMsg'
        }
        this.ruleForm.attributes[parentIndex]['attributes'][index][fieldName] = res.data
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
      },
      getBrand() {
        getBrandList().then(res => {
          this.brandData = res.data
        })
      },
      changeOptions(val) {
        this.ruleForm.categoryId = val
      },
      getServe() {
        getService().then(res => {
          this.serverType = res.data
        })
      },
      handleDel(index, index2) {
        if(this.ruleForm.attributes[index].attributes.length!=1){
          this.ruleForm.attributes[index].attributes.splice(index2, 1);
        }else{
          this.ruleForm.attributes.splice(index,1)
        }
      },
      add1() {
        this.ruleForm.attributes.push(cateObj());
      },
      add2(index) {
        this.ruleForm.attributes[index].attributes.push(itemObj());
      },
      getCates() {
        getCate().then(res => {
          const datas = utils.formatDataToTree(res.data, 'id', 'pid')
          this.catData = datas
        })
      },
      handChanges(val) {
        this.checkList = val
      },
      handleChange(value) {
        this.ruleForm.categoryId = value
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid) {
            let data = { ...this.ruleForm
            }
            data.serverType = this.checkList
            saveGoods(JSON.stringify(data)).then(res => {
              if(res.status=='1'){
                this.$message.success('发布商品成功')
                setTimeout(()=>{
                  this.$router.push({
                    path:'/zis/goods/index'
                  })
                },1500)
              }
            })
          } else {
            console.log(this.ruleForm);
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleRemove(file) {
        this.ruleForm.productImg.splice(0,1)
        let vm = this
        vm.hideUploadEdit = this.ruleForm.productImg.length >= 5
      },
      handlePreview(file) {
        this.dialogVisible = true
        this.imgUrl = file.url
      },
      handleCheck() {
        this.$message.error('图片上传数量不可以超过5张');
      },
      handleCollapse(val) {
        console.log(val);
      },
      handleEditChange(param) {
        let file = param.file
        let vm = this
        const form = new FormData()
        form.append('file',file)
        axios.post(this.uploadUrl+'web/suplly/upload',form,{
          headers:{
            "Content-type":"multipart/form-data",
            "token": util.cookies.get('token')
          },
          withCredentials:false
        }).then(res=>{
          if(res.status == 200){
            let obj = {}
            obj.url = res.data.data
            this.ruleForm.productImg.push(obj)
            this.ruleForm.productPic = this.ruleForm.productImg[0].url
            vm.hideUploadEdit = this.ruleForm.productImg.length >= 5
          }
        })
      },

      change(data) {},
      handleChangeData(data) {
        this.ruleForm.attributes = data;
        console.log(this.ruleForm.attributes);
      },
      getStatus(label) {
        if(label == '1') {
          this.disable = false
        } else {
          this.ruleForm.fare = '0'
          this.disable = true
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .wrap {
    width: 1200px;
    margin-left: 20px;
    .demo-ruleForm {
      margin-top: 30px;
    }
    .avatar{
      width: 80px;
      height: 80px ;
    }
    .tip {
      font-size: 12px;
      color: #999;
    }
    .ml {
      margin-left: 15px;
    }
    .flex {
      position: relative;
      width: 100%;
      display: flex;
      margin-bottom: 70px;
      justify-content: space-between;
      .btn{
        width: 84.7%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 12px;
        background: #409EFF;
        border-radius: 4px;
        color: #fff;
        margin-left: 5px;
        cursor: pointer;
        position: absolute;
        left: 155px;
        bottom: -54px;
      }

    }
    .add{
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 12px;
      background: #409EFF;
      border-radius: 4px;
      color: #fff;
      cursor: pointer;
      position: absolute;
      left: 0;
      bottom: -54px;

    }
    .title{
      margin-bottom: 20px;
    }
  }
</style>
<style>
  .el-cascader--mini,
  .el-select {
    width: 606px;
  }

  .el-cascader {
    width: 58.3%;
  }

  .hide .el-upload--picture-card {
    display: none;
  }
</style>
