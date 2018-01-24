<template>
  <scroll class="listview" ref="listview">
   <ul>
     <li v-for="group in data" class="list-group" ref="listGroup">
       <ul>
         <h2 class="list-group-title">{{group.title}}</h2>
         <li v-for="item in group.items" class="list-group-item">
           <img :src="item.avatar" class="avatar">
           <span class="name">{{item.name}}</span>
         </li>
       </ul>
     </li>
   </ul>
    <div class="list-shortcut">
      <ul>
        <li class="item" v-for="(item,index) in shortCutList" :data-index="index" @touchstart.stop.prevent="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">{{item}}
        </li>
      </ul>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import scroll from '../scroll/scroll.vue'
  import {getData}from '../../common/js/dom'
  export default {
    created() {
//      建立touch变量仅限于在created中使用
      this.touch={}
    },
    props:{
      data:{
        type:Array,
        default:[]
      }
    },
    components:{
      scroll
    },
    computed:{
//      获取右边导航的内容(字母)
      shortCutList() {
        return this.data.map((group) => {
          return group.title.substr(0,1)
        })
      },
    },
    methods:{
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
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index],0)
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
