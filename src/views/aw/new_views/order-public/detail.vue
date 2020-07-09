<template>
	<aw-container>
		<div class="wrap">
			 <div class="header clearfix">
				<span class="status left">当前订单状态：{{orderStatus[order.orderStatus]}}</span>
				<el-button class='right' style='margin-top: 12px;margin-right: 20px;' type='success' size='medium' @click="hanldeRefresh"><aw-icon name="refresh"/>刷新</el-button>
				<el-button class='right' style='margin-top: 12px;margin-right: 20px;' @click="handleCloseTab" type='primary' size='medium'>关闭页面</el-button>
				<el-button v-if='order.orderStatus==0' class='right' style='margin-top: 12px;margin-right: 20px;' @click='closeOrder' type='primary' size='medium'>关闭订单</el-button>
				<el-button v-if='order.orderStatus==1' class='right' style='margin-top: 12px;margin-right: 20px;' @click='cancelOrder' type='primary' size='medium'>取消订单</el-button>
				<el-button v-if='order.orderStatus==2||order.orderStatus==3' class='right' style='margin-top: 12px;margin-right: 20px;' @click='goLogistics' type='primary' size='medium'>订单跟踪</el-button>
				<el-button v-if='order.orderStatus==4' class='right' style='margin-top: 12px;margin-right: 20px;' @click='del' type='danger' size='medium'>删除订单</el-button>
			</div>
			<div class="main">
				<h1 class="shopName">{{order.agent}}</h1>
				<h2>订单基本信息</h2>
				<el-row>
					<el-col :span='8'>
						<el-row>
							<el-col :span='8' style='text-align: right;'>订单编号：</el-col>
							<el-col :span='12'>{{order.orderNo}}</el-col>
						</el-row>
						<el-row>
							<el-col :span='8' style='text-align: right;'>用户账号：</el-col>
							<el-col :span='12'>{{order.phone}}</el-col>
						</el-row>
						<el-row>
							<el-col :span='8' style='text-align: right;'>支付方式：</el-col>
							<el-col :span='12'>{{payMethods[order.payFrom]}}</el-col>
						</el-row>
						<el-row>
							<el-col :span='8' style='text-align: right;'>订单来源：</el-col>
							<el-col :span='12'>{{order.orderSource || '商城'}}</el-col>
						</el-row>
						<el-row>
							<el-col :span='8' style='text-align: right;'>订单类型：</el-col>
							<el-col :span='12'>{{orderType[order.payType]}}</el-col>
						</el-row>
						<el-row>
							<el-col :span='8' style='text-align: right;'>配送方式：</el-col>
							<el-col :span='12'>{{order.expressId}}</el-col>
						</el-row>
						<el-row>
							<el-col :span='8' style='text-align: right;'>物流单号：</el-col>
							<el-col :span='12'>{{order.expressNo}}</el-col>
						</el-row>
					</el-col>
					<el-col :span='8'>
						<el-row>
							<el-col :span='8' >发货单流水号：</el-col>
							<el-col :span='12'>{{order.sendNum}}</el-col>
						</el-row>
						<el-row>
							<el-col :span='8'>自动确认收货时间：</el-col>
							<el-col :span='12'>{{order.autoConfirmTime|time}}</el-col>
						</el-row>
						<el-row>
							<el-col :span='8'>合同编号：</el-col>
							<el-col :span='12'>{{order.contractNum}}</el-col>
						</el-row>
						<el-row>
							<el-col :span='8'>合同类型：</el-col>
							<el-col :span='12'>{{contractType[order.contractType]}}</el-col>
						</el-row>
						<el-row>
							<el-col :span='8'>供应商：</el-col>
							<el-col :span='12'>{{order.sup}}</el-col>
						</el-row>
						<el-row>
							<el-col :span='8'>律师：</el-col>
							<el-col :span='12'>{{order.legal}}</el-col>
						</el-row>
						<el-row>
							<el-col :span='8'>收货人：</el-col>
							<el-col :span='12'>{{order.contact}}</el-col>
						</el-row>
					</el-col>
					<el-col :span='8'>
						<el-row>
							<el-col :span='6'>手机号码：</el-col>
							<el-col :span='12'>{{order.phone}}</el-col>
						</el-row>
						<el-row>
							<el-col :span='6'>邮政编码：</el-col>
							<el-col :span='12'>{{userInfo.mailCode}}</el-col>
						</el-row>
						<el-row>
							<el-col :span='6'>收货地址：</el-col>
							<el-col :span='12'>{{userInfo.address}}</el-col>
						</el-row>
						<el-row>
							<el-col :span='6'>商品合计：</el-col>
							<el-col :span='12'>{{order.itemCount}}</el-col>
						</el-row>
						<el-row>
							<el-col :span='6'>运费：</el-col>
							<el-col :span='12'>{{order.deliverMoney}}</el-col>
						</el-row>
						<el-row>
							<el-col :span='6'>订单总金额：</el-col>
							<el-col :span='12'>{{order.orderAmount}}</el-col>
						</el-row>
						<el-row>
							<el-col :span='6'>应付款金额：</el-col>
							<el-col :span='12'>{{order.realTotalMoney || 0.00}} <span class="edit" @click="edit"> 修改费用</span></el-col>
						</el-row>
					</el-col>
				</el-row>
				<h2>商品信息</h2>
				<el-table border :data="[order.orderProducts]" style="width: 100%">
				<el-table-column prop="productPic" label="商品图片" align="center">
					<template slot-scope="scope">
						<img :src="scope.row.productPic" alt="" style="width: 60px;height:60px">
					</template>
				</el-table-column>
				<el-table-column prop="productName" label="商品名称">
					<template slot-scope="scope">
						<p>{{scope.row.productName}}</p>
						<p>品牌:{{scope.row.brandName}}</p>
					</template>
				</el-table-column>
				<el-table-column prop="goodsPrice" label="价格/货号">
					<template slot-scope="scope">
						<p>价格:¥{{scope.row.price || 0.00}}</p>
						<p>货号:No{{scope.row.productId}}</p>
					</template>
				</el-table-column>
				<el-table-column prop="productAttr" label="属性" align='center'>
					<template slot-scope="scope">
						<p>{{scope.row.productAttr}}</p>
					</template>
				</el-table-column>
				<el-table-column prop="productNum" label="数量" align='center'>
				</el-table-column>
				<el-table-column prop="inventory" label="库存" align='center'>
				</el-table-column>
				<el-table-column prop="total" label="小计" align='center'>
					<template slot-scope="scope">
						<p>¥{{scope.row.total || 0.00}}</p>
					</template>
				</el-table-column>
			</el-table>
			<div class="price clearfix">
				<p class="right">
					<span>合计：</span><span class="red">¥{{order.orderTotalMoney || 0.00}}</span>
				</p>
			</div>
			<div class="admin" v-if="order.orderStatus!=0">
				<h2>操作信息</h2>
			<el-table border :data="tableData2" style="width: 100%">
				<el-table-column prop="operator" label="操作者"></el-table-column>
				<el-table-column prop="createTime" label="操作时间"></el-table-column>
				<el-table-column prop="orderStatus" label="订单状态">
					<template slot-scope="scope">
						<p>{{orderStatus[scope.row.orderStatus]}}</p>
					</template>
				</el-table-column>
				<el-table-column prop="payStatus" label="付款状态" align='center'>
					<template slot-scope="scope">
						<p>{{payStatus[scope.row.payStatus]}}</p>
					</template>
				</el-table-column>
				<el-table-column prop="sendStatus" label="发货状态" align='center'>
					<template slot-scope="scope">
						<p>{{sendStatus[scope.row.sendStatus]}}</p>
					</template>
				</el-table-column>
				<el-table-column prop="note" label="备注" align='center'></el-table-column>
			</el-table>
			</div>
			</div>
		</div>
		<el-dialog
    	title='修改费用'
    	:visible.sync="dialogShow"
      width="30%"
    	>
    	 <el-form :model="form" ref="editForm" :rules='rules' label-width="160px">
        <el-form-item label="订单应付金额："  prop="payment">
        	<el-col :span="10">
          	<el-input v-model="form.payment" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
	      <el-button  @click="dialogShow = false" size='medium'>取 消</el-button>
	    	<el-button type="primary" @click="submit('editForm')" size='medium'>确 定</el-button>
	    </span>
    </el-dialog>
	</aw-container>
