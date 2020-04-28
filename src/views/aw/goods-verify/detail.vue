<template>
	<aw-container>
		<div class="wrap clearfix">
      <aw-back title="返回" align="right"></aw-back>
			<div class="left_box left">
				 <page-media
		             ref="goodsMedia"
		             :image="imgUrl">
		        </page-media>
			</div>
			<div class="rf_box">
				<div class="goods-name aw-pb-5">
					<b>俞兆林 冰丝短袖网眼T恤男夏季超薄款运动速干透气网纱镂空大码半袖体恤 V领黑色 4XL</b>
				</div>
				<div class="summary-first">
					<div class="summary-price-wrap aw-pt-10">
						<div class="summary-price">
							<div class="dt">市场价</div>
							<div class="dd">
								<span style="text-decoration: line-through;">
                      <span>￥</span>
								<span>21999</span>
								</span>
							</div>
						</div>
						<div class="summary-price">
							<div class="dt" style="line-height: 28px;">本店价</div>
							<div class="dd">
								<span class="price">
                      <span>￥</span>
								<span style="font-size: 22px;"><b>4000</b></span>
								</span>
							</div>
						</div>
						<div class="summary-price price-bg">
							<div class="dt">总库存</div>
							<div class="dd"><span>100</span></div>
						</div>
						<div class="summary-info">
							<div class="content">
								<p>评价数</p>
								<span>20</span>
							</div>

							<div class="content">
								<p>累计销量</p>
								<span>20</span>
							</div>
						</div>
					</div>
				</div>
				<div v-for="(value, key) in specConfig" :key="key" class="spec">
					<div style="display: inline-block;">
						<div class="dt">{{value.name}}</div>
						<div class="dd">
							<div v-for="(item, index) in value.spec_item"
                   @click="setBorder(index)"
                   :ref="`item${index}`"
								:key="index"
								:class="{'active': value.active === item.spec_item_id, 'disabled': item.disabled}"
								 class="goods-spec">
								<span class="item-name">{{item.item_name}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<el-tabs v-model="activeName" style="clear: both">
			<el-tab-pane label="详情描述" name="content">
				<div class="parameter aw-mb-15">
					<ul class="parameter-list">
						<li>
							<span>品牌： 俞兆林（YUZHAOLIN）
商品名称：俞兆林 冰丝短袖网眼T恤男夏季超薄款运动速干透气网纱镂空大码半袖体恤 V领黑色 4XL商品编号：43819354401店铺： 俞兆林俏佳专卖店商品毛重：200.00g材质：聚酯纤维袖长：短袖适用季节：夏季上市时间：2018年夏季厚度：薄款适用人群：青年流行元素：镂空版型：修身型风格：青春休闲基础风格：青春流行图案：纯色，其它领型：其它</span>
						</li>
					</ul>
				</div>
				<div class="mce-content-body">
					<img src="https://img10.360buyimg.com/imgzone/jfs/t1/14435/26/9214/268999/5c7d029cEfa18de0d/8bf2615032de5d0e.jpg" alt="" />
				</div>
			</el-tab-pane>

			<el-tab-pane label="累计评价" name="attr">
				评价内容
			</el-tab-pane>
		</el-tabs>

	</aw-container>

</template>

<script>
	export default {
		 components: {
    		'PageMedia': () => import('./components/PageMedia')
 		 },
		data() {
			return {
				imgUrl: [                
					{
						index: 1,
						url: 'https://img14.360buyimg.com/n0/jfs/t1/18745/20/11316/542184/5c8f1730E08fc84f8/4b4e196956302b74.jpg'
					},                  {
						index: 2,
						url: 'https://img14.360buyimg.com/n0/jfs/t1/18745/20/11316/542184/5c8f1730E08fc84f8/4b4e196956302b74.jpg'
					},                  {
						index: 3,
						url: 'https://img14.360buyimg.com/n0/jfs/t1/75409/32/5472/123878/5d39b8f5Ec010c513/318a89422a2cc9cb.jpg'
					},
					{
						index: 4,
						url: 'https://img14.360buyimg.com/n0/jfs/t1/75409/32/5472/123878/5d39b8f5Ec010c513/318a89422a2cc9cb.jpg'
					},                  {
						index: 5,
						url: 'https://img14.360buyimg.com/n0/jfs/t1/75409/32/5472/123878/5d39b8f5Ec010c513/318a89422a2cc9cb.jpg'
					},                  {
						index: 6,
						url: 'https://img14.360buyimg.com/n0/jfs/t1/75409/32/5472/123878/5d39b8f5Ec010c513/318a89422a2cc9cb.jpg'
					},
					 {
						index: 7,
						url: 'https://img14.360buyimg.com/n0/jfs/t1/75409/32/5472/123878/5d39b8f5Ec010c513/318a89422a2cc9cb.jpg'
					},
					 {
						index: 2,
						url: 'https://img14.360buyimg.com/n0/jfs/t1/75409/32/5472/123878/5d39b8f5Ec010c513/318a89422a2cc9cb.jpg'
					},
					 {
						index: 9,
						url: 'https://img14.360buyimg.com/n0/jfs/t1/75409/32/5472/123878/5d39b8f5Ec010c513/318a89422a2cc9cb.jpg'
					}                                                
				],
				activeName: 'content',
				specConfig: [{
						spec_id: 1,
						name: "颜色",
						spec_type: 2,
						spec_item: [{
								image: [],
								item_name: "黑色",
								spec_item_id: 208
						},
						{
								image: [],
								item_name: "白色",
								spec_item_id: 218
							}

						]
					},
					{
						spec_id: 2,
						name: "CPU",
						spec_type: 3,
						spec_item: [{
								image: [],
								item_name: "I5",
								spec_item_id: 220,
								disabled:true
						},
						{
								image: [],
								item_name: "I7",
								spec_item_id: 226
							}

						]
					},
					{
						spec_id: 3,
						name: "屏幕",
						spec_type: 4,
						spec_item: [{
								image: [],
								item_name: "13寸",
								spec_item_id: 201
						},
						{
								image: [],
								item_name: "14寸",
								spec_item_id: 209
							}

						]
					}

				]
			}
		},
    methods:{
      setBorder(index) {
        this.$message.success(index.toString())
        this.class = 'active'
      }
    },
		mounted() {

		}
	}
</script>

<style scoped lang="scss">
	.left_box {
		width: 460px;
		height: 560px;
    float:left;
		.big-img {
			img {
				width: 458px;
				height: 458px;
				border: 1px solid #f2f6fc;
			}
		}
		.little_img {
			width: 460px;
			height: 60px;
			position: relative;
			ul {
				/*float: left;*/
				/*width: 370px;
				height: 56px;*/
				top: 0;
				position: absolute;
				overflow: hidden;
			}
			.aleft,
			.aright {
				float: left;
				font-size: 36px;
				color: #dcdfe6;
				margin-top: 10px;
				&:hover {
					cursor: pointer;
				}
			}
			.aright {
				float: right;
			}
			img {
				width: 56px;
				height: 56px;
				margin-right: 18px;
			}
		}
	}

	.rf_box {
		margin-left: 480px;
		font-size: 14px;
		color: #333;
		.dt {
			float: left;
			padding-left: 10px;
			line-height: 20px;
		}
		.dd {
			margin-left: 80px;
			.price {
				color: red;
				overflow: hidden;
			}
		}
		.goods-name {
			margin-bottom: 20px;
			color: #333;
			font-size: 16px;
		}
		.product-name {
			color: red;
		}
		.summary-first {
			position: relative;
			padding: 5px 0;
			.summary-price-wrap {
				background: #f3f3f3;
				padding-top:10px;
				.summary-price {
					position: relative;
					padding-bottom: 10px;
				}
				.summary-info {
					position: absolute;
					right: 10px;
					top: 10px;
					.content {
						text-align: center;
						width: 100px;
						float: left;
						p {
							margin: 5px 0;
						}
						span {
							color: #005ea7;
						}
					}
				}
			}
		}
		.spec{
			margin-top: 20px;
		}
		.goods-spec {
    float: left;
    font-size: 12px;
    line-height: 38px;
    margin: 0 5px 5px 0;
    border: 1px solid #f2f2f2;
    &.active {
      color: red;
      border-color: red;
    }
    &:hover {
    	border-color: #409EFF;
      cursor: pointer;
      color: #409EFF;
    }
    &.disabled {
      cursor: not-allowed;
      color: #c0c4cc;
      border: 1px dashed #ebeef5;
      .item-info {
        opacity: 0.5;
      }
    }
    .item-name {
      padding: 0 20px;
    }
    .item-info {
      margin: 1px;
      width: 36px;
      height: 36px;
      line-height: 16px;
    }
  }
	}
</style>
