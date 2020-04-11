import { mount } from '@vue/test-utils'
import AWModuleIndexBanner from '@/components/aw-module-index-banner/index.vue'

describe('aw-module-index-banner', () => {
  // 存在且是Vue组件实例
  it('is a vue instance', () => {
    const wrapper = mount(AWModuleIndexBanner, {
      stubs: ['aw-icon']
    })

    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  // props
  it('has props', () => {
    const wrapper = mount(AWModuleIndexBanner, {
      stubs: ['aw-icon'],
      propsData: {
        title: 'title',
        subTitle: 'subTitle',
        link: 'link'
      }
    })

    expect(wrapper.props().title).toEqual('title')
    expect(wrapper.props().subTitle).toEqual('subTitle')
    expect(wrapper.props().link).toEqual('link')
  })
})
