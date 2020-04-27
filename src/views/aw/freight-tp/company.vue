<template>
  <d2-container>
   <div class="btn-group">
   	 <el-button
          type="primary"
          size='mini'
          @click="showDialog('add')">
          <i class="el-icon-plus"></i>
          添加
        </el-button>

        <el-button
          type="default"
          size='mini'
          @click="handleFormReset">
          <d2-icon name="refresh"/>
          	刷新
        </el-button>
   </div>
    <el-divider></el-divider>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        type="selection"
        align="center"
      >
      </el-table-column>
      <el-table-column
        fixed
        prop="freightNum"
        label="编号"
        align="center"
      >
      </el-table-column>

      <el-table-column
        prop="express"
        label="物流名称"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="desc"
        label="配送描述"
        align="center"
      >
      </el-table-column>

      <el-table-column
        prop="createTime"
        label="添加时间"
        align="center"
      >
      </el-table-column>

      <el-table-column
        label="是否启用"
        prop="status"
        align="center"
      >
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" inactive-value="0" active-value="1" @change="handleSwitch"></el-switch>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
        	<!--<router-link to='/agent-detail'>-->
        		<el-button type="text" @click='edit(scope.row)' size="mini">编辑</el-button>
        		<el-button type="text" style='color: red;' @click='remove(scope.$index)' size="mini">删除</el-button>
        	<!--</router-link>-->

        </template>
      </el-table-column>
    </el-table>
    <el-divider></el-divider>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="100"
        :page-sizes="[10, 20, 30, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="1000">
      </el-pagination>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
 		>
      <span>你确定要删除该商品吗？</span>
      <span slot="footer" class="dialog-footer">
    <el-button  @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
    	title='编辑'
    	:visible.sync="dialogShow"
      width="40%"
    	>
    	 <el-form :model="form2" :rules="rules" ref="ruleForm2" label-width="120px">
    	 	<el-form-item label="物流名称：" prop='express' >
        	<el-col :span="13">
        		<el-input v-model="form2.express"   autocomplete="off"></el-input>
        	</el-col>
        </el-form-item>
        <el-form-item label="物流描述：" prop="desc">
          <el-input type="textarea" v-model="form2.desc" autocomplete="off" rows="5"></el-input>
        </el-form-item>

      <el-form-item label="是否启用" prop="status">
        <el-switch v-model="form2.status" inactive-value="0" active-value="1" @change="handleSwitch"></el-switch>
      </el-form-item>
       </el-form>
      <span slot="footer" class="dialog-footer">
	      <el-button  @click="dialogShow = false" size='medium'>取 消</el-button>
	    	<el-button type="primary" @click="submit('ruleForm2')" size='medium'>确 定</el-button>
	    </span>

    </el-dialog>
     <el-dialog
    	title='添加'
    	:visible.sync="dialogShow2"
      width="40%"
    	>
    	 <el-form :model="form3" :rules="rules" ref="ruleForm3" label-width="120px">
         <el-form-item label="物流名称：" prop='express' >
           <el-col :span="13">
             <el-input v-model="form3.express"   autocomplete="off"></el-input>
           </el-col>
         </el-form-item>

         <el-form-item label="物流描述：" prop="desc">
           <el-input type="textarea" v-model="form3.desc" autocomplete="off" rows="5"></el-input>
         </el-form-item>

       <el-form-item label="是否启用" prop="status">
         <el-switch v-model="form3.status" inactive-value="0" active-value="1" @change="handleSwitch"></el-switch>
       </el-form-item>
       </el-form>
      <span slot="footer" class="dialog-footer">
	      <el-button  @click="dialogShow2 = false" size='medium'>取 消</el-button>
	    	<el-button type="primary" @click="submit2('ruleForm3')" size='medium'>确 定</el-button>
	    </span>

    </el-dialog>

  </d2-container>
</template>

