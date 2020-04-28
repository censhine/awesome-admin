<template>
  <aw-container>
    <aw-header title="运营模板"></aw-header>
   <div class="btn-group">
   	 <el-button
          type="primary"
          size='mini'
          @click="showDialog">
          <i class="el-icon-plus"></i>
          添加
        </el-button>

        <el-button
          type="default"
          size='mini'
          @click="handleFormReset">
          <aw-icon name="refresh"/>
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
        prop="name"
        label="模板名称"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="express"
        label="物流公司"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="cost"
        label="计价方式"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="sz"
        label="数量"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="sf"
        label="起步价"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="xz"
        label="增加数量"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="xf"
        label="加价"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="地区"
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
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
        	<!--<router-link to='/agent-detail'>-->
        		<el-button type="text" @click='edit(scope.row)' size="mini">编辑</el-button>
        		<el-button type="text" style='color: red;' @click='remove(scope.row.$index)' size="mini">删除</el-button>
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
        :page-size="10"
        :page-sizes="[10, 20, 30, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100">
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
    	 <el-form :model="form2" :rules="rules" ref="ruleForm" label-width="120px">
    	 	<el-form-item label="模板名称：" prop='name' >
        	<el-col :span="13">
        		<el-input v-model="form2.name"   autocomplete="off"></el-input>
        	</el-col>
        </el-form-item>
        <el-form-item label="物流公司：" required>
        	<el-col :span='14'>
        		<el-select
          v-model="form2.express"
          placeholder="请选择物流公司"
          style="width: 310px;">
          <el-option v-for='(item,index) in express' :key='index' :label="item.name" :value="item.code"/>
        </el-select>
        	</el-col>

      </el-form-item>
      <el-form-item label="费用计算方式："required >
			<el-radio-group v-model="form2.cost">
				<el-radio @change='sz' label="按重量"></el-radio>
				<el-radio @change='sj' label="按商品件数"></el-radio>
			</el-radio-group>

	   </el-form-item>
	   			<div class="sz" v-if="showSz">
	   				<el-form-item label="首重(kg)："prop='sz'>
        	<el-col :span="13">
        		<el-input v-model="form2.sz"   autocomplete="off"></el-input>
        	</el-col>
        </el-form-item>
        <el-form-item label="首费(元)："  prop="sf">
        	<el-col :span="13">
        		<el-input v-model="form2.sf" autocomplete="off"></el-input>
        	</el-col>
        </el-form-item>
        <el-form-item label="续重(kg)："  prop="xz">
        	<el-col :span="13">
          	<el-input v-model="form2.xz" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="续费(元)："  prop="xf">
        	<el-col :span="13">
          	<el-input v-model="form2.xf" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
	   			</div>
	   			<div class="sj" v-else>
	   				<el-form-item label="首件："prop='sz' >
        	<el-col :span="13">
        		<el-input v-model="form2.sz"  autocomplete="off"></el-input>
        	</el-col>
        </el-form-item>
        <el-form-item label="首费(元)："  prop="sf">
        	<el-col :span="13">
        		<el-input v-model="form2.sf" autocomplete="off"></el-input>
        	</el-col>
        </el-form-item>
        <el-form-item label="续件："  prop="xz">
        	<el-col :span="13">
          	<el-input v-model="form2.xz" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="续费(元)："  prop="xf">
        	<el-col :span="13">
          	<el-input v-model="form2.xf" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
	   			</div>

        <el-form-item label="目的地："required>
        	<!--<Address :propsOptions = 'addressObj' v-model="form2.address" @getAddress='_getAddress'></Address>-->
        	<el-select
          v-model="form2.province"
          placeholder="省"
           @change='changeProvince'
          style="width: 145px;margin-right: 20px;">
          <el-option v-for='(item,index) in province':key='item.code' :label="item.name" :value="item.code"/>
        </el-select>
        	<el-select
          v-model="form2.city"
          placeholder="市"
          @change='changeCity'
          style="width: 145px;">
          <el-option v-for='(item,index) in citys':key='item.code' :label="item.name" :value="item.code"/>
        </el-select>
      </el-form-item>
      <el-form-item>
      	<el-tag style='margin-right: 10px;'
				  v-for="tag in form2.address"
				  :key="tag"
				  @close="handleClose(tag)"
				  @click='getTag(tag)'
				  closable>
				  {{tag}}
				</el-tag>
      </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
	      <el-button  @click="dialogShow = false" size='medium'>取 消</el-button>
	    	<el-button type="primary" @click="submit('ruleForm')" size='medium'>确 定</el-button>
	    </span>
    </el-dialog>
     <el-dialog
    	title='添加'
    	:visible.sync="dialogShow2"
      width="40%"
    	>
    	 <el-form :model="form3" :rules="rules" ref="ruleForm" label-width="120px">
    	 	<el-form-item label="模板名称：" prop='name' >
        	<el-col :span="13">
        		<el-input v-model="form3.name"   autocomplete="off"></el-input>
        	</el-col>
        </el-form-item>
        <el-form-item label="物流公司：" required>
        	<el-col :span='14'>
        		<el-select
          v-model="form3.express"
          placeholder="请选择物流公司"
          style="width: 310px;">
          <el-option v-for='(item,index) in express' :key='index' :label="item.name" :value="item.code"/>
        </el-select>
        	</el-col>

      </el-form-item>
      <el-form-item label="费用计算方式："required >
			<el-radio-group v-model="form3.cost">
				<el-radio @change='sz' label="按重量"></el-radio>
				<el-radio @change='sj' label="按商品件数"></el-radio>
			</el-radio-group>

	   </el-form-item>
	   			<div class="sz" v-if="showSz">
	   				<el-form-item label="首重(kg)："prop='sz'>
        	<el-col :span="13">
        		<el-input v-model="form3.sz"   autocomplete="off"></el-input>
        	</el-col>
        </el-form-item>
        <el-form-item label="首费(元)："  prop="sf">
        	<el-col :span="13">
        		<el-input v-model="form3.sf" autocomplete="off"></el-input>
        	</el-col>
        </el-form-item>
        <el-form-item label="续重(kg)："  prop="xz">
        	<el-col :span="13">
          	<el-input v-model="form3.xz" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="续费(元)："  prop="xf">
        	<el-col :span="13">
          	<el-input v-model="form3.xf" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
	   			</div>
	   			<div class="sj" v-else>
	   				<el-form-item label="首件："prop='sz' >
        	<el-col :span="13">
        		<el-input v-model="form3.sz"  autocomplete="off"></el-input>
        	</el-col>
        </el-form-item>
        <el-form-item label="首费(元)："  prop="sf">
        	<el-col :span="13">
        		<el-input v-model="form3.sf" autocomplete="off"></el-input>
        	</el-col>
        </el-form-item>
        <el-form-item label="续件："  prop="xz">
        	<el-col :span="13">
          	<el-input v-model="form3.xz" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="续费(元)："  prop="xf">
        	<el-col :span="13">
          	<el-input v-model="form3.xf" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
	   			</div>

        <el-form-item label="目的地："required>
        	<!--<Address :propsOptions = 'addressObj' v-model="form2.address" @getAddress='_getAddress'></Address>-->
        	<el-select
          v-model="form3.province"
          placeholder="省"
           @change='changeProvince'
          style="width: 145px;margin-right: 20px;">
          <el-option v-for='(item,index) in province':key='item.code' :label="item.name" :value="item.code"/>
        </el-select>
        	<el-select
          v-model="form3.city"
          placeholder="市"
          @change='changeCity'
          style="width: 145px;">
          <el-option v-for='(item,index) in citys':key='item.code' :label="item.name" :value="item.code"/>
        </el-select>
      </el-form-item>
      <el-form-item>
      	<el-tag style='margin-right: 10px;'
				  v-for="tag in form3.address"
				  :key="tag"
				  @close="handleClose(tag)"
				  @click='getTag(tag)'
				  closable>
				  {{tag}}
				</el-tag>
      </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
	      <el-button  @click="dialogShow2 = false" size='medium'>取 消</el-button>
	    	<el-button type="primary" @click="submit2('ruleForm')" size='medium'>确 定</el-button>
	    </span>
    </el-dialog>

  </aw-container>
</template>

<script>
  import day from 'dayjs'
//import Address from '../children/Address'
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
            express:'申通快递',
            cost:'按商品件数',
            sz:'20',
            sf:888,
	        xz:666,
	        xf:1600,
	        address:['北京','南京'],
	        createTime:'2020-04-07 10:40:00'
          }],
//          rules: {
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
        	sz:'',
        	sf:'',
        	xz:'',
        	xf:'',
        	address:[]
        },
        citys:[],
        tags:[],
        rules: {
        	name: [{
						required: true,
						message: '请输入运费模板名称',
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
      remove(row){
      	this.$confirm('你确定要删除此模板吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(this.tableData.splice(row,1)){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
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
      showDialog(){
      	this.dialogShow2 = true;
      },
      changeProvince(val){
      	if(val!==''){
      		for(var item of this.province){
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

