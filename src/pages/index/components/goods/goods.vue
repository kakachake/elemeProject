<template lang="html">
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="item in seller.goods" class="menu-item border-bottom">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">

    </div>
  </div>
</template>

<script>

import axios from 'axios'
export default {
  data () {
    return{
      seller:{}
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
    this.getIndexInfo(),
    this.classMap = ['decrease', 'discount','special', 'guarantee', 'invoice']
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/common/stylus/mixin.styl"
  .goods
    display: flex
    position: absolute
    top: 3.48rem
    bottom: .92rem
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 1.6rem
      width: 1.6rem
      background: #f3f5f7
      .menu-item
        display: table
        height: 1.08rem
        width: 1.12rem
        line-height: .28rem
        margin: 0 auto;
      .border-bottom
        border-bottom:1px solid rgba(7, 17, 27,  0.1)
        .text
          display: table-cell
          vertical-align: middle;
          .icon
            vertical-align: middle;
            display: inline-block
            width: .32rem
            height: .32rem
            margin-right: .08rem
            background-color: black
            background-size: .32rem .32rem
            background-image: no-repeat
            &.decrease
             bg-image('decrease_1')
            &.discount
             bg-image('discount_1')
            &.guarantee
             bg-image('guarantee_1')
            &.invoice
             bg-image('invoice_1')
            &.special
             bg-image('special_1')
            .text
             display: inline-block;
             vertical-align: middle;
             line-height: .28rem
             font-weight: 300
             font-size: .24rem
             color: #000
    .foods-wrapper
     flex: 1
</style>
