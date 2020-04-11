<script>
// 组件
import awBackToTop from './components/aw-back-to-top'
import awContainerFull from './components/aw-container-full'
import awContainerFullBs from './components/aw-container-full-bs'
import awContainerGhost from './components/aw-container-ghost'
import awContainerGhostBs from './components/aw-container-ghost-bs'
import awContainerCard from './components/aw-container-card'
import awContainerCardBs from './components/aw-container-card-bs'

export default {
  name: 'aws-container',
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
  data() {
    return {
      // 容器当前坐标
      awScroll: { x: 0, y: 0 }
    }
  },
  computed: {
    // 始终返回渲染组件
    component() {
      if (this.type === 'full') {
        return this.betterScroll ? awContainerFullBs : awContainerFull
      }

      if (this.type === 'card') {
        return this.betterScroll ? awContainerCardBs : awContainerCard
      }

      if (this.type === 'ghost') {
        return this.betterScroll ? awContainerGhostBs : awContainerGhost
      }

      return 'div'
    }
  },
  render(h) {
    // 默认插槽
    const slots = [this.$slots.default]

    if (this.$slots.header) {
      slots.push(h('template', { slot: 'header' }, [this.$slots.header]))
    }

    if (this.$slots.footer) {
      slots.push(h('template', { slot: 'footer' }, [this.$slots.footer]))
    }

    return h('div', {
      ref: 'container',
      class: 'container-component'
    }, [
      h(this.component, {
        ref: 'component',
        props: this.$attrs,
        on: {
          scroll: e => {
            this.awScroll = e
          }
        }
      }, slots),
      h(awBackToTop, {
        props: this.$attrs
      })
    ])
  },
  activated() {
    // 恢复滚动位置
    if (!this.betterScroll) {
      this.$refs.component.scrollTo(this.awScroll.x, this.awScroll.y)
    }
  }
}
</script>
