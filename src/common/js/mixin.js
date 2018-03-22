import {mapGetters, mapMutations, mapActions} from 'vuex'
import {playMode} from '../../common/js/config'
import {shuffle} from '../../common/js/utill'

export const playlistMixin = {
  computed: {
    ...mapGetters(['playlist'])
  },
  mounted() {
    this.handlePlaylist(this.playlist)
  },
  //keep-alive激活时执行的内容
  activated() {
    this.handlePlaylist(this.playlist)
  },
  watch: {
    playlist(newVal) {
      this.handlePlaylist(newVal)
    }
  },
  methods:{
    //handlePlaylist是在具体组件中执行的方法
    handlePlaylist() {
      //如果具体组件没有出现这个方法的话 就会执行此方法 报错,提醒组件中需要建立
      throw new Error('component must build handlePlaylist method')
    }
  },
}

export const playerMixin = ({
  computed:{
    iconMode() {
      return this.mode === playMode.sequence? 'icon-sequence' : this.mode === playMode.loop? 'icon-loop' : 'icon-random'
    },
    ...mapGetters([
      'mode',
      'sequenceList',
      'currentSong',])
  },
  methods: {
    //点击 播放模式按钮 ,会改变vuex中mode的值
    changeMode() {
      const mode = (this.mode+1)%3
      this.setPlayMode(mode)
      //歌曲播放模式改变的主要是歌曲播放列表,随机播放时列表和其他两个模式的不同
      let list = null
      if(mode === playMode.random) {
        // 打破重组playList
        list = shuffle(this.sequenceList)
      }else{
        list = this.sequenceList
      }
      //修改播放列表时,currentIndex不发生改变,即当前歌曲不改变
      this.resetCurrentIndex(list)
      //修改播放列表
      this.setPlayList(list)
    },

    resetCurrentIndex(arr) {
      let index = arr.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },

    ...mapMutations({
      setPlayMode: 'SET_PLAY_MODE',
      setPlayList: 'SET_PLAYLIST',
      setCurrentIndex:'SET_CURRENT_INDEX',
      setPlayingState:'SET_PLAYING_STATE',
    })
  }
})

export const searchMixin = ({
  data() {
    return {
      query:'',
      refreshDelay:100
    }
  },
  computed:{
    ...mapGetters([
      'searchHistory'
    ]),
  },
  methods: {
    searchBoxBlur() {
      this.$refs.searchBox.changeBlur()
    },
    saveSearch() {
      this.saveSearchHistory(this.query)
    },
    //点击热门数据 搜索框中出现该词
    addQuery (query) {
      this.$refs.searchBox.setQuery(query)
    },
    onQueryChange(data) {
      this.query=data
    },
    deleteSearchHistory(item) {
      this.deleteSearchHistory(item)
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory',
    ])
  }
})
