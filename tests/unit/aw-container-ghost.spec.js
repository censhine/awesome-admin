import { mount } from '@vue/test-utils'
import AWContainerGhost from '@/components/aw-container/components/aw-container-ghost.vue'

describe('aw-container-ghost', () => {
  // 存在且是Vue组件实例
  it('is a vue instance', () => {
    const wrapper = mount(AWContainerGhost)

    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  // 包含特定类名
  it('contains specific classnames', () => {
    const wrapper = mount(AWContainerGhost, {
      slots: {
        default: '<div>body</div>',
        header: '<div>header</div>',
        footer: '<div>footer</div>'
      }
    })

    expect(wrapper.is('.aw-container-ghost')).toBeTruthy()
    expect(wrapper.contains('.aw-container-ghost__header')).toBeTruthy()
    expect(wrapper.contains('.aw-container-ghost__body')).toBeTruthy()
    expect(wrapper.contains('.aw-container-ghost__footer')).toBeTruthy()
  })

  // props
  it('has props', () => {
    const wrapper = mount(AWContainerGhost, {
      propsData: {
        scrollDelay: 30
      }
    })

    expect(wrapper.props().scrollDelay).toEqual(30)
  })

  // 渲染slot
  it('has one or more slots', () => {
    const wrapper = mount(AWContainerGhost, {
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
