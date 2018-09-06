<template lang="html">
  <div class="">
    <v-header :seller = "seller.seller"></v-header>
      <v-tab></v-tab>
    <transition :name="transitionName">
      <router-view ></router-view>
    </transition>
  </div>
</template>

<script>
import header from './components/Header/indexHeader.vue'
import tab from './components/Tab/indexTab.vue'
import axios from 'axios'

export default {
  name: 'v-index',
  components: {
    'v-header': header,
    'v-tab': tab
  },
  data () {
    return {
      seller: {},
      transitionName:''
    }
  },
  methods: {
    getIndexInfo () {
      axios.get('/api/seller.json')
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (msg) {
      if(msg.data.error === 0){
        this.seller = msg.data
        console.log(this.seller);
      }
    }
  },
  created () {
    this.getIndexInfo()
  },
  watch: {//使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if(to.meta.index > from.meta.index){
        //设置动画名称
        this.transitionName = 'slide-left';
      }else{
        this.transitionName = 'slide-right';
      }
    }
  }
}

</script>

<style lang="stylus" scoped>
  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active
    transition: all 500ms;
    position: absolute;
    top: 0
    bottom: 0
    right: 0
    left: 0
  .slide-left-leave-active,
  .slide-right-enter{
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
</style>
