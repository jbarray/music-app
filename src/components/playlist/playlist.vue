<template>
  <transition name="list-fade">
    <div class="playlist" v-show="showFlag">
      <div class="list-wrapper">
        <div class="list-header">
          <h1 class="title">
            <i class="icon" :class="iconMode" @click="changeMode"></i>
            <span class="text">{{modeText}}</span>
            <span class="clear"  @click="confirmShow"><i class="icon-clear"></i></span>
          </h1>
        </div>
        <scroll :data="sequenceList" ref="listContent" class="list-content" :refreshDelay="refreshDelay">
          <transition-group name="list" tag="ul">
            <li :key="item.id" class="item" v-for="(item,index) in sequenceList" @click="changeCurrentIndex(item, index)" ref="list">
                <!--@click="selectItem(item,index)">-->
              <i class="current" :class="getCurrentIcon(item)"></i>
              <span class="text">{{item.name}}</span>
              <span class="like">
                <i :class="isFavorite(item)" @click="changeFavoriteMode(item)"></i>
              </span>
              <span  class="delete" @click.stop="deleteOne(item)">
              </span>
                <i class="icon-delete"></i>
            </li>
          </transition-group>
        </scroll>
        <div class="list-operate">
          <div class="add" @click="showAddSong">
            <i class="icon-add"></i>
            <span class="text">添加歌曲到列表</span>
          </div>
        </div>
        <div class="list-close"  @click="hide">
          <span>关闭</span>
        </div>
      </div>
      <confirm ref="confirm" @confirm="confirmClear" text="是否清空播放列表" confirmBtnText="清空"></confirm>
      <add-song ref="addSong"></add-song>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapActions} from 'vuex'
  import {playMode} from '../../common/js/config'
  import Scroll from '../../base/scroll/scroll'
  import Confirm from '../../base/confirm/confirm'
  import AddSong from '../../components/add-song/add-song'
  import {playerMixin} from '../../common/js/mixin'

  export default {
    mixins: [playerMixin],
    data() {
      return {
        showFlag: false,
        refreshDelay:100,
      }
    },
    computed: {
      modeText() {
        return this.mode === playMode.sequence? '顺序播放' : this.mode === playMode.random? '随机播放': '单曲循环'
      }
    },
    watch:{
      // 当前播放歌曲发生改变时,当前歌曲置顶
      currentSong(newSong, oldSong){
        if( !this.showFlag || newSong === oldSong) {
          return
        }
        setTimeout(() => {
          this.scrollToCurrentSong(newSong)
        }, 20)
      }
    },
    methods: {
      ...mapActions(['deleteSong','deleteSongList','playlist']),
      show() {
        this.showFlag = true
        setTimeout(() => {
          this.$refs.listContent.refresh();
          this.scrollToCurrentSong(this.currentSong);
        }, 20)
      },
      hide() {
        this.showFlag = false
      },
      getCurrentIcon(item){
        if(item.id === this.currentSong.id) {
          return 'icon-play'
        }else{
          return ''
        }
      },

      // 点击歌曲列表中其他歌曲 切换当前播放歌曲 播放状态为播放
      changeCurrentIndex(item, index) {
        //当前播放模式为随机播放的话 要从playlist中找到currentsong的index值
        if(this.mode === playMode.random) {
          index = this.playlist.findIndex((song) => {
            return song.id = item.id
          })
        }
        this.setCurrentIndex(index);
        this.setPlayingState(true);
      },

      // 当前播放歌曲位于列表最顶部
      scrollToCurrentSong(item) {
        if(item === null){
          return
        }
        const index = this.sequenceList.findIndex((song) => {
          return item.id === song.id
        })
        this.$refs.listContent.scrollToElement(this.$refs.list[index],300);
//        this.$refs.listContent.scrollToElement(this.$refs.list.$el.children[index], 300)
      },

      //单个歌曲点击删除
      deleteOne(item){
        this.deleteSong(item)
        if(!this.playlist) {
          this.hide()
        }
      },

      //点击清空按钮
      confirmShow(){
        this.$refs.confirm.show();
      },
      //点击确认页面的清空
      confirmClear() {
        this.deleteSongList();
        //隐藏playlist
        this.hide();
      },

      //打开添加歌曲页面
      showAddSong() {
        this.$refs.addSong.show();
      },

    },
    components: {
      scroll:Scroll,
      Confirm,
      AddSong
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .playlist
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 200
    background-color: $color-background-d
    &.list-fade-enter-active, &.list-fade-leave-active
      transition: opacity 0.3s
      .list-wrapper
        transition: all 0.3s
    &.list-fade-enter, &.list-fade-leave-to
      opacity: 0
      .list-wrapper
        transform: translate3d(0, 100%, 0)
    &.list-fade-enter
    .list-wrapper
      position: absolute
      left: 0
      bottom: 0
      width: 100%
      background-color: $color-highlight-background
      .list-header
        position: relative
        padding: 20px 30px 10px 20px
        .title
          display: flex
          align-items: center
          .icon
            margin-right: 10px
            font-size: 30px
            color: $color-theme-d
          .text
            flex: 1
            font-size: $font-size-medium
            color: $color-text-l
          .clear
            extend-click()
            .icon-clear
              font-size: $font-size-medium
              color: $color-text-d
      .list-content
        max-height: 240px
        overflow: hidden
        .item
          display: flex
          align-items: center
          height: 40px
          padding: 0 30px 0 20px
          overflow: hidden
          &.list-enter-active, &.list-leave-active
            transition: all 0.1s
          &.list-enter, &.list-leave-to
            height: 0
          .current
            flex: 0 0 20px
            width: 20px
            font-size: $font-size-small
            color: $color-theme-d
          .text
            flex: 1
            no-wrap()
            font-size: $font-size-medium
            color: $color-text-d
          .like
            extend-click()
            margin-right: 15px
            font-size: $font-size-small
            color: $color-theme
            .icon-favorite
              color: $color-sub-theme
          .delete
            extend-click()
            font-size: $font-size-small
            color: $color-theme
      .list-operate
        width: 140px
        margin: 20px auto 30px auto
        .add
          display: flex
          align-items: center
          padding: 8px 16px
          border: 1px solid $color-text-l
          border-radius: 100px
          color: $color-text-l
          .icon-add
            margin-right: 5px
            font-size: $font-size-small-s
          .text
            font-size: $font-size-small
      .list-close
        text-align: center
        line-height: 50px
        background: $color-background
        font-size: $font-size-medium-x
        color: $color-text-l
</style>
