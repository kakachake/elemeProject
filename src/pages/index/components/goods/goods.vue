<template lang="html">
  <div class="">
    <div class="goods">
      <div ref = "wrapperMenu" class="menuWrapper">
        <div >
          <ul>
            <li v-for="(item,index) in seller.goods" :class="{'current':isIndex(index)}" @click="selectMenu(index)" class="menu-item border-bottom">
              <span class="text">
                <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div ref = "wrapperFoods" class="foodsWrapper" >
        <div>
        <ul>
          <li class="foot-list food-list-hook" v-for = "item in seller.goods">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for= "food in item.foods" class="food-item border-bottom">
                <div class="icon">
                  <img :src="food.icon" alt="">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc" v-show="food.description">{{food.description}}</p>
                  <div class="extra">
                    <span>月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartControl-wrapper">
                    <cartControl v-on:cart-add="cartAdd"  :food="food"></cartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      </div>
    </div>
  <shopCart ref="shopCart" :select-foods="selectFoods" :seller="seller.seller"></shopCart>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import shopCart from '../shopcart/shopcart'
import cartControl from '../cartControl/cartControl'
import axios from 'axios'
export default {
  name:"goods",
  components:{
    shopCart,
    cartControl
  },
  data () {
    return{
      seller:{},
      listHeight: [],
      scrollY: 0
    }
  },
  computed: {
    Index(){
      for(let i = 0; i < this.listHeight.length; i++){
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i+1];
        if( !height2 || this.scrollY >= height1&&this.scrollY < height2){
           return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      this.seller.goods.forEach((good) => {
        good.foods.forEach((food)=>{
          if(food.count) {
            foods.push(food);
          }
        })
      })
      return foods
    }
  },
  watch: {
    //这个坑踩了好多次了，必须等到seller数据传输完成之后才能获取dom元素，否则获取不到
    seller() {
      this.$nextTick(()=>{
        this._calculateHeight()
        this.createdScroll()
      })
    },
    scrollY(){
      this.isIndex()
    }
  },
  methods: {
    selectMenu(index){
      let foodList = this.$refs.wrapperFoods.getElementsByClassName('food-list-hook')
      let el = foodList[index];
      this.menuscroll.scrollToElement(el, 300);
    },
    isIndex(index) {
      return this.Index===index
    },
    getIndexInfo () {
      axios.get('/api/seller.json')
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (msg) {
      if(msg.data.error === 0){
        this.seller = msg.data
      }
    },
    _calculateHeight () {
      let foodList = this.$refs.wrapperFoods.getElementsByClassName('food-list-hook')
      let height = 0;
      this.listHeight.push(height)
      console.log(foodList);
      for(let i = 0; i < foodList.length; i++){
        let item = foodList[i];
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    createdScroll() {
      this.menuscroll = new Bscroll(this.$refs.wrapperFoods, {click: true,  probeType: 3})
      this.foodsscroll = new Bscroll(this.$refs.wrapperMenu, {click: true})
      //检测scroll的滚动高度
      this.menuscroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      })
    },
    cartAdd(el) {
  //dom元素更新后执行， 因此此处能正确打印更改的值
      this.$nextTick(()=>{
        this.$refs['shopCart'].drop(el);
      })
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
    .menuWrapper
      flex: 0 0 1.6rem
      width: 1.6rem
      min-height: 100%
      background: #f3f5f7
      .menu-item
        display: table
        height: 1.08rem
        width: 1.12rem
        line-height: .28rem
        margin: 0 auto;
        &.current
          position: relative
          margin-top: -1px
          background: #fff
          font-weight: 700
          width: 100%
      .border-bottom
        border-bottom:1px solid rgba(7, 17, 27,  0.1)
        .text
          display: table-cell
          vertical-align: middle
          text-align: center
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
    .foodsWrapper
      flex: 1
      width: 100%
      .title
        padding-left: .28rem
        height: .52rem
        line-height: .52rem
        border-left: .04rem solid #d9dde1
        font-size: .24rem
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        padding: .36rem
        &.last-child
          padding-bottom: 0
        .icon
          flex:0 0 1.14rem
          img
            width: 1.14rem
            height: 1.14rem
            margin-right: .2rem
        .content
          flex: 1
          .name
            margin: .04rem 0 .16rem 0
            height: .28rem
            line-height: .28rem
            font-size: .28rem
            color: rgb(7, 17, 27);
          .desc, .extra
            line-height: .2rem
            font-size: .2rem
            color: rgb(147, 153, 159)
          .desc
            margin-bottom: .16rem
            line-height: .24rem
          .price
            font-weight: 700
            line-height: .48rem
            .now
              font-size: .28rem
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              color: rgb(147, 153, 159)
              font-size: .2rem
          .cartControl-wrapper
            position: absolute
            right: .06rem
            bottom: .24rem
</style>
