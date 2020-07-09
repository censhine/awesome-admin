<template>
	<div class="wrap">
		<div class="btn">
	        <!--<el-button
	          type="default"
	          @click="exportExcel"
	          size='mini'
	          >
	          <aw-icon name="download"/>
	          导出数据
	        </el-button>-->
	        <el-button
	          type="warning"
	          @click="closeAll"
	          size='mini'
	          >
	          批量关闭
	        </el-button>
	        <el-button
	          type="danger"
	          @click="dels"
	          size='mini'
	          >
	          批量删除
	        </el-button>
          <el-button type="default" size="mini" @click="$router.push({path:'/refresh'})"><i class="el-icon-refresh"></i> 刷新</el-button>
    	</div>
    	<el-table
	      :data="tableData"
	      border
	      @selection-change="handleSelectionChange"
	      style="width: 100%">
	      <el-table-column
	        type="selection"
	        width="55"
	        align="center"
	      >
	      </el-table-column>
	      <el-table-column
	        prop="orderNo"
	        label="订单编号"
	        align="center"
	      >
	      </el-table-column>
	      <el-table-column
	        prop="createTime"
	        label="提交时间"
	        align="center"
	      >
          <template slot-scope="scope">
            {{scope.row.createTime|time}}
          </template>
	      </el-table-column>
	       <el-table-column
	        prop="shopName"
	        label="所属店铺"
	        align="center"
	      >
	      </el-table-column>
	       <el-table-column
	        prop="phone"
	        label="用户账号"
	        align="center"
	      >
	      </el-table-column>
	       <el-table-column
	        prop="realTotalMoney"
	        label="订单金额"
	        align="center"
	      >
           <template slot-scope="scope">
             ¥{{scope.row.realTotalMoney.toFixed(2)}}
           </template>
	      </el-table-column>
	      <el-table-column
	        prop="payType"
	        label="支付方式"
	        align="center"
	      >
	      	<template slot-scope='scope'>
	      		{{payMethods[scope.row.payFrom]}}
	      	</template>
	      </el-table-column>

	      <el-table-column
	        prop="orderSource"
	        label="订单来源"
	        align="center"
	      >
          <template slot-scope="scope">
            {{scope.row.orderSource||'商城'}}
          </template>
	      </el-table-column>
	      <el-table-column
	        prop="orderStatus"
	        label="订单状态"
	        align="center"
	      >
	      	<template slot-scope='scope'>
	      		{{orderStatus[scope.row.orderStatus]}}
	      	</template>
	      </el-table-column>

	      <el-table-column
	        label="操作"
	        align="center"
	        fixed="right"
          width="300"
	      >
	        <template slot-scope="scope">
            <!-- {'0': '初始化', '1': '待付款', '2': '待发货', '3': '待收货', '4': '待退款', '5':'退款成功', '6':'退款失败', '7':'交易关闭','8':'交易成功'}-->
	        	<el-button type="text" @click="goDetail(scope.row)"  size="mini">查看</el-button>
	        	<el-button type="text" @click="sendGoods(scope.row)" v-if="scope.row.orderStatus == 2"  size="mini">发货</el-button>
	        	<el-button type="text" @click="goLogistics(scope.row)" v-if="scope.row.orderStatus == 3 || scope.row.orderStatus == 8" size="mini">订单跟踪</el-button>
	        	<el-button type="text" @click="handleOrder(scope.row,1)" v-if="scope.row.orderStatus <= 2" size="mini">取消</el-button>
	          <el-button type="text" style='color: red;' @click="handleOrder(scope.row,2)" v-if="scope.row.orderStatus == 7" size="mini">删除</el-button>
	        </template>
	      </el-table-column>
    </el-table>
    <pagination
    	:pageTotal="pageTotal"
    	@handleCurrentChange="handleCurrentChange"
    	@handleSizeChange="handleSizeChange">
    </pagination>
     <el-dialog
    	title='发货'
    	:visible.sync="dialogShow"
      width="40%"
    	>
    	 <el-form :model="deliveryForm" :rules="rules" ref="ruleForm" label-width="100px">
    	 	<div class="info">
    	 		  <el-row>
        	<el-col :span='8'>
        		<span>订单编号：{{deliveryInfo.orderNo}}</span>
        	</el-col>
        	<el-col :span='8'>
        		<span>手机号码：{{deliveryInfo.telephone}}</span>
        	</el-col>
        	<el-col :span='8'>
        		<span>收货人：{{deliveryInfo.userName}}</span>
        	</el-col>
        </el-row>
        <el-row style='margin-top: 16px;'>
        	<el-col :span='16'>
        		<span>收货地址：{{deliveryInfo.address}}</span>
        	</el-col>
        	<el-col :span='8'>
        		<span>邮政编码：{{deliveryInfo.mailCode}}</span>
        	</el-col>
        </el-row>
    	 	</div>
        <el-form-item label="物流公司：" prop='expressCode'>
        		<el-select
			          v-model="deliveryForm.expressCode"
			          placeholder="请选择物流公司"
			          style="width:260px;">
		          <el-option
		          	  v-for='(item,index) in express'
		          	  :key='index'
		          	  :label="item.name"
		          	  :value="item.name"/>
        		</el-select>
      </el-form-item>
        <el-form-item label="物流单号："  prop="logisticsCode">
        	<el-col :span="10">
          	<el-input v-model="deliveryForm.logisticsCode" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
	      <el-button  @click="dialogShow = false" size='medium'>取 消</el-button>
	    	<el-button type="primary" @click="submit('ruleForm')" size='medium'>确 定</el-button>
	    </span>
    </el-dialog>
		<el-dialog
      title="温馨提示"
      :visible.sync="dialogVisible"
      width="30%"
 		>
      <span><i class="el-icon-question" style="color: #409EFF;"></i> {{tips}}</span>
      <span slot="footer" class="dialog-footer">
    <el-button  @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
	</div>
