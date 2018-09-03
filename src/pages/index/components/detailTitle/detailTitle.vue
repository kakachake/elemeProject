<template lang="html">
  <div class="title">
    <div class="line"></div>
    <div class="text">
      {{title}}
    </div>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  name : "detailTitle",
  props: {
    title: String
  }
}
</script>

<style lang="stylus" scoped>
  //flex布局使用
  .title
    display: flex
    width: 80%
    margin: .6rem auto .48rem auto
    .line
      flex:1
      position: relative
      top: -6px
      border-bottom: 2px solid rgba(255, 255, 255, 0.2);
    .text
      padding: 0 .24rem
      font-size: .28rem
</style>
