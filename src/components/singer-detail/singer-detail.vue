<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {getSingerDetail,getSongDetail} from '../../api/singer'
  import {createSong,createKey} from '../../common/js/song'
  import musicList from '../../components/music-list/music-list.vue'
  const ERR_OK = 200
  export default {
    data() {
      return {
        songs: [],
      }
    },
    computed: {
      title() {
        return this.singer.name
      },
      bgImage() {
        return this.singer.avatar
      },
      ...mapGetters([
        'singer'
      ])
    },
    created() {
      this._getDetail()
    },
    methods: {
      //获取后端数据并且封装
      _getDetail() {
        //防止没有此歌手内容,跳转回歌手列表
        if (!this.singer.id) {
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === 0) {
//            res.data.list.forEach((item,index) => {
//              getSongDetail(item.musicData.songmid).then((resp) => {
//                if(resp.code === 0) {
//                  this.keyArr.push(createKey(resp.data.items[0].vkey))
////                  this.$set(this.keyArr,index,resp.data.items[0].vkey)
//                }
//              })
//            })
            this.songs = this._normalizeSongs(res.data.list)
          }
        })
        console.log(this.songs)
      },
      //整理获取的jsonp数据
      _normalizeSongs(list) {
        let ret=[]
        let p
//        console.log(this.keyList)
//        res.data.list.forEach((item,index) => {
//          getSongDetail(item.musicData.songmid).then((resp) => {
//            if(resp.code === 0) {
//              this.keyArr.push(createKey(resp.data.items[0].vkey))
////                  this.$set(this.keyArr,index,resp.data.items[0].vkey)
//            }
//          })
//        })
        list.forEach((item,index) => {
          getSongDetail(item.musicData.songmid).then((resp) => {
            if(resp.code === 0) {
              p=resp.data.items[0].vkey
//                  this.$set(this.keyArr,index,resp.data.items[0].vkey)
              let {musicData} =item
              //确保两个id存在
              if(musicData.songid&&musicData.albummid){
                ret.push(createSong(musicData,p))
              }
            }
          })
        })
        return ret
      }
    },
    components: {
      musicList
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
