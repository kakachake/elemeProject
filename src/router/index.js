import Vue from 'vue'
import Router from 'vue-router'
import index from '../pages/index/index'
import goods from '../pages/index/components/goods/goods'
import ratings from '../pages/index/components/ratings/ratings'
import seller from '../pages/index/components/seller/seller'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect:'/goods',//默认进入goods路由页面
      children: [{
        path: '/goods',
        name: 'goods',
        meta:{index:0},
        component: goods
      },{
        path: '/ratings',
        name: 'ratings',
        meta:{index:1},
        component: ratings
      },{
        path: '/seller',
        name: 'seller',
        meta:{index:2},
        component: seller
      }]
    }
  ]
})
