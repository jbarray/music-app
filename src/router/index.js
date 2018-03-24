import Vue from 'vue'
import Router from 'vue-router'
import Container from '../components/container/container.vue'
import Rank from '../components/rank/rank.vue'
import Search from '../components/search/search.vue'
import Singer from '../components/singer/singer.vue'
import Recommend from '../components/recommend/recommend.vue'
import singerDetail from '../components/singer-detail/singer-detail.vue'
import TopList from '../components/top-list/top-list.vue'
import user from '../components/user-center/user-center.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Container,
      redirect:'/recommend',
      children: [
        {
          path: '/rank',
          component: Rank,
          children: [
            {
              path: ':id',
              component: TopList
            }
          ]
        },
        {
          path: '/search',
          component: Search,
          children:[
            {
              path:':id',
              component:singerDetail
            }
          ]
        },
        {
          path: '/singer',
          component: Singer,
          children:[
            {
              path:':id',
              component:singerDetail
            }
          ]

        },
        {
          path: '/recommend',
          component: Recommend,
        },
        {
          path: '/user',
          component: user
        },
      ]
    }
  ]
})
