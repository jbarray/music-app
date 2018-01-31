<template>
  <div class="singer" ref="singer">
    <listview @select="selectSinger" :data="singers" ref="list"></listview>
    <router-view></router-view>
  </div>
</template>

<script>
import {getSingerList} from '../../api/singer'
import Singer from '../../common/js/singer'
import listview from '../../base/listview/listview.vue'
//mapMutations语法糖是对于引入vuex操作方法的封装
import {mapMutations} from 'vuex'

const HOT_NAME='推荐'
const HOT_SINGER_LEN=10
  export default {
    data() {
      return {
        singers:[],
        map:[]
      }
    },
    components:{
      listview
    },
    created() {
      this._getSingerList();
    },
    methods:{
      _getSingerList() {
        getSingerList().then((res) => {
          if(res.code===0) {
            this.singers=this._nowListMap(res.data.list);
          }
        })
      },
//      将得到的singerList进行排列,调整成我们需要的数据:即:热门-a-z
      _nowListMap(list) {
//        创建对象map,用来归类singerList
        let map={
          hot:{
            title:HOT_NAME,
            items:[]
          }
        }
        list.forEach((item,index) => {
//          添加hot的列表数据
          if(index < HOT_SINGER_LEN) {
//            item中只有三项是所需内容,只取这3项,其中有一项是图片链接,所有item都会用到,封装成对象Singer
            map.hot.items.push(new Singer({
              name: item.Fsinger_name,
              id: item.Fsinger_mid
            }))
          }
//          依据Findex来在map中建立方法
          const key=item.Findex
          if(!(map[key])){
            map[key] = {
              title:key,
              items:[]
            }
          }
          map[key].items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
        })
//        将对象转化成有序数组
        let hot=[]
        let ret=[]
        for(let key in map){
          let val=map[key]
          if(val.title.match(/[a-zA-Z]/)){
            ret.push(val)
          }else if(val.title===HOT_NAME){
            hot.push(val)
          }
        }
//        ret进行排序
        ret.sort((a,b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      },
      //      点击某个歌手时
      selectSinger(singer) {
        this.$router.push({
          path:`/singer/${singer.id}`
        })
        this.setSinger(singer)
      },
//      引入mapMutations
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
