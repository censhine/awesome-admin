import { mount } from '@vue/test-utils'
import AWModuleIndexMenu from '@/components/aw-module-index-menu/index.vue'
import menu from '@/menu/modules/demo-business'

describe('aw-module-index-menu', () => {
  // 存在且是Vue组件实例
  it('is a vue instance', () => {
    const wrapper = mount(AWModuleIndexMenu, {
      stubs: ['el-button'],
      propsData: {
        menu
      }
    })

    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  // 300m后正确渲染，包含特定类名
  it('contains specific classnames', (done) => {
    const wrapper = mount(AWModuleIndexMenu, {
      stubs: ['el-button'],
      propsData: {
        menu: menu
      }
    })

    setTimeout(() => {
      expect(wrapper.is('.aw-module-index-menu')).toBeTruthy()
      expect(wrapper.contains('.aw-module-index-menu-group')).toBeTruthy()
      expect(wrapper.contains('.aw-module-index-menu-group--title')).toBeTruthy()
      expect(wrapper.contains('.aw-module-index-menu-item')).toBeTruthy()
      done()
    }, 400)
  })
})
