import { mount } from '@vue/test-utils'
import AWIcon from '@/components/aw-icon/index.vue'

describe('aw-icon', () => {
  // 存在且是Vue组件实例
  it('is a vue instance', () => {
    const wrapper = mount(AWIcon)

    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  // 包含特定类名
  it('contains specific classnames', () => {
    const wrapper = mount(AWIcon)

    expect(wrapper.is('.fa')).toBeTruthy()
    expect(wrapper.contains('.fa-font-awesome')).toBeTruthy()
  })

  // props
  it('has props', () => {
    const wrapper = mount(AWIcon, {
      propsData: {
        name: 'font-awesome'
      }
    })

    expect(wrapper.props().name).toEqual('font-awesome')
  })
})
