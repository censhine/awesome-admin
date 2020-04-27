<template>
	<d2-container>
		<div class="wrap">
			<div class="main">
        <d2-back title="返回" align="right"></d2-back>
					<h3>店铺详情</h3>
				<div class="age-info">
					<p>店名：<span>{{agent.shopName}}</span></p>
					<p>掌柜：<span>{{agent.shopKeeper}}</span></p>
					<p>联系电话：<span>{{agent.linkPhone}}</span></p>
					<p>开店时间：<span>{{agent.createTime}}</span></p>
					<p>所在地：<span>{{agent.address}}</span></p>
				</div>
				<div class="goods-list">
					<h4>商品列表</h4>
					<ul>
						<li v-for="(item,index) in goodsList" :key='index'>
							<div>
								<div class="goods-img">
									<img :src="item.goodsImg" alt="" />
								</div>
								<div class="goods-text">
									{{item.goodsText}}
								</div>
								<div class="goods-info clearfix">
									<span class="price">￥{{item.goodsPrice.toFixed(2)}}</span>
									<span class="amount">月销{{item.amount}}单</span>
								</div>
							</div>
						</li>
					</ul>
				</div>
							<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="100"
      layout="total, prev, pager, next"
      :total="1000">
    </el-pagination>
			</div>
		</div>
	</d2-container>
</template>

<script>
	export default{
		name:'ageDetail',
    components:{
		  d2Back:()=>import('@/components/d2-back'),
    },
		data(){
			return{
				agent:{
					shopName:'老子旗舰店',
					shopKeeper:'王二麻子',
					linkPhone:'13612368965',
					createTime:'2020.03.30',
					address:'深圳龙华'
				},
				currentPage1:5,
				goodsList:[

					{
						goodsImg:'https://img10.360buyimg.com/mobilecms/s250x250_jfs/t1/96074/26/12724/392724/5e4cb06bE28a3d8ab/307e39f48f2b44b2.jpg',
						goodsText:'iphone7 热卖 正品iphone7 热卖 正品',
						goodsPrice:6000,
						amount:1000
					},
					{
						goodsImg:'https://img10.360buyimg.com/mobilecms/s250x250_jfs/t1/96074/26/12724/392724/5e4cb06bE28a3d8ab/307e39f48f2b44b2.jpg',
						goodsText:'iphone8 热卖 正品',
						goodsPrice:8000,
						amount:2000
					},
					{
						goodsImg:'https://img10.360buyimg.com/mobilecms/s250x250_jfs/t1/96074/26/12724/392724/5e4cb06bE28a3d8ab/307e39f48f2b44b2.jpg',
						goodsText:'iphone9热卖 正品',
						goodsPrice:11000,
						amount:800
					},
					{
						goodsImg:'https://img10.360buyimg.com/mobilecms/s250x250_jfs/t1/96074/26/12724/392724/5e4cb06bE28a3d8ab/307e39f48f2b44b2.jpg',
						goodsText:'iphoneX 热卖 正品',
						goodsPrice:11600,
						amount:600
					},
					{
						goodsImg:'https://img10.360buyimg.com/mobilecms/s250x250_jfs/t1/96074/26/12724/392724/5e4cb06bE28a3d8ab/307e39f48f2b44b2.jpg',
						goodsText:'iphone7 热卖 正品',
						goodsPrice:6000,
						amount:1000
					},
					{
						goodsImg:'https://img10.360buyimg.com/mobilecms/s250x250_jfs/t1/96074/26/12724/392724/5e4cb06bE28a3d8ab/307e39f48f2b44b2.jpg',
						goodsText:'iphone8 热卖 正品',
						goodsPrice:8000,
						amount:2000
					},
					{
						goodsImg:'https://img10.360buyimg.com/mobilecms/s250x250_jfs/t1/96074/26/12724/392724/5e4cb06bE28a3d8ab/307e39f48f2b44b2.jpg',
						goodsText:'iphone9热卖 正品',
						goodsPrice:11000,
						amount:800
					},
					{
						goodsImg:'https://img10.360buyimg.com/mobilecms/s250x250_jfs/t1/96074/26/12724/392724/5e4cb06bE28a3d8ab/307e39f48f2b44b2.jpg',
						goodsText:'iphoneX 热卖 正品',
						goodsPrice:11600,
						amount:600
					}
				]
			}
		},
		methods:{
			 handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
		}

	}
</script>

<style scoped lang="scss">
  li{ list-style: none;margin:0; padding: 0}
.wrap{
	height: 100%;
	background: #fff;
	padding: 40px;
	.main{
		width: 1000px;
		.age-info{
	padding: 30px 0;
	margin: 20px 0;
	border-top: 1px solid #ccc;
	border-bottom: 1px solid #ccc;
	p{
		line-height: 28px;
	}
}
.goods-list{
	ul{
		width: 1200px;
		display: flex;
		margin-top: 30px;
		flex-wrap: wrap;
		li{
			width:200px;
			height: 300px;
			padding: 10px;
			margin-right: 64px;
			justify-content: space-around;
			margin-bottom: 30px;
			background: #f2f2f2;
			.goods-img{
				width: 180px;
				height: 180px;
				img{
					width: 100%;
					height: 100%;
				}
			}
			.goods-text{
				margin-top: 10px;
				height: 70px;
			}
			.goods-info{
				height: 60px;
				.price{
					color: #F0605B;
				}
				.amount{
					float: right;
					color: #999C9F;
				}
			}
		}
	}
}
	}
}

</style>
