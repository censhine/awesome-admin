import { mount, createLocalVue } from '@vue/test-utils'
import AWSource from '@/components/aw-container/components/aw-source.vue'

describe('aw-source', () => {
  // 存在且是Vue组件实例
  it('is a vue instance', () => {
    const wrapper = mount(AWSource, {
      stubs: ['aw-icon']
    })

    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  // 包含特定类名
  it('contains specific classnames', (done) => {
    const wrapper = mount(AWSource, {
      stubs: ['aw-icon']
    })

    expect(wrapper.is('.aw-source')).toBeTruthy()
    setTimeout(() => {
      expect(wrapper.contains('.aw-source--active')).toBeTruthy()
      done()
    }, 600)
  })

  // props
  it('has props', () => {
    const wrapper = mount(AWSource, {
      stubs: ['aw-icon'],
      propsData: {
        filename: ''
      }
    })

    expect(wrapper.props().filename).toEqual('')
  })
})