</template>

<script>
	import Vue from 'vue'
	import pluginExport from '@d2-projects/vue-table-export'
	import Pagination from "@/components/pagination";
  import {getAxiosApi} from "@/api/requestData";
	Vue.use(pluginExport)
	export default {
    components: {
      Pagination,

    },
    props: {
      tableData: Array,
      pageTotal: Number,
    },
    data() {
      return {
        form2: {
          orderCode: '',
          phone: '',
          contact: '',
          address: '',
          postCode: '',
          expressCode: '',
          logisticsCode: ''
        },
        dialogShow: false,
        dialogVisible: false,
        tips: '',
        deliveryInfo:{
          orderNo: '',
          phone:'',
          contact:'',
          address:'',
          postCode:''
        },
        deliveryForm:{

        },
        express: [
          {
            name: '顺丰',
            code: 'SF'
          },
          {
            name: '申通',
            code: 'ST'
          },
          {
            name: '中通',
            code: 'ZT'
          },
          {
            name: '圆通',
            code: 'YT'
          },
        ],
        columns: [
          {
            label: '订单编号',
            prop: 'orderNum',
            align: 'center'
          },
          {
            label: '提交时间',
            prop: 'createTime',
            align: 'center'
          },
          {
            label: '所属店铺',
            prop: 'shopName',
            align: 'center'
          },
          {
            label: '用户账号',
            prop: 'userAccount',
            align: 'center'
          },
          {
            label: '订单金额',
            prop: 'orderAmount',
            align: 'center'
          },
          {
            label: '支付方式',
            prop: 'payMethods',
            align: 'center'
          },
          {
            label: '订单来源',
            prop: 'orderSource',
            align: 'center'
          },
          {
            label: '订单状态',
            prop: 'orderStatus',
            align: 'center'
          }
        ],
        orderNo: '',
        selectArr: [],
        selectDel: [],
        //0:初始化  1.待付款 2.(已付款)待发货 3.待收货(已发货) 4.待退款 5.退款成功(已退款) 6.退款失败(拒绝退款) 7.交易关闭(取消订单) 8.交易成功
        orderStatus: {'0': '初始化', '1': '待付款', '2': '待发货', '3': '待收货', '4': '待退款', '5':'退款成功', '6':'退款失败', '7':'交易关闭','8':'交易成功'},
        payType: {'1': '在线支付', '2': '货到付款'},
        payMethods: {'0': '未支付', '1': '支付宝', '2': '微信', '3': '银联卡', '4': '知豆余额'},
        rules: {
          expressCode: [{
            required: true,
            message: '请选择物流公司',
            trigger: 'change'
          }],
          logisticsCode: [{
            required: true,
            message: '请输入物流单号',
            trigger: 'blur',
          }
          ]
        },
      }
    },
    methods: {
      // 上下分页
      handleCurrentChange(val) {
        this.$emit('currentChange', val)
      },
      // 每页显示多少条
      handleSizeChange(val) {
        this.$emit('sizeChange', val)
      },
      handleSelectionChange(val) {
        if (val) {
          this.selectArr = [];
          this.selectDel = [];
          for (let item of val) {
            this.selectArr.push(item.id);
            this.selectDel.push(item.id);
          }
        }
      },
      setArr(array) {
        return Array.from(new Set(array));
      },
      closeAll() {
        this.handleOrder({ids:this.selectArr.join(',')},1)
      },
      dels() {
        this.handleOrder({ids:this.selectArr.join(',')},2)
      },
      cancelOrder(row) {
        this.$router.push({
          path: '/zis/order-public/cancel',
          query: {
            id: row.id
          }
        })
      },
      del(row, index) {
        this.$confirm('你确定要删除订单吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData.splice(index, 1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      goLogistics(row) {
        this.$router.push({
          path: '/zis/order-public/logistics',
          query: {
            id: row.id,
            orderNo: row.orderNo
          }
        })
      },
      goDetail(row) {
        this.$router.push({
          path: '/zis/order-public/detail',
          query: {
            id: row.id
          }
        })
      },
      handleOnekeyReceiptConfirm() {
        if (this.selectArr.length !== 0) {
          let arr = this.setArr(this.selectArr);
          this.$confirm('你确定要一键收货么？').then(_ => {
            getAxiosApi('/supply/web/merchantOrder/receipt', {ids: this.setArr(this.selectArr).join(',')})
              .then(res => {
                if (res.status > 0) {
                  this.$message.success('操作成功')
                } else {
                  this.$message.error(res.tip)
                }
              }).catch(_ => {
            });
          }).catch(_ => {
          })
        } else {
          this.$message.error('请选择至少一条订单');
        }
      },
    handleReceiptConfirm(row) {
        this.$confirm('你确定收到货了么？').then(_ => {
          getAxiosApi('/supply/web/merchantOrder/receipt', {ids: row.id})
            .then(res => {
              if (res.status > 0) {
                this.$message.success('操作成功')
              } else {
                this.$message.error(res.tip)
              }
            }).catch(_ => {
          });
        }).catch(_ => {
        })
      },
    handleOrder(row, type) {
      const orderType = {1: "关闭", 2: "删除"}
      console.log(row);
      this.$confirm('你确定要' + orderType[type] + '订单么？').then(_ => {
        let params = {ids:row.ids, id: row.id, type: type}
        console.log(params);
        if(params.id === undefined && params.ids === undefined){
          this.$message.error('请选择至少一个订单')
          return
        }
        if(params.id === undefined) delete params.id
        if(params.ids === undefined) delete params.ids
        getAxiosApi('/supply/web/merchantOrder/closeById', {}, params, 'get').then(res => {
          if (res.status > 0) {
            this.$message.success('操作成功')
          } else {
            this.$message.error(res.tip)
          }
        }).catch(_ => {})
      }).catch(_ => {})
    },
    sendGoods(row) {
      if( this.$refs.ruleForm){
        this.$refs.ruleForm.clearValidate()
      }
      getAxiosApi('/supply/web/merchantOrder/findById',{},{id:row.id},'get').then(res=>{
        this.deliveryInfo = res.data.adress
        this.deliveryInfo.orderNo = row.orderNo
      }).catch(_=>{})
      this.dialogShow = true
      this.orderNo = row.orderNo
    },
    //发货物流信息提交
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getAxiosApi('/supply/web/merchantOrder/shipment', {},{
            expressId: this.deliveryForm.expressCode,
            expressNo: this.deliveryForm.logisticsCode,
            orderNo: this.orderNo
          },'get')
            .then(res => {
              if (res.status > 0) {
                this.dialogShow = false
                this.this.$refs[formName].resetFields()
                this.$emit('handleSubmit', {})
                this.$message.success(util.const.OPERATE_SUCCESS)
              } else {
                this.$message.error(res.tip)
              }
            }).catch(_ => {});
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    exportExcel() {
      this.$export.excel({
        columns: this.columns,
        data: this.tableData,
        header: '导出商家代发订单列表',
        merges: ['A1', 'E1']
      })
        .then(() => {
          this.$message('导出表格成功')
        })
    }
    }
	}
</script>

<style scoped lang="scss">
.btn{
	margin-bottom: 20px;
}
.info{
	padding: 0 19px;
	margin-bottom: 20px;
}
</style>
