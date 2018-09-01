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
        component: goods
      },{
        path: '/ratings',
        name: 'ratings',
        component: ratings
      },{
        path: '/seller',
        name: 'seller',
        component: seller
      }]
    }
  ]
})
