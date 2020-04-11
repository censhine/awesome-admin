import { mount } from '@vue/test-utils'
import AWContainerGhostBs from '@/components/aw-container/components/aw-container-ghost-bs.vue'

describe('aw-container-ghost-bs', () => {
  // 存在且是Vue组件实例
  it('is a vue instance', () => {
    const wrapper = mount(AWContainerGhostBs, {
      slots: {
        default: '<div>body</div>',
        header: '<div>header</div>',
        footer: '<div>footer</div>'
      }
    })

    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  // 包含特定类名
  it('contains specific classnames', () => {
    const wrapper = mount(AWContainerGhostBs, {
      slots: {
        default: '<div>body</div>',
        header: '<div>header</div>',
        footer: '<div>footer</div>'
      }
    })

    expect(wrapper.is('.aw-container-ghost-bs')).toBeTruthy()
    expect(wrapper.contains('.aw-container-ghost-bs__header')).toBeTruthy()
    expect(wrapper.contains('.aw-container-ghost-bs__body')).toBeTruthy()
    expect(wrapper.contains('.aw-container-ghost-bs__footer')).toBeTruthy()
  })

  // props
  it('has props', () => {
    const wrapper = mount(AWContainerGhostBs, {
      slots: {
        default: '<div>body</div>',
        header: '<div>header</div>',
        footer: '<div>footer</div>'
      },
      propsData: {
        betterScrollOptions: {}
      }
    })

    expect(wrapper.props().betterScrollOptions).toEqual({})
  })

  // 渲染slot
  it('has one or more slots', () => {
    const wrapper = mount(AWContainerGhostBs, {
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
