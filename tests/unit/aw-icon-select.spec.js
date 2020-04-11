import { mount, createLocalVue } from '@vue/test-utils'
import AWIconSelect from '@/components/aw-icon-select/index.vue'
import ElementUI from 'element-ui'

describe('aw-icon-select', () => {
  const localVue = createLocalVue()
  localVue.use(ElementUI)

  // 存在且是Vue组件实例
  it('is a vue instance', () => {
    const wrapper = mount(AWIconSelect, {
      stubs: ['el-popover', 'el-button', 'el-input', 'el-collapse', 'el-collapse-item', 'el-col', 'el-row']
    })

    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  // // props
  // it('has props', () => {
  //   const wrapper = mount(AWIconSelect, {
  //     propsData: {
  //       value: 'value',
  //       placeholder: '请选择',
  //       placement: 'right',
  //       clearable: true,
  //       userInput: false,
  //       autoClose: false
  //     }
  //   })

  //   expect(wrapper.props().value).toEqual('value')
  //   expect(wrapper.props().placeholder).toEqual('请选择')
  //   expect(wrapper.props().placement).toEqual('right')
  //   expect(wrapper.props().clearable).toEqual(true)
  //   expect(wrapper.props().userInput).toEqual(false)
  //   expect(wrapper.props().autoClose).toEqual(false)
  // })
})
