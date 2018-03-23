<template>
  <div class="player" v-show="playlist.length>0">
    <transition name="normal"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
    @after-leave="afterLeave">
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image">
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="icon-back"></i>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="currentSong.singer"></h2>
        </div>
        <div class="middle">
          <div class="middle-l" ref="middleL" v-show="pictureShow" @click="changeLyric">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdCls">
                <img class="image" :src="currentSong.image">
              </div>
            </div>
          </div>
          <div class="middle-r" ref="middleR"  v-show="!pictureShow" @click="changeLyric">
            <transition name="lyric">
              <div class="lyric-wrapper">
                <div >
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                  <p class="text" ref="lyricLine">歌词1行</p>
                </div>
              </div>
            </transition>
          </div>
        </div>
        <div class="bottom">
          <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent" @percentChange="percentMove"></progress-bar>
            </div>
            <span class="time time-r">{{format(currentSong.duration)}}</span>
          </div>
          <!--</div>-->
          <div class="operators">
            <div class="icon i-left" @click="changeMode">
              <i :class="iconMode"></i>
            </div>
            <div class="icon i-left" >
              <i @click="pre" class="icon-prev"></i>
            </div>
            <div class="icon i-center">
              <i  @click="togglePlaying" :class="playIcon"></i>
            </div>
            <div class="icon i-right">
              <i @click="next" class="icon-next"></i>
            </div>
            <div class="icon i-right">
              <i  class="icon" :class="isFavorite(currentSong)" @click="changeFavoriteMode(currentSong)"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon" :class="miniCdCls">
          <img  width="40" height="40" :src="currentSong.image">
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control">
          <i @click.stop="togglePlaying" class="icon-mini" :class="miniIcon"></i>
        </div>
        <div class="control" @click="showPlaylist">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <playlist ref="playlist"></playlist>
    <!--播放音乐-->
    <audio :src="currentSong.url" ref="audio" @canplay="ready" @error="error" @timeupdate="dateTimeup" @ended="end"></audio>
  </div>
  <!--</div>-->
</template>

<script type="text/ecmascript-6">
import {mapGetters,mapMutations, mapActions} from 'vuex'
import animations from 'create-keyframe-animation'
import progressBar  from '../../base/progress-bar/progress-bar.vue'
import {playMode} from '../../common/js/config'
import {shuffle} from '../../common/js/utill'
import {getLyric} from '../../api/song'
import playlist from '../playlist/playlist.vue'
import {playerMixin} from '../../common/js/mixin'
  export default {
    mixins:[playerMixin],
    data() {
      return {
        songPlay:false,
        currentTime:0,
        pictureShow:true
      }
    },
    computed: {
      ...mapGetters([
        'currentIndex',
        'fullScreen',
        'playing',
        'playlist',
//        'mode',
//        'sequenceList'
      ]),

      // 点击播放按钮 改变图标样式
      playIcon() {
        return this.playing ? 'icon-pause' : 'icon-play'
      },
      miniIcon() {
        return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
      },
      // 点击播放按钮 唱片旋转
      cdCls() {
        return this.playing ? 'play' : 'play pause'
      },
      miniCdCls() {
        return this.playing ? 'play' : 'play pause'
      },
      percent() {
        return this.currentTime/this.currentSong.duration
      },
    },
    created() {
//      getLyric(this.currentSong.mid).then((rep) =>{
//        console.log(rep)
//      })
    },
    methods:{
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN',
      }),
      ...mapActions([
        'savePlayHistory'
      ]),
