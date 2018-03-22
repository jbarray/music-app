<template>
  <div class="search">
    <searchBox :placeHolder="placeholder" ref="searchBox" @query="onQueryChange"></searchBox>
    <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
      <!--scroll的数据=热门搜索数据+搜索历史数据-->
      <scroll :data="shortcut" class="shortcut" ref="shortcut">
        <div>
          <div class="hot-key" >
            <h1 class="title">热门搜索</h1>
            <ul>
              <li class="item" v-for="item in hotKey" @click="addQuery(item.k)"><span>{{item.k}}</span></li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="clear">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-list @delete="deleteSearchHistory" @select="addQuery" :searches="searchHistory"></search-list>
          </div>
      </div>
      </scroll>
    </div>
    <div class="search-result" v-show="query" ref="searchResult" @listScroll="searchBoxBlur">
      <suggest :query="query" :showSinger="showSinger" @clickEvent="saveSearch" ref="suggest"></suggest>
    </div>
    <confirm ref="confirm" @confirm="clearSearchHistory" text="是否清空所有搜索历史" confirmBtnText="清空"></confirm>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import searchBox from '../../base/search-box/search-box.vue'
import {getHotKey} from '../../api/search'
import {ERR_OK} from '../../api/config'
import suggest from '../suggest/suggest.vue'
import {mapActions} from 'vuex'
import searchList from '../../base/search-list/search-list.vue'
import confirm from '../../base/confirm/confirm.vue'
import Scroll from '../../base/scroll/scroll.vue'
import {playlistMixin, searchMixin} from '../../common/js/mixin'

export default {
  mixins: [playlistMixin, searchMixin],
  data () {
    return {
      placeholder: '搜索歌曲,歌手',
      hotKey: [],
      showSinger: true,
    }
  },
  components: {
    searchBox,
    suggest,
    searchList,
    confirm,
    Scroll
  },
  created () {
    this._getHotKey()
  },
  methods: {
   //获取热门搜索数据
    _getHotKey () {
      getHotKey().then((res) => {
       if(res.code === ERR_OK) {
          this.hotKey = res.data.hotkey.slice(0,10)
       }
      })
    },

    deleteSearchHistory(item) {
      this.deleteSearchHistory(item)
    },
    ...mapActions([
//      'saveSearchHistory',
//      'deleteSearchHistory',
      'clearSearchHistory'
    ]),
    //  点击垃圾筐 出现弹窗
    clear () {
      this.$refs.confirm.show()
    },
    //  mini播放的显示
    handlePlaylist (playlist) {
      console.log('length'+playlist.length)
      //  是否显示
      const bottom = playlist.length > 0 ? '60px' : ''
      console.log(bottom)

      //  搜索结果页面和 热门搜索+搜索历史 页面 底部位置
      this.$refs.searchResult.style.bottom = bottom
      this.$refs.suggest.refresh()

      this.$refs.shortcutWrapper.style.bottom = bottom
      this.$refs.shortcut.refresh()
    }
  },
  computed: {
    shortcut () {
      return this.hotKey.concat(this.searchHistory)
    }
  },
  watch: {
    query (newQuery) {
      if (!newQuery) {
        setTimeout(() => {
          this.$refs.shortcut.refresh()
        }, 20)
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>
