<template>
  <scroll class="listview">
   <ul>
     <li v-for="group in data" class="list-group">
       <ul>
         <h2 class="list-group-title">{{group.title}}</h2>
         <li v-for="item in group.items" class="list-group-item">
           <img :src="item.avatar" class="avatar">
           <span class="name">{{item.name}}</span>
         </li>
       </ul>
     </li>
   </ul>
    <div class="list-shortcut">
      <ul>
        <li class="item" v-for="(item,index) in shortCutList">{{item}}
        </li>
      </ul>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import scroll from '../scroll/scroll.vue'
  export default {
    props:{
      data:{
        type:Array,
        default:[]
      }
    },
    components:{
      scroll
    },
    computed:{
//      获取右边导航的内容(字母)
      shortCutList() {
        return this.data.map((group) => {
          return group.title.substr(0,1)
        })
      },
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>