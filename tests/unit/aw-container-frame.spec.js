import { mount } from '@vue/test-utils'
import AWContainerFrame from '@/components/aw-container-frame/index.vue'

describe('aw-container-frame', () => {
  // 存在且是Vue组件实例
  it('is a vue instance', () => {
    const wrapper = mount(AWContainerFrame, {
      stubs: ['aw-container']
    })

    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  // 包含特定类名
  it('contains specific classnames', () => {
    const wrapper = mount(AWContainerFrame, {
      stubs: ['aw-container']
    })

    expect(wrapper.contains('.aw-container-frame')).toBeTruthy()
  })

  // props
  it('has props', () => {
    const wrapper = mount(AWContainerFrame, {
      stubs: ['aw-container'],
      propsData: {
        src: 'https://AW.pub/zh/doc/aw-admin'
      }
    })

    expect(wrapper.props().src).toEqual('https://AW.pub/zh/doc/aw-admin')
  })
})
