<script src="../../main.js"></script>
<script src="../../common/js/dom.js"></script>
<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item,index) in dots" :class="{active:currentPageIndex===index}"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {addClass} from '../../common/js/dom'
export default {
    data(){
      return {
        dots:[],
        currentPageIndex:0,
      }
    },
    props: {
      loop: {
        type:Boolean,
        default: true
      },
      autoPlay: {
        type:Boolean,
        default: true
      },
      interval: {
        type:Number,
        default: 4000
      }
    },
  //完成初始化后,引入better-scroll
  mounted(){
    setTimeout(() => {
      this._setSliderWidth();
      this._initDots();
      this._initSlider();
      if(this.autoPlay){
        this._play();
    }
    },20)
//    突然改变屏幕的宽度,需要重新计算sliderWidth
    window.addEventListener('resize',() => {
      if(!this.slider){
        return
      }
      this._setSliderWidth(true);
      this.slider.refresh();
    })
  },
  methods:{
    _setSliderWidth(reslize) {
      this.children=this.$refs.sliderGroup.children;
      console.log(this.children.length);
      let width=0;
      let sliderWidth=this.$refs.slider.clientWidth;
      for(let i=0;i<this.children.length;i++){
        let child = this.children[i]
        addClass(child,'slider-item')
//        单独每一个图片的宽度=窗口的宽度
        child.style.width= sliderWidth + 'px';
        width += sliderWidth;
      }
//      加reslize的目的是:不再次改变width
      if(this.loop && !reslize) {
        width += sliderWidth*2;
      }
//      总的图片宽度=图片的宽度加和
      this.$refs.sliderGroup.style.width=width + 'px'
    },
    _initDots(){
      this.dots=this.children.length;
    },
//    设置滑动效果
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: true,
          threshold: 0.3,
          speed: 400
        },
      })
//      监听滑动结束的时候,得出当前页面时第几个图片,并且执行自动
      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX
        this.currentPageIndex = pageIndex
        if (this.autoPlay) {
          clearTimeout(this.timer)
          this._play()
        }
      })
    },
    _play() {
      let pageIndex = this.currentPageIndex + 1
//      if (this.loop) {
//        pageIndex ++
//      }
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndex, 0, 400)
      }, this.interval)
    }
  },
  destroyed(){
    clearTimeout(this.timer)
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
