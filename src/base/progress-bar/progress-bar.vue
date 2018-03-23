<template>
  <div class="progress-bar" ref="progressBar" @click="touchProgressBar">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
      @touchstart.prevent="progressTouchStart"
      @touchmove.prevent="progressTouchMove"
      @touchend.prevent="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {prefixStyle} from '../../common/js/dom'

const progressBtnWidth = 16
const transform = prefixStyle('transform')

  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    watch: {
      percent(newPercent) {
        if (newPercent >= 0) {
          //黄色部分=总长度-小球的宽度
          const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
          const offsetWidth = newPercent * barWidth
          this._upset(offsetWidth)
        }
      }
    },
    created() {
      //定义一个在method中使用的对象
      this.touch={}
    },
    methods:{
      //分别获取第一次接触滚动条的位置和滑动的位置 计算出已经改变的宽度差,计算当前的percent,从而更改时间
      progressTouchStart(e) {
        //证明已经进行过初始化
        this.touch.initiated=true
        this.touch.startX=e.touches[0].pageX
        this.touch.left=this.$refs.progress.style.width
      },
      progressTouchMove(e) {
        if(!this.touch.initiated) {
          return
        }
        //获取 滑动宽度差=滑动点击位置-初次接触的位置
        const deltaX=e.touches[0].pageX-this.touch.startX
        //滑动的距离差deltaX 最小值为0 最大值为(总长度-小圆图标宽度)
        const offsetWidth=Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth,Math.max(0,this.touch.startX + deltaX))
        this._upset(offsetWidth)
      },
      progressTouchEnd(e) {
        this.touch.initiated=false
        //计算得出当前的percent
          //  当前黄色宽度 / 可用总宽度
        this._togglePercent()
      },
      touchProgressBar(e) {
        const react = this.$refs.progressBar.getBoundingClientRect()
        const offsetWidth = e.pageX - react.left
        this._upset(offsetWidth)
//        this._upset(e.offsetX)
        this._togglePercent()
      },
      _upset(offsetWidth) {
        this.$refs.progress.style.width=`${offsetWidth}px`
        this.$refs.progressBtn.style[transform]=`translate3d(${offsetWidth}px,0,0)`
      },
      _togglePercent() {
        const AllWidth=this.$refs.progressBar.clientWidth- progressBtnWidth
        const percent = this.$refs.progress.clientWidth / AllWidth
        this.$emit('percentChange',percent)
      },
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>
