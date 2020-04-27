<template>
  <d2-container>
    <div class="zis-table-view">
      <el-table :data="[{status:'待审核'}]" border class="zis-item-status">
        <el-table-column prop="status"></el-table-column>
      </el-table>
        <el-table :data="[{title:'审核详情'}]" border class="zis-item-title">
          <el-table-column prop="title"></el-table-column>
        </el-table>
        <el-table
        border
        :data="tableData"
        >
          <el-table-column prop="key" width=200></el-table-column>
          <el-table-column prop="val"></el-table-column>
        </el-table>
    </div>
    <div class="zis-table-list">
      <el-table :data="[{title:'申请人信息'}]" border class="zis-item-title">
<!--        <el-table-column prop="title"></el-table-column>-->
      </el-table>
      <el-table :data="[this.$route.query]" border>
        <el-table-column prop="id" width=200 label="用户ID"></el-table-column>
        <el-table-column prop="brand_id" label="用户账号"></el-table-column>
        <el-table-column prop="goods_category_id" width=200 label="用户昵称"></el-table-column>
        <el-table-column prop="name" label="联系方式"></el-table-column>
        <el-table-column prop="phonetic" width=200 label="地区"></el-table-column>
        <el-table-column prop="category_name" label="提交时间"></el-table-column>
      </el-table>
    </div>
    <p style="text-align: center; margin-top: 20px;">
      <d2-back title="关闭" align="center" icon-class="el-icon-close"></d2-back>
    </p>
  </d2-container>
</template>

<script>
    import {mapState,mapActions} from 'vuex'
    export default {
        name: "zis-age-view",
        data(){
          return {
            tableData: this._generalData(this.$route.query),
            detail: this._generalData(this.$route.query),
          }
        },
        computed: {
        ...mapState('d2admin/page', [
          'opened',
          'current' //用户获取当前页面的地址，用于关闭
        ])
      },
        created() {
          this.$message({message:this.$route.query.id})
        },
        methods:{
          ...mapActions('d2admin/page', [
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
        }
    }
</script>

<style lang="scss">
  .zis-table-view{
    .zis-item-status{
      color:red;
    }
    .zis-item-title td{
      text-align: center;
    }
    table th{
      display: none;
    }
    table tr td:first-child{
      background: #F9FAFC;
    }
  }
</style>
