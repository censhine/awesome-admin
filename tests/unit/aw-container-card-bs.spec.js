import { mount } from '@vue/test-utils'
import AWContainerCardBs from '@/components/aw-container/components/aw-container-card-bs.vue'

describe('aw-container-card-bs', () => {
  // 存在且是Vue组件实例
  it('is a vue instance', () => {
    const wrapper = mount(AWContainerCardBs)

    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  // 包含特定类名
  it('contains specific classnames', () => {
    const wrapper = mount(AWContainerCardBs, {
      slots: {
        default: '<div>body</div>',
        header: '<div>header</div>',
        footer: '<div>footer</div>'
      }
    })

    expect(wrapper.is('.aw-container-card-bs')).toBeTruthy()
    expect(wrapper.contains('.aw-container-card-bs__header')).toBeTruthy()
    expect(wrapper.contains('.aw-container-card-bs__body')).toBeTruthy()
    expect(wrapper.contains('.aw-container-card-bs__body-card')).toBeTruthy()
    expect(wrapper.contains('.aw-container-card-bs__footer')).toBeTruthy()
  })

  // props
  it('has props', () => {
    const wrapper = mount(AWContainerCardBs, {
      propsData: {
        betterScrollOptions: {}
      }
    })

    expect(wrapper.props().betterScrollOptions).toEqual({})
  })

  // 渲染slot
  it('has one or more slots', () => {
    const wrapper = mount(AWContainerCardBs, {
      slots: {
        default: '<div>body</div>',
        header: '<div>header</div>',
        footer: '<div>footer</div>'
      }
    })

    expect(wrapper.text()).toMatch('header')
    expect(wrapper.text()).toMatch('body')
    expect(wrapper.text()).toMatch('footer')
  })
})
