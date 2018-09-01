<template lang="html">
  <div class="header">
    <div class="content-wrapper">
        <div class="avatar">
          <img :src="seller.avatar" alt="">
        </div>
        <div class="content">
          <div class="title">
            <span class="brand"></span>
            <span class="name">{{seller.name}}</span>
          </div>
          <div class="description">
              {{seller.description}}/{{seller.deliveryTime}}分钟送达
          </div>
          <div v-if="seller.supports" class="supports">
              <span class="icon" :class="classMap[seller.supports[0].type]"></span>
              <span class="text">{{seller.supports[0].description}}</span>
          </div>





        </div>
        <div v-if="seller.supports" class="support-count">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
    </div>
    <div class="bulleting-wrapper"></div>
  </div>
</template>

<script>
export default {
  name: 'indexHeader',
  props: {
    seller: Object
  },
  data () {
    return {
      classMap: []
    }
  },
  created() {
    this.classMap = ['decrease', 'discount','special', 'guarantee', 'invoice']
  }
}
</script>

<style lang="stylus" scoped>
 @import "~@/common/stylus/mixin.styl"
 @import "~@/common/stylus/icon.styl"
  .header
    color: #fff
    background: #777
    .content-wrapper
      position: relative
      font-size: 0
      padding: .48rem .32rem .36rem .48rem
      .avatar
        vertical-align: top
        display: inline-block;
        vertical-align: top
        img
          width: 1.28rem
          height: 1.28rem
          border-radius: .08rem
      .content
        margin-left: .32rem
        display: inline-block;
        font-size: .28rem
        .title
          margin: .04rem 0 .16rem 0;
          .brand
            display: inline-block;
            width: .6rem
            height: .36rem
            bg-image('brand')
            background-size: .6rem .36rem
            background-repeat: no-repeat
            vertical-align: top
          .name
            margin-left: .12rem
            font-size: .32rem
            font-weight: bold
            line-height: .36rem
        .description
          margin-bottom: .2rem
          line-height: .24rem
          font-size: .24rem
        .supports
          .icon
            display: inline-block
            width: .24rem
            height: .24rem
            margin-right: .08rem
            background-color: black
            background-size: .24rem .24rem
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
            vertical-align: top
            line-height: .24rem
            font-size: .2rem
      .support-count
        position: absolute
        right: .24rem
        bottom: .36rem
        padding: 0 .16rem
        height: 24px
        line-height: 24px
        border-radius: .28rem
        background-color: rgba(0, 0, 0, 0.2);
        text-align:center
        .count
          vertical-align: top;
          font-size: .2rem
        .icon-keyboard_arrow_right
          margin-left: .04rem
          line-height: .48rem
          font-size: .2rem

</style>
