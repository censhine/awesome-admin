<template>
  <aw-container>
    <p style="text-align: right; margin-bottom: 10px;">
      <aw-back title="返回" align="right"></aw-back>
    </p>
    <div class="aw-table-view">
        <el-row>
          <el-col :span="4" style="text-align: center; background:#F9FAFC;border:1px solid #ededed;height: 221px; box-sizing: border-box">
            <div style="margin-top: 10px">
              <el-image src="http://www.zis.mobi/images/new/2_2.png" style="width:120px;border:1px solid #ededed;height: 120px;"/>
              <p>18000000000</p>
              <el-button type="danger" size="mini">商家</el-button>
            </div>
          </el-col>
          <el-col :span="10">
            <z-table :table-data="[
            {key:'用户ID',val:8447466},
            {key:'昵称',val:'Windir'},
            {key:'性别',val:'男'},
            {key:'生日',val:'1984年6月22日'},
            {key:'城市',val:'广东省深圳市'}
            ]"/>
          </el-col>
          <el-col :span="10">
            <z-table :table-data="[
            {key:'个性签名',val:'无'},
            {key:'注册时间',val:'2017-07-24 17:25:38'},
            {key:'用户来源',val:'PC端'},
            {key:'角色备注',val:'正常账号'},
            {key:'其他',val:'无'}
            ]"/>
          </el-col>
        </el-row>
    </div>
    <div class="aw-table-list">
      <el-table border :data="[]" class="static-table">
        <el-table-column label="统计信息"></el-table-column>
      </el-table>
      <el-table border :data="staticTableData">
        <el-table-column label="订单数量" prop="orders"></el-table-column>
        <el-table-column label="优惠券（张）" prop="discount_cards"></el-table-column>
        <el-table-column label="商品评价" prop="comments"></el-table-column>
        <el-table-column label="退货记录" prop="return_nums"></el-table-column>
        <el-table-column label="登录次数" prop="login_times"></el-table-column>
        <el-table-column label="关注" prop="focus"></el-table-column>
        <el-table-column label="粉丝" prop="fans"></el-table-column>
      </el-table>
      <el-table border :data="staticTableData">
        <el-table-column label="收藏商品" prop="collect_goods"></el-table-column>
        <el-table-column label="余额" prop="balance"></el-table-column>
        <el-table-column label="知豆" prop="zhidou"></el-table-column>
        <el-table-column label="FNT" prop="fnt"></el-table-column>
        <el-table-column label=" " ></el-table-column>
        <el-table-column label=" " ></el-table-column>
        <el-table-column label=" " ></el-table-column>
      </el-table>
    </div>

    <div class="aw-table-list">
      <el-table border :data="[]" class="static-table">
        <el-table-column label="收货地址"></el-table-column>
      </el-table>
      <el-table border :data="addressTableData">
        <el-table-column label="姓名" prop="name" align="center"></el-table-column>
        <el-table-column label="手机号码" prop="phone" align="center"></el-table-column>
        <el-table-column label="详细地址" prop="address" align="center"></el-table-column>
        <el-table-column label="邮政编码" prop="post_code" align="center"></el-table-column>
        <el-table-column label="默认地址" prop="is_default" align="center">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.is_default" :checked="scope.row.is_default?true:false"></el-checkbox>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="aw-table-list">
      <el-table border :data="[]" class="static-table">
        <el-table-column label="订单记录"></el-table-column>
      </el-table>
      <el-table border :data="orderTableData">
        <el-table-column label="订单编号" prop="order_sn" align="center"></el-table-column>
        <el-table-column label="提交时间" prop="create_time" align="center"></el-table-column>
        <el-table-column label="用户账号" prop="user_name" align="center"></el-table-column>
        <el-table-column label="订单金额" prop="order_amount" align="center"></el-table-column>
        <el-table-column label="支付方式" prop="payment_method" align="center"></el-table-column>
        <el-table-column label="订单来源" prop="order_source" align="center"></el-table-column>
        <el-table-column label="订单状态" prop="order_status" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="$router.push({path:'/aw/user/list/view',query:{...scope.row}})">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </aw-container>
</template>

<script>
    import zTable from '@/components/aw-table'
    import {mapState,mapActions} from 'vuex'
    export default {
        name: "aw-user-list-view",
        data(){
          return {
            tableData: this._generalData(this.$route.query),
            detail: this._generalData(this.$route.query),
            staticTableData:[
              {orders:100,discount_cards:12,comments:13,return_nums:12,login_times:109,focus:123,fans:135,collect_goods:200,balance:1231,zhidou:12334,fnt:1231342},
            ],
            addressTableData:[
              {name: '张山',phone:18756789989,address:'广东省深圳市南山区科兴科学园',post_code:518000,is_default:0},
              {name: '张山',phone:18756789989,address:'广东省深圳市南山区科兴科学园',post_code:518000,is_default:0},
              {name: '张山',phone:18756789989,address:'广东省深圳市南山区科兴科学园',post_code:518000,is_default:1},
              {name: '张山',phone:18756789989,address:'广东省深圳市南山区科兴科学园',post_code:518000,is_default:0},
              {name: '张山',phone:18756789989,address:'广东省深圳市南山区科兴科学园',post_code:518000,is_default:0},
            ],
            orderTableData:[
              {order_sn:201707196398345,create_time:'2017-07-19 14:48:38',user_name:'18000000000',order_amount:1200,order_status:1,payment_method:'微信支付',order_source:'pc端'},
              {order_sn:201707196398345,create_time:'2017-07-19 14:48:38',user_name:'18000000000',order_amount:1200,order_status:1,payment_method:'微信支付',order_source:'pc端'},
              {order_sn:201707196398345,create_time:'2017-07-19 14:48:38',user_name:'18000000000',order_amount:1200,order_status:1,payment_method:'微信支付',order_source:'pc端'},
              {order_sn:201707196398345,create_time:'2017-07-19 14:48:38',user_name:'18000000000',order_amount:1200,order_status:1,payment_method:'微信支付',order_source:'pc端'},
            ]
          }
        },
        computed: {
        ...mapState('awadmin/page', [
          'opened',
          'current' //用户获取当前页面的地址，用于关闭
        ])
      },
        created() {
          this.$message({message:this.$route.query.id})
        },
        methods:{
          ...mapActions('awadmin/page', [
            'close',
          ]),
          _generalData(obj){
              let arr=[]
              for(let i in obj){
                arr.push({key:i,val:obj[i]})
              }
              return arr
          },
          handleCloseTab(){
            this.close({tagName:this.current});
            this.$router.go(-1)
          }
        },
      components:{zTable}
    }
</script>

<style lang="scss">
  .aw-table-view{
    .aw-item-status{
      color:red;
    }
    .aw-item-title td{
      text-align: center;
    }
    table th{
      display: none;
    }
    table tr td:first-child{
      background: #F9FAFC;
    }
  }
  .aw-table-list{margin-top: 20px;}
  .static-table .el-table__empty-block{display: none}
</style>
