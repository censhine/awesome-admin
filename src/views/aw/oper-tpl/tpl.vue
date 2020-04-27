<template>
  <d2-container>
    <div class="main">
      <el-form class="layui-form" v-model="form" ref="form">
        <div>
          <h2>{{d.Name}}模板</h2>
        </div>
        <div>
          <label><span>*</span>礼包名称:</label>
          <p><input type="text" v-model="d.Name+'模板'" disabled=""/></p>
        </div>
        <div>
          <label><span>*</span>礼包图片:</label>
          <p><img :src="d.Img" alt="" /></p>
        </div>
        <div>
          <label><span>*</span>礼包价格:</label>
          <p style="margin-left: 158px;margin-top: 30px;">价格：<span class="unit">¥</span><input type="text" name="set1" v-model="d.Price" readonly style="text-indent: 40px; display: inline-block;width: 100px;" required lay-verify="required" placeholder="" />&nbsp;&nbsp;元<span style="padding-left: 10px;">(如果不限制,输入0)</span></p>
        </div>
        <div>
          <label><span>*</span>直推奖:</label>
          <p style="margin-left: 158px;margin-top: 30px;">奖项名称<input style="margin-left: 13px; display: inline-block;width: 160px;" name="set2" readonly type="text"  v-model="d.A_Name" />&nbsp;&nbsp;({{d.A_Name}})</p>
          <p style="margin-left: 158px;margin-top: 30px;">发放比例：<span class="unit" style="margin-left:73px;">%</span><input readonly type="text" name="set3" style="display: inline-block;width: 100px;" v-model="d.A_Per" required lay-verify="required" placeholder="" /></p>
        </div>
        <div>
          <label><span>*</span>间推奖:</label>
          <p style="margin-left: 158px;margin-top: 30px;">奖项名称<input readonly style=" margin-left: 13px; display: inline-block;width: 160px;" name="set4" type="text" v-model="d.B_Name" />&nbsp;&nbsp;({{d.B_Name}})</p>
          <p style="margin-left: 158px;margin-top: 30px;">发放比例：<input readonly type="text" name="set5" style="display: inline-block;width: 100px;" required lay-verify="required" v-model="d.B_Per" placeholder="" /><span class="unit" style="margin-left:-39px;">%</span></p>
          <p style="margin-left: 158px;margin-top: 30px;">奖励低于：<span class="unit">¥</span><input type="text" readonly name="set6" v-model="d.B_Je" style=" text-indent: 40px;display: inline-block;width: 100px;" required lay-verify="required"  placeholder="" />&nbsp;&nbsp;元<span style="padding-left: 10px;">停止发放</span></p>
        </div>
        <div>
          <label><span>*</span>第三方货币:</label>
          <div>
            <p style="line-height: 38px;">
              FNT
            </p>
          </div>
        </div>
        <div>
          <label>是否激活科创版:</label>
          <p style="line-height: 38px;">
            是
          </p>
        </div>
        <div>
          <label>备注:</label>
          <p style="line-height: 38px;">
            {{d.Memo}}
          </p>
        </div>
        <div>
          <label>平台收费:</label>
          <p style="line-height: 38px;">押金:{{d.P_Yj}}元， 提现收取{{d.P_Ser}}%</p>
        </div>
        <div>
          <label for="">国家税收:</label>
          <p style="line-height: 38px;">{{d.P_Tax}}%的增值税由平台代收&nbsp;&nbsp;(涉及到个人或企业所得税自行申报)</p>
        </div>
      </el-form>
    </div>
  </d2-container>
</template>

