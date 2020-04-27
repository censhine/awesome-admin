<template>
  <d2-container>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column type="expand" >
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item>{{props.row.id}}</el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="分类ID"
      prop="id">
    </el-table-column>
    <el-table-column
      label="分类名称"
      prop="name">
    </el-table-column>
    <el-table-column
      label="分类描述"
      prop="desc">
    </el-table-column>

    <el-table-column
      label="操作"
      >
      <el-button type="default" size="mini" @click="">创建子分类</el-button>
      <el-button type="danger" size="mini" @click="handleDeleteData">删除</el-button>
      <el-button type="default" size="mini" @click="">修改</el-button>
    </el-table-column>

  </el-table>
<!--  <d2-module-index-menu :menu="menu"/>-->
  </d2-container>
</template>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
  import menu from '@/menu/modules/zis-goods'
  export default {
    data() {
      return {
        menu,
        tableData: [{
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987123',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987125',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987126',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }]
      }
    },
    methods: {
      handleDeleteData(){
        this.$alert('您确定要删除吗？', '信息提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      }
    }
  }
</script>

