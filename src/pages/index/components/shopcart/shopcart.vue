<template lang="html">
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper" >
          <div class="logo" :class="{'heightlight':totalCount>0}">
            <i class="icon-shopping_cart" :class="{'heightlight':totalCount>0}"></i>
          </div>
          <div class="num" v-show="totalCount>0">
            {{totalCount}}
          </div>
        </div>
        <div class="price border-right" :class="{'heightlight':totalCount>0}">
          ￥{{totalPrice}}
        </div>
        <div class="desc">
          另需配送费{{seller.deliveryPrice}}元
        </div>
      </div>
      <div class="content-right" :class="{'heightlight':totalPrice>=seller.minPrice}">
        <div class="totalPrice">{{payDesc}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"shopcart",
  props:{
    seller: Object,
    selectFoods: {
      type: Array,
      default() {
        return [
        ]
      }
    }
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach((food)=> {
        total += food.price * food.count;
      });
      return total
    },
    totalCount() {
      let count = 0
      this.selectFoods.forEach((food)=>{
        count += food.count
      })
      return count
    },
    payDesc() {
      if(this.totalPrice === 0) {
        return `${this.seller.minPrice}元起送`
      }else if(this.totalPrice<this.seller.minPrice){
      return `还差${this.seller.minPrice-this.totalPrice}起送`
    }else {
      return "去结算"
    }
  }
  }
}
</script>

<style lang="stylus" scoped>
 @import "~@/common/stylus/icon.styl"
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: .96rem
    .content
      display: flex;
      background: #141d27
      font-size: 0
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          position: relative
          top: -.2rem
          margin: 0 .24rem
          padding: .12rem
          width: 1.12rem
          height: 1.12rem
          border-radius: 50%
          background: #141d27
          box-sizing: border-box;
          vertical-align: top
          .num
            position: absolute;
            top: 0
            right: 0
            width: .48rem
            height: .32rem
            line-height: .32rem
            text-align: center;
            border-radius: .32rem
            font-size: .18rem
            font-weight: 700
            color: #fff
            background: rgb(240, 20, 20)
            box-shadow: 0, .08rem, .16rem 0 rgba(0, 0, 0, 0.5);
          .logo
            width: 100%
            height: 100%
            text-align: center
            border-radius: 50%
            background: #2b343c
            &.heightlight
              background: rgb(0, 160, 220);
            .icon-shopping_cart
              line-height: .88rem
              font-size: .48rem
              color: rgba(255,255,255,.4)
              &.heightlight
                color: #fff
        .price
          display: inline-block
          line-height: .48rem
          margin-top: .24rem
          font-size: .32rem
          color: rgba(255,255,255,.4)
          font-weight: 700
          padding-right: .24rem
          &.heightlight
            color: #fff
          &.border-right
            &::before
              border-color: rgba(255, 255, 255, 0.2)
        .desc
          display: inline-block
          font-size: .24rem
          line-height: .48rem
          margin: .24rem 0 0 .24rem
          color: rgba(255,255,255,.4)
      .content-right
        flex: 0 0 2.1rem
        width: 2.1rem;
        text-align: center;
        background: #2b343c
        color: rgba(255, 255, 255, 0.5);
        font-size: .32rem
        font-weight: 700
        line-height: .48rem
        &.heightlight
          background: rgb(0, 160, 220);
          color: #fff
        .totalPrice
          margin-top: .24rem

</style>
