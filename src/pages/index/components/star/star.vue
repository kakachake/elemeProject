<template lang="html">
  <div class="star" :class="startype">
    <span v-for="(itemClass,index) in itemClasses"
    :class="itemClass"
    class="star-item"
    :key="index"
    >
    </span>
  </div>
</template>

<script>
  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'

export default {
  name:"star",
  props: {
    size: Number,
    score: Number
  },
  computed: {
    startype() {
      return 'star-'+this.size
    },
    itemClasses() {
      let result = []
      let score = Math.floor(this.score * 2) / 2
      let hasDecimal = score % 1!==0;
      let integer = Math.floor(score)
      for ( let i = 0; i < integer; i++){
        result.push(CLS_ON);
      }
      if(hasDecimal){
        result.push(CLS_HALF)
      }
      while(result.length < LENGTH){
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>

<style lang="stylus" scoped>
 @import "~@/common/stylus/mixin.styl"
  .star
    font-size: 0
    display: flex
    margin: 0 auto;
    justify-content: space-between
    .star-item
      background-repeat: no-repeat
    &.star-48
      width: 3.72rem
      .star-item
        width: .4rem
        height: .4rem
        background-size: 100% 100%
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    &.star-36
      width: 2rem
      .star-item
        width: .3rem
        height: .3rem
        background-size: 100% 100%
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-24
      width: 1.28rem
      .star-item
        width: .2rem
        height: .2rem
        background-size: 100% 100%
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')


</style>