//      修改vuex中的值
      back() {
        this.setFullScreen(false)
      },
      open() {
        this.setFullScreen(true)
      },
      //一首歌曲结束后
      end() {
        //实现循环播放
        if(this.mode === playMode.loop) {
          this.$refs.audio.currentTime = 0
          this.$refs.audio.play()
        }
        else{
          this.next()
        }
      },
      //上一曲和下一曲
      pre() {
        if(!this.songPlay) {
          return
        }
        let index=this.currentIndex - 1
        if(index === -1){
          index = this.playlist.length - 1
        }
        this.setCurrentIndex(index)
        this.songPlay=false
        //if当前状态没有播放的话,进行播放
        if(this.playing === false){
          this.setPlayingState(true)
        }
      },
      next() {
        if(!this.songPlay) {
          return
        }
        let index = this.currentIndex + 1
        if(index === this.playlist.length){
          index = 0
        }
        this.setCurrentIndex(index)
        this.songPlay=false
        //if当前状态没有播放的话,进行播放
        if(this.playing === false){
          this.setPlayingState(true)
        }
      },
      // 点击播放按钮 改变播放状态
      togglePlaying() {
        if(!this.songPlay) {
          return
        }
        this.setPlayingState(!this.playing)
//        this.songPlay=false
      },
      //保证不能频繁点击 标志位歌曲已经准备好的时候canplay=ready才可以点
      ready() {
        this.songPlay=true
        //存储当前播放的歌曲
        this.savePlayHistory(this.playlist[this.currentIndex])
      },
      error() {
        this.songPlay=true
      },
      //获取动态时间
      dateTimeup(e) {
        this.currentTime=e.target.currentTime
      },
        //将时间整理成分和秒
      format(t) {
         t = t |0
        let min = t /60 |0
        let second = t % 60
        let se=this._change(second,2)
        return `${min}:${se}`
      },
      _change(num,n) {
        let len = num.toString().length
        if(len < n) {
          num = '0'+ num
          len++
        }
        return num
      },
      enter() {

      },
      afterEnter() {

      },
      leave() {

      },
      afterLeave() {

      },
      //时间进度条返回的percent,用于改变歌曲的播放当前时间
      percentMove(percent) {
        this.$refs.audio.currentTime=this.currentSong.duration * percent
        //if当前状态没有播放的话,进行播放
        if(!this.playing){
          this.togglePlaying()
        }
      },

      resetCurrentIndex(arr) {
        let index = arr.findIndex((item) => {
          return item.id === this.currentSong.id
        })
        this.setCurrentIndex(index)
      },
      //歌词和照片的切换
      changeLyric() {
          this.pictureShow = !this.pictureShow
      },
      //点击mini播放器中的播放列表图标,出现播放列表
      showPlaylist() {
        this.$refs.playlist.show()
      }
    },
    watch:{
      //当currentSong发生改变的时候,开始播放此歌曲
      currentSong(newSong,oldSong) {
        // 如果song变化前后 是同一首歌 则保持当前状态不变(如:播放状态)
        if(!newSong) {
          return
        }
        if (newSong.id === oldSong.id) {
          return
        }
        //添加延时,防止此dom还没有的时候就执行
        this.$nextTick(() => {
          this.$refs.audio.play()
//          this.currentSong.getLyric()
        })
      },
      playing(newPlaying) {
        this.$nextTick(() => {
          const audio = this.$refs.audio
          newPlaying ? audio.play() : audio.pause()
        })
      }
    },
    components: {
      progressBar,
      playlist
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .player
    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 150
      background: $color-background
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .top
        position: relative
        margin-bottom: 25px
        .back
          position absolute
          top: 0
          left: 6px
          z-index: 50
          .icon-back
            display: block
            padding: 9px
            font-size: $font-size-large-x
            color: $color-theme
            transform: rotate(-90deg)
        .title
          width: 70%
          margin: 0 auto
          line-height: 40px
          text-align: center
          no-wrap()
          font-size: $font-size-large
          color: $color-text
        .subtitle
          line-height: 20px
          text-align: center
          font-size: $font-size-medium
          color: $color-text
      .middle
        position: fixed
        width: 100%
        top: 80px
        bottom: 170px
        white-space: nowrap
        font-size: 0
        .middle-l
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 0
          padding-top: 80%
          .cd-wrapper
            position: absolute
            left: 10%
            top: 0
            width: 80%
            height: 100%
            .cd
              width: 100%
              height: 100%
              box-sizing: border-box
              border: 10px solid rgba(255, 255, 255, 0.1)
              border-radius: 50%
              &.play
                animation: rotate 20s linear infinite
              &.pause
                animation-play-state: paused
              .image
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                border-radius: 50%

          .playing-lyric-wrapper
            width: 80%
            margin: 30px auto 0 auto
            overflow: hidden
            text-align: center
            .playing-lyric
              height: 20px
              line-height: 20px
              font-size: $font-size-medium
              color: $color-text-l
        .middle-r
          display: inline-block
          vertical-align: top
          width: 100%
          height: 100%
          overflow: hidden
          .lyric-wrapper
            width: 80%
            margin: 0 auto
            overflow: hidden
            text-align: center
            &.lyric-enter-active, &.lyric-leave-active
              transition: all 0.4s
            .text
              line-height: 32px
              color: $color-text-l
              font-size: $font-size-medium
              &.current
                color: $color-text
      .bottom
        position: absolute
        bottom: 50px
        width: 100%
        .dot-wrapper
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            vertical-align: middle
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &.active
              width: 20px
              border-radius: 5px
              background: $color-text-ll
        .progress-wrapper
          display: flex
          align-items: center
          width: 80%
          margin: 0px auto
          padding: 10px 0
          .time
            color: $color-text
            font-size: $font-size-small
            flex: 0 0 30px
            line-height: 30px
            width: 30px
            &.time-l
              text-align: left
            &.time-r
              text-align: right
          .progress-bar-wrapper
            display inline-block
            flex: 1
        .operators
          display: flex
          align-items: center
          .icon
            flex: 1
            color: $color-theme
            &.disable
              color: $color-theme-d
            i
              font-size: 30px
          .i-left
            text-align: right
          .i-center
            padding: 0 20px
            text-align: center
            i
              font-size: 40px
          .i-right
            text-align: left
          .icon-favorite
            color: $color-sub-theme
      &.normal-enter-active, &.normal-leave-active
        transition: all 0.4s
        .top, .bottom
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-enter, &.normal-leave-to
        opacity: 0
        .top
          transform: translate3d(0, -100px, 0)
        .bottom
          transform: translate3d(0, 100px, 0)
    .mini-player
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 180
      width: 100%
      height: 60px
      background: $color-highlight-background
      &.mini-enter-active, &.mini-leave-active
        transition: all 0.4s
      &.mini-enter, &.mini-leave-to
        opacity: 0
      .icon
        flex: 0 0 40px
        width: 40px
        padding: 0 10px 0 20px
        img
          border-radius: 50%
          &.play
            animation: rotate 10s linear infinite
          &.pause
            animation-play-state: paused
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          margin-bottom: 2px
          no-wrap()
          font-size: $font-size-medium
          color: $color-text
        .desc
          no-wrap()
          font-size: $font-size-small
          color: $color-text-d
      .control
        flex: 0 0 30px
        width: 30px
        padding: 0 10px
        .icon-play-mini, .icon-pause-mini, .icon-playlist
          font-size: 30px
          color: $color-theme-d
        .icon-mini
          font-size: 32px
          position: absolute
          right: 60px
          top: 14px

  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>
