import {mapGetters} from 'vuex'

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
