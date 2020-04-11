<template>
  <aw-container>
    <div class="aw-table-view">
      <el-table :data="[{status:'待审核'}]" border class="aw-item-status">
        <el-table-column prop="status"></el-table-column>
      </el-table>
        <el-table :data="[{title:'审核详情'}]" border class="aw-item-title">
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
    <div class="aw-table-list">
      <el-table :data="[{title:'申请人信息'}]" border class="aw-item-title">
        <el-table-column prop="title"></el-table-column>
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
    <p style="text-align: center">
      <el-button
        @click="handleCloseTab"
        size="mini"
        type="default"
      >关闭</el-button>
    </p>
  </aw-container>
</template>

<script>
    import {mapState,mapActions} from 'vuex'
    export default {
        name: "aw-age-view",
        data(){
          return {
            tableData: this._generalData(this.$route.query),
            detail: this._generalData(this.$route.query),
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
            //this.$message({message:this.current})
            let tagName = this.current
            this.close({tagName});
            this.$router.go(-1)
          }
        }
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
</style>
