<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgstyle" ref="bgImage">
      <div class="play-wrapper">
        <div ref="playBtn" v-show="songs.length>0" class="play" @click="random">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll :data="songs" @scroll="scroll" :listen-scroll="listenScroll"
             :probe-type="probeType" class="list" ref="list">
      <div class="song-list-wrapper">
        <song-list :songs="songs" @select="select" :rank="rank"></song-list>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import scroll from '../../base/scroll/scroll'
  import songList from '../../base/song-list/song-list.vue'
  import {mapActions} from 'vuex'
  import {playlistMixin} from '../../common/js/mixin'

  const RESERVED_HEIGHT = 40
  export default {
    mixins:[playlistMixin],
    data() {
      return {
        scrollY
      }
    },
    created(){
      this.probeType = 3
      this.listenScroll = true
    },
    props: {
      bgImage: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: ''
      },
      rank:{
        tyep:Boolean,
        default:false
      }
    },
    computed:{
      bgstyle() {
        return `backgroundImage:url(${this.bgImage})`
      }
    },
    methods:{
      //点击返回按钮
      back() {
        this.$router.back()
      },
      //共用内容mixin的内容,
      handlePlaylist(playlist) {
        if(playlist) {
          var bottom = '60px'
        }
        else{
           bottom = ''
        }
        this.$refs.list.$el.style.bottom = bottom
        this.$refs.list.refresh()
      },
      //向下滑动歌曲列表的时候,新建一个html:layer,随时监听scroll在y轴上滚动的距离
//      scroll向上的距离=lazy的改变距离
      //修整:1.滑一会后,图片再次出现.让lazy最后固定高度.最大值为图片clientHeight-顶部预留高度
      //2.歌单内容从最顶部文字上划过.一旦滑动到最顶端,将图片突出来,z-index设置,并且高度设为预留高度
      //3.向上滑动的时候,希望图片有放大的功能.利用scale
      //4.向下滑动的时候,图片有高斯模糊的效果
      scroll(pos) {
        this.scrollY=pos.y
      },
      //引入vuex
      select(item,index) {
        this.selectPlay({
          list:this.songs,
          index
        })
      },
      //随机播放
      random() {
        this.randomPlay({
          list: this.songs
        })
      },
      ...mapActions([
        'selectPlay',
        'randomPlay'
      ])
    },
    mounted(){
      this.minHeight=this.$refs.bgImage.clientHeight
      this.minTransalteY=-this.minHeight + RESERVED_HEIGHT
      this.$refs.list.$el.style.top=`${this.$refs.bgImage.clientHeight}px`
    },
    watch: {
      scrollY(newY) {
        this.$refs.bgImage.style.zIndex=0
        let transtlate = Math.max(this.minTransalteY,newY)
        let scale=1
        //高斯模糊效果
        let blur=0
        const percent = Math.abs(newY/this.minHeight)
        //向下拉的时候 图片进行变化
        if(newY > 0) {
          scale= 1 + percent
          this.$refs.bgImage.style.zIndex=10
        }
        //向上拉的时候 filter模糊
        else{
          blur=Math.min(20*percent,20)
        }
        //filter进行模糊
        this.$refs.filter.style['backdrop-filter']=`blur(${blur}px)`
        this.$refs.filter.style['webkitBackdrop-filter']=`blur(${blur}px)`
        this.$refs.layer.style['transform']=`translate3d(0,${transtlate}px,0)`
        this.$refs.layer.style['webkitTransform']=`translate3d(0,${transtlate}px,0)`
        //(scroll的高度为负数) 一旦高度大于最顶端的时候
        if(newY < this.minTransalteY) {
          this.$refs.bgImage.style.zIndex=10
          this.$refs.bgImage.style.paddingTop=0
          this.$refs.bgImage.style.height=`${RESERVED_HEIGHT}px`
          this.$refs.playBtn.style.display= 'none'
        }
        //小于最顶端的时候,恢复最开始的状态
        else{
          this.$refs.bgImage.style.paddingTop='70%'
          this.$refs.bgImage.style.height=0
          this.$refs.playBtn.style.display=''
        }
        this.$refs.bgImage.style['transform']=`scale(${scale})`
        this.$refs.bgImage.style['webkitTransform']=`scale(${scale})`
      },
    },
    components:{
      songList,
      scroll
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
