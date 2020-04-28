<template>
    <aw-container class="goods-comments">
      <div style="width: 800px">
        <el-row>
          <el-col :span="12">
            <el-row>
              <div><b>编号：</b>{{result.id}}</div>
            </el-row>
            <el-row>
              <div><b>商品名称：</b>{{result.goods_name}}</div>
            </el-row>
            <el-row>
              <div><b>评分：</b>
              <el-rate style="display: inline-block" v-model="result.ratings"
                       disabled
                       show-score
                       text-color="#ff9900"
                       score-template=""></el-rate>
              </div>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>

            </el-row>
            <el-row>
              <div><b>用户昵称</b>：{{result.nick_name}}</div>
            </el-row>
            <el-row>
              <div><b>创建时间</b>：{{result.create_time}}</div>
            </el-row>
          </el-col>
        </el-row>

        <el-row>

            <div class="popover-image">
              <template v-for="item in result.imgs">
                <el-image
                  :src="item"
                  @click.native="$preview(item)"
                  style="width: 30px;height: 30px; margin-right: 10px"
                  fit="fill"/>
              </template>
            </div>
        </el-row>
        <el-row>

          <el-row>
            <b>评论内容:</b><br/>
            {{result.comments}}
          </el-row>

          <aw-back title="返回" align="left" style="margin-top: 15px;"></aw-back>
        </el-row>
      </div>
    </aw-container>
</template>

<script>
import d2Back from '@/components/aw-back'
export default {
    components:{
      d2Back
    },
    data() {
      return {
        result:{
          id: 10001,
          nick_name: '林蛋大',
          goods_name: 'iphone 12',
          comments: '这是产品评论这是产品评论这是产品评论这是产品评论这是产品评论这是产品评论这是产品评论',
          ratings: 5,
          create_time: '2020-04-21 10:20:20',
          imgs:[
            'http://192.168.1.125/api/v1/storage/method/get.storage.thumb/code/goods_brand?url=http%3A%2F%2Fwww.zis.mobi%2Fimages%2Fnew%2Fa.png',
            'http://192.168.1.125/api/v1/storage/method/get.storage.thumb/code/goods_brand?url=http%3A%2F%2Fwww.zis.mobi%2Fimages%2Fnew%2Fa.png',
            'http://192.168.1.125/api/v1/storage/method/get.storage.thumb/code/goods_brand?url=http%3A%2F%2Fwww.zis.mobi%2Fimages%2Fnew%2Fa.png',
            'http://192.168.1.125/api/v1/storage/method/get.storage.thumb/code/goods_brand?url=http%3A%2F%2Fwww.zis.mobi%2Fimages%2Fnew%2Fa.png',
            'http://192.168.1.125/api/v1/storage/method/get.storage.thumb/code/goods_brand?url=http%3A%2F%2Fwww.zis.mobi%2Fimages%2Fnew%2Fa.png',
            'http://192.168.1.125/api/v1/storage/method/get.storage.thumb/code/goods_brand?url=http%3A%2F%2Fwww.zis.mobi%2Fimages%2Fnew%2Fa.png',
          ]
        }
      }
    }
}
</script>

<style lang="scss">
  .goods-comments{
    b{
      font-weight: bold;
    }
    div{
      padding-top: 2px;
      padding-bottom: 2px;
    }
  }
</style>
