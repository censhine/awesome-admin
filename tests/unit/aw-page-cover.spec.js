import { mount } from '@vue/test-utils'
import AWPageCover from '@/components/aw-page-cover/index.vue'

describe('aw-page-cover', () => {
  // 存在且是Vue组件实例
  it('is a vue instance', () => {
    const wrapper = mount(AWPageCover)

    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  // 包含特定类名
  it('contains specific classnames', () => {
    const wrapper = mount(AWPageCover, {
      slots: {
        default: '<div>default</div>',
        footer: '<div>footer</div>'
      }
    })

    expect(wrapper.is('.aw-page-cover')).toBeTruthy()
    expect(wrapper.contains('.aw-page-cover__logo')).toBeTruthy()
    expect(wrapper.contains('.aw-page-cover__title')).toBeTruthy()
    expect(wrapper.contains('.aw-page-cover__sub-title')).toBeTruthy()
    expect(wrapper.contains('.aw-page-cover__build-time')).toBeTruthy()
  })

  // 渲染slot
  it('has one or more slots', () => {
    const wrapper = mount(AWPageCover, {
      slots: {
        default: '<div>default</div>',
        footer: '<div>footer</div>'
      }
    })

    expect(wrapper.text()).toMatch('default')
    expect(wrapper.text()).toMatch('footer')
  })
})
