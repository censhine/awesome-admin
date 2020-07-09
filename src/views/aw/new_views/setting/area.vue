<template>
  <aw-container>
    <aw-header title="区域管理"></aw-header>
    <el-cascader-panel :options="options"></el-cascader-panel>
  </aw-container>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '10001',
          label: '广东省',
          children: [{
            value: '10011',
            label: '深圳市',
            children: [{
              value: 'yizhi',
              label: '南山区'
            }, {
              value: 'fankui',
              label: '福田区'
            }, {
              value: 'xiaolv',
              label: '罗湖区'
            }, {
              value: 'kekong',
              label: '宝安区'
            }]
          }, {
            value: 'daohang',
            label: '广州市',
            children: [{
              value: 'cexiangdaohang',
              label: '花都区'
            }, {
              value: 'dingbudaohang',
              label: '天河区'
            }]
          }]
        }, {
          value: 'zujian',
          label: '湖北省',
          children: [{
            value: 'basic',
            label: '武汉市',
            children: [{
              value: 'layout',
              label: '武昌区'
            }, {
              value: 'color',
              label: '洪山区'
            }, {
              value: 'typography',
              label: '汉阳区'
            }, {
              value: 'icon',
              label: '汉口区'
            }, {
              value: 'button',
              label: '新洲区'
            }]
          }, {
            value: 'form',
            label: '咸宁市',
            children: [{
              value: 'radio',
              label: '温泉'
            }, {
              value: 'checkbox',
              label: '赤壁'
            }, {
              value: 'input',
              label: '嘉鱼'
            }, {
              value: 'select',
              label: '通城'
            }, {
              value: 'cascader',
              label: '崇阳'
            }, {
              value: 'switch',
              label: '通山'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '湖南省',
          children: [{
            value: 'axure',
            label: '长沙市',
            children:[
              {
                value: '123',
                label: '芙蓉区'
              },
              {
                value: '456',
                label: '天心区'
              },
              {
                value: '789',
                label: '岳麓区'
              },
              {
                value: '010',
                label: '开福区'
              },
              {
                value: '523',
                label: '雨花区'
              },
              {
                value: '142',
                label: '望城区'
              },
            ]
          }, {
            value: 'sketch',
            label: '岳阳市'
          }, {
            value: 'jiaohu',
            label: '株洲市'
          }]
        }]
      };
    }
  };
</script>
