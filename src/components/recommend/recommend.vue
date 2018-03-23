<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList" >
      <div>
       <div class="recommend-content">
         <!--轮播图-->
         <div v-if="recommends.length" class="slider-wrapper">
           <slider>
             <div v-for="item in recommends">
               <a :href="item.linkUrl">
                 <img :src="item.picUrl" @load="loadImage">
               </a>
             </div>
           </slider>
         </div>
         <!--推荐内容-->
         <div class="recommend-list">
           <h1 class="list-title">热门推荐</h1>
           <ul>
             <li @click="selectItem(item)" v-for="item in discList" class="item">
               <div class="icon">
                 <img v-lazy="item.imgurl" width="60" height="60">
               </div>
               <div class="text">
                 <h2 class="name">{{item.name}}</h2>
                 <p class="desc" v-html="item.discname"></p>
               </div>
             </li>
           </ul>
           <!--页面没有出现内容的时候,会出现一个正在加载的图标-->
           <div class="loading-container" v-show="!discList.length">
             <loading></loading>
           </div>
         </div>
       </div>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getRecommend} from '../../api/recommend'
  import {ERR_OK} from '../../api/config'
  import slider from '../../../src/base/slider/slider.vue'
  import {getDiscList} from '../../api/recommend'
  import Scroll from '../../../src/base/scroll/scroll'
  import loading from '../../../src/base/loading/loading.vue'
  import {playlistMixin} from '../../common/js/mixin'

  export default {
    mixins:[playlistMixin],
    data(){
      return {
        recommends:[],
        discList: [
          {
            imgurl:'http://p.qpic.cn/music_cover/ibSiagqKjw1zfTgxY7F8CfExCiaWEgEcI9eWeJeWHkzAP9Uib0Ckuibmg0w/600?n=1',
            name:'每日新歌：Alan Walker助阵电影热单',
            discname:'播放量:27.1万'
          },
          {
            imgurl:'http://p.qpic.cn/music_cover/JBDCVgqXWXaYUvcsElqcicfrInhQexsibQJWL7vT2qXbavytWofjmTCQ/600?n=1',
            name:'郁可唯终极补位，《歌手》第10期原唱抢先听',
            discname:'播放量:9.8万'
          },
          {
            imgurl:'http://p.qpic.cn/music_cover/MhQ4bJBPt3Yt5icXyBGNhyHicia4ZVAqggkibps6M4fmz5ibZerm0SOR4lw/600?n=1',
            name:'生物老师最爱的歌单，简直是动物大全',
            discname:'播放量:33.6万'
          },
          {
            imgurl:'http://p.qpic.cn/music_cover/RrXobiciaW7sU0htwoU8XrKNbXCsUUNXYpLbSQad0oa8Pxm4NYpTicauQ/600?n=1',
            name:'这些歌手的低音可以有多低？',
            discname:'播放量:53.7万'
          },
          {
            imgurl:'http://p.qpic.cn/music_cover/hSqULWEBYJEo7iaPyicuhTvRxtnXv8HEntGQxE0aPSFIEjMQP2qYk5Xw/600?n=1',
            name:'柏林爱乐：古典最高演奏水准乐团',
            discname:'播放量:34.7万'
          },
          {
            imgurl:'http://p.qpic.cn/music_cover/Ay2w92PeiaO57pZWMwecv6cqfHRc71Uiah6M0HXJYia9RQyOIcDt7K8Ug/600?n=1',
            name:'自然纯音：雨季/浪潮/鸟蝉/风铃/',
            discname:'播放量:20.9万'
          },
        ]
      }
    },
    components:{
      slider,
      Scroll,
      loading
    },
    created() {
      this._getRecommend()
//       this. _getDiscList()
    },
    methods: {
      //mini播放器的引入及适配
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''

        this.$refs.recommend.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      _getRecommend() {
        getRecommend().then((res) => {
          if(res.code === ERR_OK) {
            this.recommends=res.data.slider
          }
        })
      },
//      _getDiscList() {
//        getDiscList().then((res) => {
//          if (res.code === ERR_OK) {
//            this.discList = res.data.list
//          }
//        })
//      },
      loadImage() {
        if(!this.checkLoaded){
          this.$refs.scroll.refresh()
        }
        this.checkLoaded=true;
      },
      selectItem(item) {
        this.$router.push({
          path: `/recommend/${item.dissid}`
        })
//        this.setDisc(item)
      },
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      position relative
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        position: relative
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color:  $color-text
            .desc
              color:  $color-text-d
        .loading-container
          position: absolute
          width: 100%
          top: 50%
          transform: translateY(-50%)
</style>
