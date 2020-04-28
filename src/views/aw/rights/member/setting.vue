<template>
    <aw-container>
      <table ref="goods" cellspacing="0">
        <tr>
          <td colspan="6"><el-checkbox></el-checkbox>商品管理</td>
        </tr>
        <tr>
          <td><el-checkbox></el-checkbox>商品添加/编辑</td>
          <td><el-checkbox></el-checkbox>商品删除/恢复</td>
          <td><el-checkbox></el-checkbox>分类添加/编辑</td>
          <td><el-checkbox></el-checkbox>分类转移/删除</td>
          <td><el-checkbox></el-checkbox>商品属性管理</td>
          <td><el-checkbox></el-checkbox>商品评价管理</td>
        </tr>
        <tr>
          <td><el-checkbox></el-checkbox>商品自动上下架</td>
          <td><el-checkbox></el-checkbox>图片批量处理</td>
          <td><el-checkbox></el-checkbox>商品批量导出</td>
          <td><el-checkbox></el-checkbox>图片库管理</td>
          <td><el-checkbox></el-checkbox>商品添加/编辑</td>
          <td><el-checkbox></el-checkbox>商品删除/恢复</td>
        </tr>
        <tr>
          <td><el-checkbox></el-checkbox>分类转移/删除</td>
          <td><el-checkbox></el-checkbox>商品属性管理</td>
          <td><el-checkbox></el-checkbox>商品评价管理</td>
          <td><el-checkbox></el-checkbox>品自动上下架</td>
          <td><el-checkbox></el-checkbox>图片批量处理</td>
          <td><el-checkbox></el-checkbox>商品批量导出</td>
        </tr>
      </table>


    <table ref="user" cellspacing="0">
      <tr>
        <td colspan="6"><el-checkbox></el-checkbox>用户管理</td>
      </tr>
      <tr>
        <td><el-checkbox></el-checkbox>商品添加/编辑</td>
        <td><el-checkbox></el-checkbox> 商品删除/恢复</td>
        <td><el-checkbox></el-checkbox> 分类添加/编辑</td>
        <td><el-checkbox></el-checkbox> 分类转移/删除</td>
        <td><el-checkbox></el-checkbox>商品属性管理</td>
        <td><el-checkbox></el-checkbox> 商品评价管理</td>
      </tr>

      <tr>
        <td><el-checkbox></el-checkbox> 商品自动上下架</td>
        <td><el-checkbox></el-checkbox>图片批量处理</td>
        <td><el-checkbox></el-checkbox> 商品批量导出</td>
        <td><el-checkbox></el-checkbox>图片库管理</td>
        <td><el-checkbox></el-checkbox>商品添加/编辑</td>
        <td><el-checkbox></el-checkbox>商品删除/恢复</td>
      </tr>
      <tr>
        <td><el-checkbox></el-checkbox>分类转移/删除</td>
        <td><el-checkbox></el-checkbox> 商品属性管理</td>
        <td><el-checkbox></el-checkbox>商品评价管理</td>
        <td><el-checkbox></el-checkbox> 商品自动上下架</td>
        <td><el-checkbox></el-checkbox>图片批量处理</td>
        <td><el-checkbox></el-checkbox> 商品批量导出</td>
      </tr>
    </table>

      <table cellspacing="0" ref="consume">
        <tr>
          <td colspan="6"><el-checkbox></el-checkbox>运营管理</td>
        </tr>
        <tr>
          <td><el-checkbox></el-checkbox>商品添加/编辑</td>
          <td><el-checkbox></el-checkbox>商品删除/恢复</td>
          <td><el-checkbox></el-checkbox>分类添加/编辑</td>
          <td><el-checkbox></el-checkbox>分类转移/删除</td>
          <td><el-checkbox></el-checkbox>商品属性管理</td>
          <td><el-checkbox></el-checkbox> 商品评价管理</td>
        </tr>
        <tr>
          <td><el-checkbox></el-checkbox>商品自动上下架</td>
          <td><el-checkbox></el-checkbox>图片批量处理</td>
          <td><el-checkbox></el-checkbox>商品批量导出</td>
          <td><el-checkbox></el-checkbox> 图片库管理</td>
          <td><el-checkbox></el-checkbox>商品添加/编辑</td>
          <td><el-checkbox></el-checkbox>商品删除/恢复</td>
        </tr>
        <tr>
          <td><el-checkbox></el-checkbox>分类转移/删除</td>
          <td><el-checkbox></el-checkbox>商品属性管理</td>
          <td><el-checkbox></el-checkbox>商品评价管理</td>
          <td><el-checkbox></el-checkbox>商品自动上下架</td>
          <td><el-checkbox></el-checkbox> 图片批量处理</td>
          <td><el-checkbox></el-checkbox>商品批量导出</td>
        </tr>
      </table>

      <table cellspacing="0">
        <tr>
          <td colspan="24" style="text-align: center;background: #ededed;"><el-checkbox></el-checkbox>全部选择</td>
        </tr>
      </table>

      <p style="text-align: center; width: 100%; display: block;">
        <el-button type="success" size="mini">保存</el-button>
        <aw-back title="返回" align="center" style="margin-left: 160px; margin-top: -30px;"></aw-back>
      </p>
    </aw-container>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>
  table{
    margin-bottom: 20px;
    width: 100%;
  }
  table tr{
    border-collapse: collapse;
    border-spacing: 0;
  }
  table tr td {
    collapse: collapse;
    border-bottom: 1px solid #ededed;
    padding: 8px;
    border-right: 1px solid #ededed;
    input[type='checkbox'] {
      padding: 3px 5px;
    }
  }
  table {
    border: 1px solid #ededed;
  }
</style>
