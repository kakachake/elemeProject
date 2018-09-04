<template lang="html">
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo">
            <i class="icon-shopping_cart"></i>
          </div>
        </div>
        <div class="price">

        </div>
        <div class="desc">

        </div>
      </div>
      <div class="content-right">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"shopcart"
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
          .logo
            width: 100%
            height: 100%
            text-align: center
            border-radius: 50%
            background: #2b343c
            .icon-shopping_cart
              line-height: .88rem
              font-size: .48rem
              color: rgb(255,255,255,.5)
        .price
          display: inline-block
        .desc
          display: inline-block
      .content-right
        flex: 0 0 105px
        width: 105px;
</style>
