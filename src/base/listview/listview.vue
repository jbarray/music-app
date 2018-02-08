<template>
  <scroll @scroll="scroll"
          class="listview"
          ref="listview"
          :data="data"
          :probe-type="probeType"
          :listen-scroll="listenScroll">
   <ul>
     <li v-for="group in data" class="list-group" ref="listGroup">
       <ul>
         <h2 class="list-group-title">{{group.title}}</h2>
         <li v-for="item in group.items" @click="selectItem(item)" class="list-group-item">
           <img :src="item.avatar" class="avatar">
           <span class="name">{{item.name}}</span>
         </li>
       </ul>
     </li>
   </ul>
    <!--右侧导航栏-->
    <div class="list-shortcut">
      <ul>
        <li class="item" v-for="(item,index) in shortCutList"
            :data-index="index"
            @touchstart.stop.prevent="onShortcutTouchStart"
            @touchmove.stop.prevent="onShortcutTouchMove"
        :class="{'current':currentIndex==index}">{{item}}
        </li>
      </ul>
    </div>
    <!--顶部条-->
    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}} </div>
    </div>
    <div v-show="!data.length" class="loading-container">
      <loading></loading>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import scroll from '../scroll/scroll.vue'
  import {getData}from '../../common/js/dom'
  import loading from '../../base/loading/loading.vue'

  const TITLE_HEIGHT = 30
  export default {
    data(){
      return {
//        滚动条移动的位置
        scrollY:-1,
//        当前需要哪一个模块高亮
        currentIndex:0,
        diff: -1
      }
    },
    created() {
//      建立touch变量仅限于在created中使用
        this.touch={}
        this.listenScroll = true
        this.listHeight=[]
        this.probeType = 3
    },
    props:{
      data:{
        type:Array,
        default:[]
      }
    },
    components:{
      scroll,
      loading
    },
    computed:{
//      获取右边导航的内容(字母)
      shortCutList() {
        return this.data.map((group) => {
          return group.title.substr(0,1)
        })
      },
      fixedTitle() {
        if (this.scrollY > 0) {
          return ''
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }
    },
    methods:{
      //调用scroll的内容
      refresh() {
        this.$refs.listview.refresh()
      },
//      告诉父组件,点击某个歌手的事件已经启动
      selectItem(item){
        this.$emit('select',item)
      },
//      首次点击右边导航,左边内容跳转至对应模块
      onShortcutTouchStart(e) {
//        获得滑动时起始位置的index
        let anchorIndex = getData(e.target, 'index')
        let firstTouch=e.touches[0];
//        获得滑动起始位置的方向像素
        this.touch.y1=firstTouch.pageY;
        this.touch.anchorIndex=anchorIndex;
//        让左侧内容跳转至相应模块
        this. _scrollTo(anchorIndex);

      },
//      为了获取滑动结束后的index值
      onShortcutTouchMove(e) {
        //        获得滑动时起始位置的index
        let firstTouch=e.touches[0];
//        获得滑动起始位置的方向像素
        this.touch.y2=firstTouch.pageY;
//        滑动结束时的index是起始位置的index+(像素差值/每个index的像素值18)
        let delta=Math.floor((this.touch.y2-this.touch.y1)/18)
//        加parseInt的目的是,this.touch.anchorIndex是一个字符串,需要转化成数字
        let anchorIndex =parseInt(this.touch.anchorIndex)+delta
        this._scrollTo(anchorIndex);
      },
      _scrollTo(index) {
        this.scrollY=-this.listHeight[index]
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index],0)
      },
//      获取当前位置的y方向高度
      scroll(pos) {
        this.scrollY = pos.y
      },
//      获得左侧内容每一个模块的clientheight,得到数组
      _calculateHeight() {
        this.listHeight=[]
        const list=this.$refs.listGroup
        let height=0
//        第一个模块的clientHeight为0
        this.listHeight.push(height);
        for(let i=0;i<list.length;i++){
          height += list[i].clientHeight
          this.listHeight.push(height);
        }
      }
    },
    watch:{
//      data加载完成20秒后,进行此操作,防止手机出现兼容性问题
      data(){
        setTimeout(() => {
          this._calculateHeight()
        },20)
      },
      scrollY(newY) {
//        newY是滚动条滚动的距离,向下滚动为负
        if(newY>0){
          this.currentIndex=0
          return
        }
        for(let i = 0;i < this.listHeight.length-1;i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i+1]
          if(-newY >= height1 && -newY < height2) {
            this.currentIndex=i
            this.diff = height2 + newY
            return
          }
          this.currentIndex = this.listHeight.length - 2
        }
      },
      diff(newVal) {
        let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      }
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
