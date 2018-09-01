<template lang="html">
  <div class="">
    <v-header :seller = "seller.seller"></v-header>
    <v-tab></v-tab>
    <router-view ></router-view>
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
      seller: {}
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
  }

}

</script>

<style lang="stylus" scoped>

</style>