</template>

<script>
  import {getAxiosApi} from "@/api/requestData";
  import { mapState, mapActions} from 'vuex'
	export default{
		data(){
			return{
			  order:{
          addressId: "5edf3d3bc8648b2a7b926609",
          anonymous: null,
          autoConfirmTime: 0,
          bshopName: null,
          createTime: 1591949026599,
          deliverMoney: 0,
          deliveryTime: 0,
          expressId: null,
          expressNo: null,
          id: "5ee336e2a6733d2a8c7a4826",
          isClosed: 0,
          isComment: 0,
          isInvoice: 0,
          isRefund: 0,
          itemCount: 1,
          jobId: null,
          logisticsInfo: null,
          modifyTime: 1591949026599,
          orderAmount: 100,
          orderNo: "281591949026596",
          orderProducts: [
            {
              createTime: 0,
              forwardInfo: null,
              modifyTime: 0,
              price: 100,
              productAttr: "11K",
              productId: "5ee32a657a0ad844c9c858db",
              productName: "最新款时尚山水画",
              productNum: 1,
              brandName:'齐白石',
              inventory:18,
              total: 200,
              productPic: "https://zis-cn.oss-cn-hangzhou.aliyuncs.com/data/files/test/20200612/jpg/46df4ad201244eda9f9a63e0559de135.jpg",
            },
            {
              createTime: 0,
              forwardInfo: null,
              modifyTime: 0,
              price: 200,
              productAttr: "12K",
              productId: "5ee32a657a0ad844c9c8589b",
              productName: "最新款时尚山水画",
              productNum: 1,
              brandName:'齐白石',
              inventory: 19,
              total: 200,
              productPic: "https://zis-cn.oss-cn-hangzhou.aliyuncs.com/data/files/test/20200612/jpg/46df4ad201244eda9f9a63e0559de135.jpg",
            },
          ],
          orderRemarks: "0",
          orderStatus: 0,
          payFrom: 0,
          payStatus: 0,
          payTime: 0,
          payType: 1,
          phone: "18126351314",
          productMoney: 100,
          realTotalMoney: 100,
          receiveTime: 0,
          serviceFee: 0,
          shopId: "5ed7058191596c5d2bee1022",
          shopName: "机动部队",
          status: 1,
          totalMoney: 100,
          tradeNo: "191591949026579",
          userId: "10005555",
          orderTotalMoney: 400,
        },
				/*order:{
					orderStatus:1,
					orderNum:'1312312313',
					userAccount:'13689745632',
					payMethods:0,
					orderSource:'APP订单',
					orderType:1,
					distribution:'申通快递',
					expressNum:'SF1255658523',
					sendNum:'12659854554',
					confirmTime:'15天',
					contractNum:'202014145448',
					contractType:0,
					agent:'李四癫杂技铺',
					sup:'张三疯供应管理公司',
					legal:'陈律师',
					contact:'王老五',
					linkPhone:'13557855545',
					postCode:'510210',
					address:'深圳龙华振华时代',
					total:8000,
					freight:12,
					orderTotal:8012,
					payment:8012
				},*/
				tableData: [{
						goodsImg: '王小虎',
						goodsName: 'iphone 6',
						goodsBrand: '苹果',
						goodsPrice: 6000,
						goodsArtNo: 1000,
						goodsSize: 'X',
						goodsColor: '白色',
						goodsCount: 1,
						inventory:100,
						total: 6000
					},
					{
						goodsImg: '王小虎',
						goodsName: 'iphone 6',
						goodsBrand: '苹果',
						goodsPrice: 6000,
						goodsArtNo: 1000,
						goodsSize: 'X',
						goodsColor: '金色',
						goodsCount: 1,
						inventory:60,
						total: 6000
					},
					{
						goodsImg: '王小虎',
						goodsName: 'iphone 6',
						goodsBrand: '苹果',
						goodsPrice: 6000,
						goodsArtNo: 1000,
						goodsSize: 'X',
						goodsColor: '黑色',
						goodsCount: 1,
						inventory:300,
						total: 6000
					}
				],
				totalPrice: 18000,
				tableData2: [{
						operator: '王小虎',
						createTime: '2020-04-14 11:50:00',
						orderStatus: 0,
						payStatus: 1,
						sendStatus: 0,
						note: '完成商品评价'
				}],
        orderStatus:{'0':'待付款','1':'待发货','2':'已发货','3':'已完成','4':'已关闭'},
        payType:{'1':'在线支付','2':'货到付款'},
        payMethods:{'0':'未支付','1':'支付宝','2':'微信','3':'银联卡','4':'知豆余额'},
				sendStatus:{'0':'未发货','1':'已发货'},
				orderType:{'0':'商家进货订单','1':'商家店铺订单'},
				contractType:{'0':'购销合同','1':'代理合同'},
				dialogShow:false,
				form:{
					payment:''
				},
				rules:{
					payment:[{
						required: true,
						message: '金额不能为空',
						trigger: 'blur'
					},{
						pattern:/^[1-9]\d*$/,
						message:'只能输大于0的数字'
					}]
				}
			}
		},
		computed:{
			...mapState('awadmin/page', [
			  'opened',
			  'current' //用户获取当前页面的地址，用于关闭
			])
			},
    mounted() {
      getAxiosApi('/supply/web/merchantOrder/findById',{},{id:this.$route.query.id},'get').then(res=>{
        this.order = res.data.sOrderDO
        this.userInfo = res.data.adress
      }).catch(_=>{})
    },
    methods: {
				...mapActions('awadmin/page', [
					'close',
				]),
        hanldeRefresh() {
          this.$router.push({
            path:'/refresh'
          })
        },
				handleCloseTab() {
					this.close({
						tagName: this.current
					});
					this.$router.go(-1)
				},
				edit() {
					this.dialogShow = true;
					this.form.payment = this.order.realTotalMoney;
				},
				submit(formName) {
					this.$refs[formName].validate((valid) => {
						if(valid) {
							this.$message.success(this.form.payment.toString())
              getAxiosApi('/supply/web/merchantOrder/editOrder',{},{id:this.$route.query.id,orderAmount:this.form.payment},'get')
              .then(res=>{
                if(res.status > 0 ){
                  this.$message.success('订单价格修改成功')
                }else{
                  this.$message.error(res.tip)
                }
              })
              .catch(_=>{})
							this.dialogShow = false;
						} else {
							console.log('error submit!!');
							return false;
						}
					});
				},
				closeOrder() {
					this.$confirm('你确定要关闭此订单吗?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$message({
							type: 'success',
							message: '关闭成功!'
						});
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消关闭'
						});
					});
				},
				cancelOrder() {
					this.$confirm('你确定要取消此订单吗?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$message({
							type: 'success',
							message: '操作成功!'
						});
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '取消操作'
						});
					});
				},
				goLogistics() {
					this.$router.push({
						path: '/zis/order-public/logistics'
					})
				},
				del() {
					this.$confirm('你确定要删除此订单吗?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
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
				}
			}
		}
</script>

<style scoped lang="scss">
.wrap{
	width: 1200px;
	.shopName{
		margin: 20px 0;
		font-size: 18px;
	}
	.header{
		background: #f3f3f3;
		height: 60px;
		line-height: 60px;
		.status{
			color: #F04844;
			padding-left: 20px;
		}
	}
	.main{
		h2{
			margin: 20px 0 30px;
		}
		.el-col{
			margin: 5px 0;
		}
		.price {
			height: 50px;
			line-height: 50px;
			background: #F9FAFC;
			padding-right: 20px;
			font-size: 16px;
			border: 1px solid #EBEEF5;
			border-top: none;
			.red {
				color: #F04844;
				font-weight: bold;
			}
		}
		.edit{
			color: #409EFF;
			padding-left: 16px;
			&:hover{
				cursor: pointer;
			}
		}
	}
}

</style>
