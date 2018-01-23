<template>
  <div class="singer" ref="singer">

  </div>
</template>

<script>
import {getSingerList} from '../../api/singer'
import Singer from '../../common/js/singer'

const HOT_NAME='推荐'
const HOT_SINGER_LEN=10
  export default {
    data() {
      return {
        singerList:[],
        map:[]
      }
    },
    created() {
      this._getSingerList();
    },
    methods:{
      _getSingerList() {
        getSingerList().then((res) => {
          if(res.code===0) {
 //           console.log(this.singerLsit);
            this.singerLsit=this._nowListMap(res.data.list);
            console.log(this.singerLsit);
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