<script>
const {cityData} = require('./children/city.js')
  export default {
  	components:{
//		Address
  	},
    data () {
      return {
      	province:cityData,
        dialogVisible: false,
        dialogShow:false,
        dialogShow2:false,
        showSz:true,
        addressObj:{
        	checkStrictly:true
        },
        currentPage1:5,
        title:'',
        tableData: [{
          freightNum: '4698659',
          name: '张三直营店',
          express:'顺丰快递',
          cost:'按重量',
          desc: '首重为5元/KG，续重为5元/KG。',
          status: 1,
          sz:'10',
          sf:666,
          xz:555,
          xf:1220,
          address:['深圳','上海'],
          createTime:'2020-04-07 10:30:00'
        },
          {
            freightNum: '1565554',
            name: '李四直营店',
            desc: '首重为5元/KG，续重为5元/KG。',
            express:'申通快递',
            cost:'按商品件数',
            sz:'20',
            status: 0,
            sf:888,
	        xz:666,
	        xf:1600,
	        address:['北京','南京'],
	        createTime:'2020-04-07 10:40:00'
          }],
//      rules: {
//      price: [
//        { required: true, message: '请输入活动名称', trigger: 'blur' },
//        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
//      ]
//    },
      express:[
      		{
      			name:'顺丰速运',
      			code:'SF'
      		},
      		{
      			name:'申通快递',
      			code:'ST'
      		},
      		{
      			name:'中通快递',
      			code:'ZT'
      		}
      ],
      form2:{
        	name:'',
        	express:'',
        	cost:'按重量',
          desc:'',
          status: '',
        	sz:'',
        	sf:'',
        	xz:'',
        	xf:'',
        	address:[]
        },
        form3:{
        	name:'',
        	express:'',
        	cost:'按重量',
          desc:'',
          status: '',
        	sz:'',
        	sf:'',
        	xz:'',
        	xf:'',
        	address:[]
        },
        citys:[],
        tags:[],
        rules: {
        	express: [{
						required: true,
						message: '请输入物流名称',
						trigger: 'blur'
					}],
					sz: [{
						required: true,
						message: '请输入首重',
						trigger: 'blur'
					},{
						pattern:/^[1-9]\d*$/,
						message:'只能输大于0的数字'
					}],
					sf: [{
						required: true,
						message: '请输入首费',
						trigger: 'blur'
					},{
						pattern:/^[1-9]\d*$/,
						message:'只能输大于0的数字'
					}],
					xz: [{
						required: true,
						message: '请输入续重',
						trigger: 'blur'
					},{
						pattern:/^[1-9]\d*$/,
						message:'只能输大于0的数字'
					}],
					xf: [{
						required: true,
						message: '请输入续费',
						trigger: 'blur'
					},{
						pattern:/^[1-9]\d*$/,
						message:'只能输大于0的数字'
					}]
				},
      }
    },
    methods: {
      edit(row) {
      	if(row.cost==='按商品件数'){
      		this.showSz = false;
      		this.form2.sj = row.sj;
      	}
      	console.log(row);
       this.form2 = row;
        this.dialogShow = true;
      },
      handleSwitch(){

      },
      remove(index){
      	this.$confirm('你确定要删除此模板吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData.splice(index,1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleFormSubmit () {
        console.log('11111')
      },
      handleFormReset () {
        this.refresh();
      },
      handleSelectionChange (selection) {
        console.log(selection)
      },
      refresh(){
        location.reload();
      },
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      submit(formName){
      	this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      submit2(formName){
      	this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      showDialog(index){
        if(this.$refs.ruleForm3){
          this.$refs.ruleForm3.clearValidate()
        }
      	this.dialogShow2 = true;
      },
      changeProvince(val){
      	if(val!==''){
      		for(let item of this.province){
      			if(item.code === val){
      				this.citys = item.cities;
      			}
      		}
      	}
      },
      changeCity(val){
      	if(val!==''){
      		for(var item of this.citys){
      		if(item.code === val){
      			this.form2.address.push(item.name);
      			this.form2.province = '';
      			this.form2.city = '';
      			this.form3.address.push(item.name);
      			this.form3.province = '';
      			this.form3.city = '';
      		}
      		}
      	}
      },
       handleClose(tag) {
        this.form2.address.splice(this.form2.address.indexOf(tag), 1);
        this.form3.address.splice(this.form3.address.indexOf(tag), 1);
      },
      getTag(tag){
      	console.log(tag);
      },
      sz(label){
      	if(label==='按重量'){
      		this.showSz = true;
      	}
      },
      sj(label){
      	if(label==='按商品件数'){
      		this.showSz = false;
      	}
      }
    }
  }
</script>

<style scoped lang="scss">
  .btn-group{
    margin-bottom: 20px;
  }
  .page{
	margin-top: 40px;
}

</style>

