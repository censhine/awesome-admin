<template>
	<aw-container>
		<div class="wrap">
      <aw-back title="返回" align="right"></aw-back>
			<el-row>
				<el-col :span='12'>
					<h3>发起方</h3>
				</el-col>
				<el-col :span='12'>
					<h3>签约方</h3>
				</el-col>
			</el-row>
			<el-row class='contract_box'>
				<el-col :span='11' class='box_item'>
					<el-row>
						<el-col :span='9'>
							<img class="shop_logo" src="'https://img30.360buyimg.com/babel/s100x100_jfs/t1/42403/23/6370/99357/5d0061e3Ec5d80f3a/bac5f5a37dccfa1e.png!cc_100x100.webp'," alt="" />
						</el-col>
						<el-col :span='15'>
							<p>店铺：<span>{{send.shopName}}</span></p>
							<p>联系人：<span>{{send.contact}}</span></p>
							<p>联系方式：<span>{{send.phone}}</span></p>
							<p>状态：<span>{{contractStatus[send.status]}}</span></p>
						</el-col>
					</el-row>
				</el-col>
				<el-col :span='11' class='box_item'>
					<el-row>
						<el-col :span='9'>
							<img class="shop_logo" src="https://img30.360buyimg.com/babel/s100x100_jfs/t1/42403/23/6370/99357/5d0061e3Ec5d80f3a/bac5f5a37dccfa1e.png!cc_100x100.webp" alt="" />
						</el-col>
						<el-col :span='15' class='sta'>
							<p>店铺：<span>{{sign.shopName}}</span></p>
							<p>联系人：<span>{{sign.contact}}</span></p>
							<p>联系方式：<span>{{sign.phone}}</span></p>
							<p>状态：<span>{{contractStatus[sign.status]}}</span></p>
							<div class="status">通 知</div>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
			<el-row class='title'>
				<h3>代理合同</h3>
			</el-row>
			<el-row class='img'>
				<img class="imgs" src="'https://img30.360buyimg.com/babel/s100x100_jfs/t1/42403/23/6370/99357/5d0061e3Ec5d80f3a/bac5f5a37dccfa1e.png!cc_100x100.webp'," alt="" />
			</el-row>
			<el-row class='title'>
				<h3>公正律师</h3>
			</el-row>
			<el-row>
				<el-col :span='4'>
					<img v-if="legal.legalPhoto" class="legal" :src="legal.legalPhoto" alt="" />
					<div v-else class="add" @click="addLegal">添加</div>
				</el-col>
				<el-col :span='15'>
					<p>{{legal.legalName}}</p>
					<p>{{legal.legalLawFirm}}</p>
					<p>{{legal.orderNum}}单</p>
				</el-col>
			</el-row>
			<el-row class='title'>
				<h3>公正反馈</h3>
			</el-row>
			<el-row>
				<p>评审结果：<span>{{feedbackStatus[feedback.result]}}</span></p>
				<p v-if="feedback.parsing">解析：<span>{{feedback.parsing}}</span></p>
				<p>评审时间：<span>{{feedback.inspectionTime}}</span></p>
				<p>签名：<span>{{feedback.signature}}</span></p>
				<p>签署时间：<span>{{feedback.signTime}}</span></p>
			</el-row>
		</div>
		<el-dialog
    	title='选择律师'
    	:visible.sync="dialogShow"
      width="40%"
    	>
    	 <el-row>
    	 	<el-col :span='3' style='margin-top: 8px;'>
    	 		输入搜索：
    	 	</el-col>
    	 	<el-col :span='10'>
    	 		<el-input placeholder='用户名/姓名/联系方式'></el-input>
    	 	</el-col>
    	 </el-row>
    	 <div class="legal_box">
    	 	<el-row>
    	 		<el-col  v-for='(item,index) in legalList' :key='index' @click.native='getLegal(item)' class='list'>
    	 			<div class="legal_photo">
    	 				<img :src="item.legalPhoto" alt="" />
    	 			</div>
    	 			<p class="legal_name">{{item.legalName}}</p>
    	 			<p class="legal_lawFirm">{{item.legalLawFirm}}</p>
    	 			<p class="legal_num">{{item.orderNum}}单</p>
    	 		</el-col>
    	 	</el-row>
    	 </div>
      <span slot="footer" class="dialog-footer">
	      <el-button  @click="dialogShow = false">取 消</el-button>
	    	<el-button type="primary" @click="submit">确 定</el-button>
	    </span>
    </el-dialog>

	</aw-container>
</template>

