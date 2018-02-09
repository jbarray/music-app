<template>
  <div>
    <ul class="suggest-list">
      <li class="suggest-item">
        <div class="icon">
          <i ></i>
        </div>
        <div class="name">
          <p class="text" ></p>
        </div>
      </li>
      <loading ></loading>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from '../../base/scroll/scroll'
  import Loading from '../../base/loading/loading'
  import {search} from '../../api/search'
  import {ERR_OK} from '../../api/config'
  import {mapMutations, mapActions} from 'vuex'

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
            console.log(res.data)
          }
        })
      },
      searchMore() {

      },

      _genResult(data) {

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
      Loading,
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
