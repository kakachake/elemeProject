<template lang="html">
  <div class="">
    <div class="shopcart">
      <div class="content">
        <div class="content-left">
          <div class="logo-wrapper" @click="handleLogoClick">
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
        <div class="content-right" @click="pay" :class="{'heightlight':totalPrice>=seller.minPrice}">
          <div class="totalPrice">{{payDesc}}</div>
        </div>
      </div>
      <div class="ball-container">
        <div v-for="ball in balls">
          <transition
          name="drop"
          v-on:beforeEnter="beforeEnter"
          v-on:enter="enter"
          v-on:afterEnter="afterEnter"
          >
            <div class="ball" v-show = "ball.show">
              <div class="inner inner-hook">
              </div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="fold">
        <!-- <div class="list"> -->
          <div class="shopCart-list" v-show="listShow&&totalCount>0">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click = "handleDelClick">清空</span>
          </div>
            <div class="list-content" ref = "wrapper">
              <ul>
                <li class="food border-bottom" v-for="food in selectFoods">
                  <span class="name">{{food.name}}</span>
                  <div class="price">
                    <span>￥{{food.price*food.count}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartControl v-on:cart-add="cartAdd"  :food="food"></cartControl>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        <!-- </div> -->

      </transition>
    </div>
    <transition name = "fade">
      <div class="list-mask" @click="handleLogoClick"  v-show="listShow&&totalCount>0">

      </div>
    </transition>
  </div>

</template>

<script>
import Bscroll from 'better-scroll'
import cartControl from '../cartControl/cartControl'
export default {
  name:"shopcart",
  components:{
    cartControl
  },
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
  data() {
    return {
      balls: [{
        show:false
      },{
        show:false
      },{
        show:false
      },{
        show:false
      },{
        show:false
      }],
      dropBalls:[],
      listShow: false
    }
  },
  watch:{
    listShow (){
      this.$nextTick(()=>{
        this.createdScroll()
      })
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
    },
    methods: {
      drop(el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) { //将false的小球放到dropBalls
            ball.show = true;
            ball.el = el; //设置小球的el属性为一个dom对象
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      createdScroll(){
        this.scroll = new Bscroll(this.$refs.wrapper, {click: true,  probeType: 3})
      },
      beforeEnter(el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if(ball.show) {
            let rect = ball.el.getBoundingClientRect();
            //没看懂
            let x = rect.left - 24;
            let y = -(window.innerHeight - rect.top - 36);
            el.style.display='';
            el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
            el.style.transform = `translate3d(0, ${y}px, 0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
            inner.style.transform = `translate3d(${x}px, 0, 0)`;
            inner.style.opacity = 1;
          }
        }
      },
      enter(el) {
        //触发浏览器重绘
         let rf = el.offsetHeight;
         this.$nextTick(() => {
           el.style.webkitTransform = 'translate3d(0, 0, 0)';
           el.style.transform = 'translate3d(0, 0, 0)';
           let inner = el.getElementsByClassName('inner-hook')[0];
           inner.style.webkitTransform = 'translate3d(0, 0, 0)';
           inner.style.transform = 'translate3d(0, 0, 0)';
           inner.style.opacity = 0.3;
         })
      },
      afterEnter(el) {
        let ball = this.dropBalls.shift();
        if(ball){
          ball.show = false
          el.style.display = 'none';
        }
      },
      cartAdd(el) {
    //dom元素更新后执行， 因此此处能正确打印更改的值
        this.$nextTick(()=>{
          this.drop(el);
        })
      },
      handleLogoClick() {
        if(this.totalCount){
          this.listShow = !this.listShow
        }
        if(!this.scroll){
          this.$nextTick(()=>{
            this.createdScroll()
          })
        }else {
          this.$nextTick(()=>{
            this.scroll.refresh();
          })
        }
      },
      handleDelClick() {
        console.log(12);
        this.selectFoods.forEach((food)=>{
          food.count = 0
        })
        this.listShow = false
      },
      pay() {
        if(this.totalPrice < this.seller.minPrice){

        }
        window.alert(`支付${this.totalPrice}元`)
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
    .ball-container
      .ball
        position: fixed
        left: .64rem
        bottom: .44rem
        z-index: 200
        transition: all .4s cubic-bezier(.37,-0.18,.48,.2)
        .inner
          width: .32rem
          height: .32rem
          border-radius: 50%
          background: rgb(0, 160, 220);
          transition: all .4s
    // .list
    //   position: relative
    //   top: 0
    //   bottom: 0
    //   right: 0
    //   left: 0
    //   background: #777
    .shopCart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transition: all .5s
      transform: translate3d(0, -100%, 0);
      &.fold-enter, &.fold-leave-to
        transform: translate3d(0, 0 , 0);
      .list-header
        height: .8rem
        line-height: .8rem
        padding: 0 .36rem
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        transition: all .5s
        .title
          float: left
          font-size: .28rem
          color: rgb(7, 17, 27);
        .empty
          float: right
          font-size: .24rem
          color: rgb(0, 160, 220);
      .list-content
        overflow: hidden
        padding: 0 .36rem
        max-height: 4.34rem
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          .name
            line-height: .48rem
            font-size: .28rem
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 1.8rem
            bottom: .24rem
            line-height: .48rem
            font-size: .28rem
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: .12rem
  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    transition: all .5s
    opacity: 1
    background: rgba(7, 17, 27, 0.6);
    &.fade-enter,&.fade-leave-to
      opacity: 0
      background: rgba(7, 17, 27, 0);
</style>
