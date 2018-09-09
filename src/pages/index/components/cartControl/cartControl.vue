<template lang="html">
  <div class="cartControl">
    <transition name="move">
      <div
      class="cart-decrease"
      @click="decreaseCart"
      v-show="food.count>0"
      >
      <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count " v-show="food.count>0">
      {{food.count}}
    </div>
    <div class="cart-add icon-add_circle" @click="addCart">

    </div>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  name: "cartControl",
  props: {
    food: {
      type: Object
    }
  },
  created() {
    console.log(this.food);
  },
  methods: {
    addCart() {
      if(!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++;
      }
      //传递被点击元素
      this.$emit ('cart-add', event.target)
    },
    decreaseCart() {
      if(this.food.count){
        this.food.count--;
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
 @import "~@/common/stylus/icon.styl"
  .cartControl
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: .12rem
      transform: translate3d(0, 0, 0)
      &.move-enter-active,&.move-leave-active
        transition: all .4s ease-out
        .inner
          transform: rotate(0)
      &.move-enter, &.move-leave-to
        opacity: 0
        transform: translate3d(.48rem, 0, 0)
        .inner
          transform: rotate(180deg)
      .inner
        font-size: .48rem
        line-height: .48rem
        color: rgb(0, 160, 220)
        display: inline-block
        transition: all .4s
    .cart-count
      font-size: .2rem
      color: rgb(147, 153, 159)
      line-height: .48rem
      display: inline-block
      vertical-align:top
      padding-top: .12rem
      width: .24rem
      height: .48rem
      text-align: center;
    .cart-add
      display: inline-block;
      padding: .12rem
      font-size: .48rem
      line-height: .48rem
      color: rgb(0, 160, 220);
</style>