<script>
	export default{
		data() {
			return{
				send:{
					shopName:'张三旗舰店',
					contact:'张三疯',
					phone:'13412345678',
					status:0
				},
				sign:{
					shopName:'李四旗舰店',
					contact:'李四癫',
					phone:'13678965432',
					status:1
				},
				contractStatus:{'0':'未签署','1':'已签署'},
				legal:{
					legalPhoto:null,
					legalName:'李律师',
					legalLawFirm:'深圳仁和律师行',
					orderNum:300
				},
				dialogShow:false,
				legalList:[
						{
						  legalPhoto:'https://img30.360buyimg.com/babel/s100x100_jfs/t1/42403/23/6370/99357/5d0061e3Ec5d80f3a/bac5f5a37dccfa1e.png!cc_100x100.webp',
						  legalName:'李律师',
						  legalLawFirm:'深圳富士康律师所深圳富士康律师所',
						  orderNum:100
						},
						{
						  legalPhoto:'https://img30.360buyimg.com/babel/s100x100_jfs/t1/42403/23/6370/99357/5d0061e3Ec5d80f3a/bac5f5a37dccfa1e.png!cc_100x100.webp',
						  legalName:'张律师',
						  legalLawFirm:'深圳富士康律师所深圳富士康律师所',
						  orderNum:80
						},
						{
						  legalPhoto:'https://img30.360buyimg.com/babel/s100x100_jfs/t1/42403/23/6370/99357/5d0061e3Ec5d80f3a/bac5f5a37dccfa1e.png!cc_100x100.webp',
						  legalName:'陈律师',
						  legalLawFirm:'深圳富士康律师康律师所',
						  orderNum:300
						},
						{
						  legalPhoto:'https://img30.360buyimg.com/babel/s100x100_jfs/t1/42403/23/6370/99357/5d0061e3Ec5d80f3a/bac5f5a37dccfa1e.png!cc_100x100.webp',
						  legalName:'邱律师',
						  legalLawFirm:'深圳富士康律师所深律师所',
						  orderNum:50
						},
						{
						  legalPhoto:'https://img30.360buyimg.com/babel/s100x100_jfs/t1/42403/23/6370/99357/5d0061e3Ec5d80f3a/bac5f5a37dccfa1e.png!cc_100x100.webp',
						  legalName:'李律师',
						  legalLawFirm:'深圳富士康律师所深圳富士康律师所',
						  orderNum:60
						},
						{
						  legalPhoto:'https://img30.360buyimg.com/babel/s100x100_jfs/t1/42403/23/6370/99357/5d0061e3Ec5d80f3a/bac5f5a37dccfa1e.png!cc_100x100.webp',
						  legalName:'张律师',
						  legalLawFirm:'深圳富士康律师所深圳富士康律师所',
						  orderNum:220
						},
						{
						  legalPhoto:'https://img30.360buyimg.com/babel/s100x100_jfs/t1/42403/23/6370/99357/5d0061e3Ec5d80f3a/bac5f5a37dccfa1e.png!cc_100x100.webp',
						  legalName:'陈律师',
						  legalLawFirm:'深圳富士康律师康律师所',
						  orderNum:280
						},
						{
						  legalPhoto:'https://img30.360buyimg.com/babel/s100x100_jfs/t1/42403/23/6370/99357/5d0061e3Ec5d80f3a/bac5f5a37dccfa1e.png!cc_100x100.webp',
						  legalName:'邱律师',
						  legalLawFirm:'深圳富士康律师所深律师所',
						  orderNum:10
						}
					],
					feedback:{
						result:0,
						parsing:'不符合第三方',
						inspectionTime:'2020-04-03 15:30:00',
						signature:'李四癫',
						signTime:'2020-03-03 11:30:00'
					},
					feedbackStatus:{'0':'不合格','1':'合格'}
			}
		},
		methods:{
			addLegal(){
				this.dialogShow = true;
			},
			submit(){
      			this.dialogShow = false;
      		},
      		getLegal(item){
      			this.legal = item;
      		}
		}
	}
</script>

<style scoped lang="scss">
.wrap{
	width: 800px;
	padding: 40px;
	border: 1px solid #ccc;
	.shop_logo{
		width: 100px;
		height: 100px;
	}
	.legal{
		width: 100px;
		height: 100px;
		border-radius: 50%;
	}
	.add{
		width: 100px;
		height: 100px;
		border-radius: 50%;
		line-height: 100px;
		text-align: center;
		border: 2px solid #a4a4a4;
		&:hover{
			cursor: pointer;
		}
	}
	p{
		margin-top: 5px;
	}
	.contract_box{
		margin-top: 10px;
		.box_item{
			padding: 10px;
			background: #f2f2f2;
				margin-right: 6px;
				box-sizing: border-box;
				&:nth-child(2){
					margin-right: 0;
				}
				.sta{
					position: relative;
					.status{
						position: absolute;
						bottom: -6px;
						right: 0;
						width: 50px;
						height: 30px;
						font-size: 12px;
						background: #409EFF;
						color: #fff;
						border-radius: 3px;
						text-align: center;
						line-height: 30px;
						&:hover{
							cursor: pointer;
						}
					}
				}
		}
	}
	.title{
		margin-top: 20px;
		line-height: 40px;
	}
	.img{
		width: 240px;
		height: 300px;
		.imgs{
			width: 100%;
			height: 100%;
		}
	}
}
.legal_box{
	background: #f2f2f2;
	margin-top: 30px;
	padding: 20px;
	text-align: center;
	.legal_photo{
		height: 100px;
		img{
			width: 100px;
			height: 100%;
			border-radius: 50%;
		}
	}
	.legal_name{
		margin-top: 6px;
	}
	.list{
		margin-top: 20px;
		float: left;
		width: 150px;
		margin-right: 29px;
		&:nth-child(4n){
			margin-right: 0;
		}
		&:hover{
			cursor: pointer;
		}
	}
}
</style>