<script>
  export default {
    data() {
      return {
        form:{

        },
        d:{
          Name: '掌柜礼包',
          Img: 'http://www.zis.mobi/images/download/tjzl.png',
          Price: 199,
          A_Name: '直推奖',
          B_Name: '间推奖',
          A_Per: 1,
          B_Per: 1,
          A_Je: 1,
          B_Je: 1,
          P_Yj: 199,
          P_Ser: 12,
          P_Tax: 3,
          Memo:'玩法解析：\n' +
            '\n' +
            '     例：A->B->C->D->E->F, 并设定直推奖为X，间推奖为Y，间推奖的发放比例为50%，间推奖励金小于M停止发放。\n' +
            '\n' +
            '即：\n' +
            '\n' +
            '(1) A将获得直推B的奖金X\n' +
            '\n' +
            '     A将获得间推F的奖金Y*50%*50%*50%*50%\n' +
            '\n' +
            '               间推E的奖金Y*50%*50%*50%\n' +
            '\n' +
            '               间推D的奖金Y*50%*50%\n' +
            '\n' +
            '               间推C的奖金Y*50%\n' +
            '\n' +
            '     在A获取的间推奖金过程中，只要获取的奖金小于M，行为立马停止。\n' +
            '\n' +
            '\n' +
            '\n' +
            '(2) B将获得直推C的奖金X\n' +
            '\n' +
            '     B将获得间推F的奖金Y*50%*50%*50%\n' +
            '\n' +
            '               间推E的奖金Y*50%*50%\n' +
            '\n' +
            '               间推D的奖金Y*50%\n' +
            '\n' +
            '     在B获取的间推奖金过程中，只要获取的奖金小于M，行为立马停止。'
        }
      }
    }
  }
</script>

<style scoped>
  /*.main{ width:60%; margin: 60px auto;}*/
  .main h2{ text-align: left; padding: 30px 80px; font-size: 18px;}
  .main label { font-size: 14px;float: left; display: block; padding: 9px 15px;width: 130px;font-weight: 400;line-height: 20px;text-align: right;}
  .main label span{ color: red;}
  .edit{color: #1ABC9C;cursor: pointer;}
  .grey{color: #999;padding-top: 26px;font-size: 12px;}
  .main div{ margin-bottom: 15px;}
  .main div p{ position: relative; margin-left: 160px; min-height: 36px;font-size: 12px; }
  .main div p input{   border-color: #e6e6e6;  display: block;width: 41%;padding-left: 10px;height: 38px;line-height: 1.3;line-height: 38px\9;border-width: 1px;border-style: solid;background-color: #fff;border-radius: 2px;}
  .main div p input[type="checkbox"] {z-index: 999; width: 15px; height: 15px;    position: absolute;top: 5px;}
  .main div p button{ outline: none; display: inline-block;height: 38px;line-height: 38px;padding: 0 18px; background-color: #169BD5;color: #fff;white-space: nowrap;text-align: center;font-size: 14px;border: none;border-radius: 2px;cursor: pointer;}
  .main div p select{ height: 38px;line-height: 38px;width: 100%;border: 1px solid #ededed; color:#757575;padding-left: 10px;}
  .layui-upload-file {display: none!important;opacity: .01;}
  input:hover{cursor: default;}
  .main .layui-btn,
  .layui-form-onswitch{background:#169BD5; border-color: #169BD5;}
  .layui-form-checkbox{margin-right: 66px !important;display: inline-block !important;}
  textarea{resize:none !important;}
  .unit{position:absolute;top:1px;display:inline-block;width:38px;height:38px;border-left:0;background:#f2f2f2;text-align:center;line-height:38px;z-index: 222;}
  .dBC_Sbit{text-align: center;}
  .layui-anim.layui-icon{position: relative;top: -8px;}
  .dBC_Sbit .prev,.next{display:inline-block;margin: 50px 20px 0 0;width: 100px;height: 40px;text-align: center;background: #1ABC9C;color: #fff;font-size: 14px;line-height: 40px;border-radius: 3px;cursor: pointer;border: 1px solid #1ABC9C;}
  .units{top: 137px;}
  .btn span{display: inline-block;width: 80px;height: 30px;line-height: 30px;text-align: center;border: 1px solid #ccc;margin-right: 10px;cursor: pointer;}
  .active{color: #1ABC9C;border-color: #1ABC9C !important;}
</style>
