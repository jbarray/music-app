<template>
  <div class="suggest">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="item in result">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)" ></p>
        </div>
      </li>
      <!--<loading ></loading>-->
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from '../../base/scroll/scroll'
//  import Loading from '../../base/loading/loading'
  import {search} from '../../api/search'
  import {ERR_OK} from '../../api/config'
  import {mapMutations, mapActions} from 'vuex'
  import {filterSinger} from '../../common/js/song'

  const TYPE_SINGER = 'singer'

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
        result: []
      }
    },
    methods: {
      //query发生变化时,需要获取后端数据
      search() {
        search(this.query,this.page,this.showSinger).then((res) => {
          if(res.code ===ERR_OK) {
            //将获得的数据进行整理
            this.result=this._genResult(res.data)
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
      _normalizeSongs(list) {
        let ret = []

        return ret
      },

    },
    watch: {
      query(newQuery) {
        this.search(newQuery)
      }
    },
    components: {
      Scroll,
//      Loading,
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
