// 组件
import awContainerFull from './components/aw-container-full.vue'
import awContainerFullBs from './components/aw-container-full-bs.vue'
import awContainerGhost from './components/aw-container-ghost.vue'
import awContainerGhostBs from './components/aw-container-ghost-bs.vue'
import awContainerCard from './components/aw-container-card.vue'
import awContainerCardBs from './components/aw-container-card-bs.vue'
import awSource from './components/aw-source.vue'

export default {
  name: 'aw-container',
  props: {
    // 容器样式
    type: {
      type: String,
      required: false,
      default: 'full'
    },
    // 滚动优化
    betterScroll: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    // 始终返回渲染组件
    component () {
      if (this.type === 'card' && !this.betterScroll) return awContainerCard
      if (this.type === 'card' && this.betterScroll) return awContainerCardBs
      if (this.type === 'ghost' && !this.betterScroll) return awContainerGhost
      if (this.type === 'ghost' && this.betterScroll) return awContainerGhostBs
      if (this.type === 'full' && !this.betterScroll) return awContainerFull
      if (this.type === 'full' && this.betterScroll) return awContainerFullBs
      else {
        return 'div'
      }
    }
  },
  render (h) {
    const slots = [ this.$slots.default ]
    if (this.$slots.header) slots.push(h('template', { slot: 'header' }, [ this.$slots.header ]))
    if (this.$slots.footer) slots.push(h('template', { slot: 'footer' }, [ this.$slots.footer ]))
    return h('div', {
      ref: 'container',
      class: 'container-component'
    }, [
      h(this.component, {
        ref: 'component',
        props: this.$attrs,
        on: {
          scroll: e => this.$emit('scroll', e)
        }
      }, slots),
      h(awSource)
    ])
  },
  methods: {
    // 返回顶部
    scrollToTop () {
      this.$refs.component.scrollToTop()
      // 如果开启了 better scroll 还需要手动触发一遍 scroll 事件
      const bs = this.$refs.component.BS
      if (bs) this.$refs.component.scroll()
    },
    // 用法同原生方法 scrollBy
    scrollBy (x = 0, y = 0, time = 300) {
      if (this.betterScroll) {
        const bs = this.$refs.component.BS
        if (bs) {
          bs.scrollBy(-x, -y, time)
          // 手动触发一遍 scroll 事件
          this.$refs.component.scroll()
        }
      } else {
        this.$refs.component.$refs.body.scrollBy(x, y)
      }
    },
    // 用法同原生方法 scrollTo
    scrollTo (x = 0, y = 0, time = 300) {
      if (this.betterScroll) {
        const bs = this.$refs.component.BS
        if (bs) {
          bs.scrollTo(-x, -y, time)
          // 手动触发一遍 scroll 事件
          this.$refs.component.scroll()
        }
      } else {
        this.$refs.component.$refs.body.scrollTo(x, y)
      }
    },
    // 用法同原生方法 scrollTop
    scrollTop (top = 0, time = 300) {
      if (this.betterScroll) {
        const bs = this.$refs.component.BS
        if (bs) {
          bs.scrollTo(bs.x, -top, time)
          // 手动触发一遍 scroll 事件
          this.$refs.component.scroll()
        }
      } else {
        this.$refs.component.$refs.body.scrollTop = top
      }
    }
  }
}
