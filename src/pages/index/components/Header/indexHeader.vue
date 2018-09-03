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
        <div
        v-if="seller.supports"
        class="support-count"
        @click="handleHeaderclick"
         >
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
    </div>
    <div class="bulletin-wrapper"
    @click="handleHeaderclick">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <!-- //详情页面 -->
    <transition>
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
            <div class="detail-main">
              <h1 class="name">{{seller.name}}</h1>
              <div class="star-wrapper">
                <star :size="48" :score="seller.score"></star>
              </div>
              <detailtitle v-if="seller.supports" :title="'优惠信息'"></detailtitle>
              <div v-if="seller.supports" class="support">
                <div v-for="item of seller.supports" class="supports">
                    <span class="icon" :class="classMap[item.type]"></span>
                    <span class="text">{{item.description}}</span>
                </div>
              </div>
            <detailtitle v-if="seller.supports" :title="'商家公告'"></detailtitle>
              <div class="bulletin">
                <p>
                  {{seller.bulletin}}
                </p>
              </div>
            </div>
        </div>
        <div class="detail-close" @click="handleHeaderclick">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import star from '../star/star';
import detailtitle from '../detailTitle/detailTitle';
export default {
  name: 'indexHeader',
  props: {
    seller: Object
  },
  data () {
    return {
      classMap: [],
      detailShow:false
    }
  },
  created() {
    this.classMap = ['decrease', 'discount','special', 'guarantee', 'invoice']
  },
  methods:{
    handleHeaderclick (){
      this.detailShow = !this.detailShow
    }
  },
  components: {
    star,
    detailtitle
  }
}
</script>

<style lang="stylus" scoped>
 @import "~@/common/stylus/mixin.styl"
 @import "~@/common/stylus/icon.styl"
 @import "~@/common/stylus/base.styl"
  .header
    position: relative
    color: #fff
    overflow: hidden
    background: rgba(7, 17, 27, 0.4)
    .content-wrapper
      display: flex
      flex-direction: row
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
        height: .48rem
        line-height: .48rem
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
    .bulletin-wrapper
      background-color: rgba(7, 17, 27, 0.3);
      position: relative;
      height: .56rem
      line-height: .56rem
      padding: 0 .44rem 0 .24rem
      display: flex;
      .bulletin-title
        display: inline-block
        margin-top: .16rem
        bg-image('bulletin') no-repeat
        background-size:100% 100%
        width: .44rem
        height: .24rem
      .bulletin-text
        font-size: 10px
        width: 90%
        margin:0 .08rem
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
      .icon-keyboard_arrow_right
        margin-top: .16rem
    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      filter:blur(10px)
    .detail
      position: fixed
      top: 0
      left: 0
      z-index: 100
      width: 100%
      height: 100%
      overflow: auto
      background: rgba(7, 17, 27, .8)
      .detail-wrapper
        min-height: 100%
        width: 100%
        .detail-main
          margin-top: 1.28rem
          padding-bottom: 1.28rem
          .name
            line-height: .32rem
            text-align: center
            font-size: .32rem
            font-weight: 700
          .star-wrapper
            margin-top: .36rem
            padding: .04rem 0
          .support
            width: 80%
            margin: 0 auto;
            padding-left: .24rem;
            box-sizing: border-box;
            .supports
              margin .24rem 0 .24rem 0
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
                padding-left: .24rem;
                display: inline-block;
                vertical-align: middle;
                line-height: .24rem
                font-weight: 200
                font-size: .24rem
          .bulletin
            box-sizing: border-box;
            padding:0 .24rem 0 .24rem;
            width: 80%;
            margin: 0 auto;
            line-height: .48rem
            font-weight: 200
            font-size: .24rem
      .detail-close
        position: relative
        width: .64rem
        height: .64rem
        margin: -1.28rem auto .48rem auto
        clear: both
        font-size: .64rem




    .v-enter,
    .v-leave-active {
       opacity: 0
    }

    .v-leave-active,
    .v-enter-active{
       transition: opacity .5s
    }
</style>
