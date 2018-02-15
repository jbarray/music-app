<template>
  <div class="search">
    <searchBox :placeHolder="placeholder" ref="searchBox" @query="onQueryChange"></searchBox>
    <div class="shortcut-wrapper" v-show="!query">
      <div class="shortcut">
        <div class="hot-key" >
          <h1 class="title">热门搜索</h1>
          <ul>
            <li class="item" v-for="item in hotKey" @click="addQuery(item.k)">
              <span>{{item.k}}</span>
            </li>
          </ul>
        </div>
        <div class="search-history" v-show="searchHistory.length">
          <h1 class="title">
            <span class="text">搜索历史</span>
            <span class="clear">
              <i class="icon-clear"></i>
            </span>
          </h1>
          <search-list @delete="deleteSearchHistory" @select="addQuery" :searches="searchHistory"></search-list>
        </div>
      </div>
    </div>
    <div class="search-result" v-show="query" ref="searchResult" @listScroll="searchBoxBlur">
      <suggest :query="query" :showSinger="showSinger" @clickEvent="saveSearch"></suggest>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import searchBox from '../../base/search-box/search-box.vue'
import {getHotKey} from '../../api/search'
import {ERR_OK} from '../../api/config'
import suggest from '../suggest/suggest.vue'
import {mapActions,mapGetters} from 'vuex'
import searchList from '../../base/search-list/search-list.vue'

  export default {
    data() {
      return {
        placeholder:'搜索歌曲,歌手',
        hotKey:[],
        showSinger:true,
        query:null
      }
    },
    components:{
      searchBox,
      suggest,
      searchList
    },
    created() {
      this._getHotKey()
    },
    methods:{
      //获取热门搜索数据
      _getHotKey() {
        getHotKey().then((res) => {
          if(res.code === ERR_OK) {
            this.hotKey=res.data.hotkey.slice(0,10)
          }
        })
      },
      //点击热门数据 搜索框中出现该词
      addQuery(query) {
        this.$refs.searchBox.setQuery(query)
      },
      onQueryChange(data) {
        this.query=data
      },
      //suggest中的scroll改变时,searchBox的input引发blur,手机键盘消失
      searchBoxBlur() {
        this.$refs.searchBox.changeBlur()
      },
      saveSearch() {
        this.saveSearchHistory(this.query)
        console.log(this.searchHistory)
      },
      deleteSearchHistory(item) {
        this.deleteSearchHistory(item)
      },
      ...mapActions([
        'saveSearchHistory',
        'deleteSearchHistory'
      ]),
    },
    computed:{
      ...mapGetters([
        'searchHistory'
      ])
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
