<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
       <div class="recommend-content">
         <div v-if="recommends.length" class="slider-wrapper">
           <slider>
             <div v-for="item in recommends">
               <a :href="item.linkUrl">
                 <img :src="item.picUrl" @load="loadImage">
               </a>
             </div>
           </slider>
         </div>
         <div class="recommend-list">
           <h1 class="list-title">热门推荐</h1>
           <ul>
             <li @click="selectItem(item)" v-for="item in discList" class="item">
               <div class="icon">
                 <img :src="item.imgurl" width="60" height="60">
               </div>
               <div class="text">
                 <h2 class="name">{{item.creator.name}}</h2>
                 <p class="desc" v-html="item.dissname"></p>
               </div>
             </li>
           </ul>
         </div>
         <!--<div class="loading-container" v-show="!discList.length">-->
           <!--<loading></loading>-->
         <!--</div>-->
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

  export default {
    data(){
      return {
        recommends:[],
        discList: []
      }
    },
    components:{
      slider,
      Scroll,
    },
    created() {
      this._getRecommend()
       this. _getDiscList()
    },
    methods: {
      _getRecommend() {
        getRecommend().then((res) => {
          if(res.code === ERR_OK) {
            this.recommends=res.data.slider
          }
        })
      },
      _getDiscList() {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            this.discList = res.data.list
            console.log(this.discList);
          }
        })
      },
      loadImage() {
        if(!this.checkLoaded){
          this.$refs.slider.refresh()
        }
        this.checkLoaded=true;
      }
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
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
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
              color: black
            .desc
              color: black
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
