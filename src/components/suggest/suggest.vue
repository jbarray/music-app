<template>
  <Scroll class="suggest" :data="result" :pullup="pullup" @scrollToEnd="searchMore" @beforeScroll="listScroll">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="item in result" @click="selectItem(item)">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)" ></p>
        </div>
      </li>
      <loading v-show="hasMore" title=" "></loading>
    </ul>
    <div v-show="!hasMore && !result.length" class="no-result-wrapper">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </Scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from '../../base/scroll/scroll'
  import Loading from '../../base/loading/loading'
  import {search} from '../../api/search'
  import {ERR_OK} from '../../api/config'
  import {mapMutations, mapActions} from 'vuex'
  import {filterSinger} from '../../common/js/song'
  import Singer from '../../common/js/singer'
  import noResult from '../../base/no-result/no-result.vue'

  const TYPE_SINGER = 'singer'
  const perpage = 20
  export default {
    props: {
      showSinger: {
        type: Boolean,
        default: true
      },
      query: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        page: 1,
        result: [],
        pullup:true,
        hasMore:true,
        beforeScroll:true
      }
    },
    methods: {
      //query发生变化时,需要获取后端数据
      search() {
        this.hasMore=true
        search(this.query,this.page,this.showSinger,perpage).then((res) => {
          if(res.code ===ERR_OK) {
            //将获得的数据进行整理
            this.result=this._genResult(res.data)
            this._checkMore(res.data)
          }
        })
      },
      _genResult(data) {
        let ret = []
        //如果zhidao存在数据的话 即检索结果内有歌手的话,加入数组
        if(data.zhida && data.zhida.singerid) {
          ret.push({...data.zhida, ...{type:TYPE_SINGER}})
        }
        if(data.song) {
          ret=ret.concat(data.song.list)
        }
        return ret
      },
      //检索结果 根据检索结果的不同,区分class 从而显示不同的logo
      getIconCls(item) {
        if(item.type === TYPE_SINGER) {
          return 'icon-mine'
        }else{
          return 'icon-music'
        }
      },
      //检索结果 根据检索结果的不同,区分html的内容
      getDisplayName(item) {
        if(item.type === TYPE_SINGER) {
          return item.singername
        }else{
          //检索结果为歌曲的话 显示歌曲的名字和歌手的名字
          return `${item.songname}-${filterSinger(item.singer)}`
        }
      },
      //当滚动到最下方 需要添加新数据的时候
      searchMore() {
        //先进行判断 是否还有数据 若后端没有可展示数据的话 返回
        if(!this.hasMore) {
          return
        }else{
          //获取下一页的数据 perpage决定了一页有多少个数据
          this.page++
          search(this.query,this.page,this.showSinger,perpage).then((res) => {
            if(res.code ===ERR_OK) {
              //将获得的数据进行整理
              this.result=this.result.concat(this._genResult(res.data))
              //判断hasMore是否存在 当totalnum小于当前此页的数据个数 加上之前的页数*每页的个数时 则已经没有数据可以展示
              this._checkMore(res.data)
            }
          })
        }
      },
      _checkMore(data) {
        let song = data.song
        if(!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum ) {
          this.hasMore = false
        }
      },
      //点击每一个搜索结果时
      selectItem(item) {
        if(item.type === TYPE_SINGER) {
          const singer = new Singer({
            id: item.singermid,
            name: item.singername
          })
        this.$router.push({
          path:`/search/${singer.id}`
        })
        this.setSinger(singer)
        }else{
          this.insertSong(item)
        }
        this.$emit('clickEvent')
      },
      //scroll开始滑动时 告诉父组件
      listScroll() {
        this.$emit('listScroll')
      },
      _normalizeSongs(list) {
        let ret = []

        return ret
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      }),
      ...mapActions({
        insertSong:'insertSong'
      })
    },
    watch: {
      query(newQuery) {
        this.search(newQuery)
      }
    },
    components: {
      Scroll,
      Loading,
      noResult
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
