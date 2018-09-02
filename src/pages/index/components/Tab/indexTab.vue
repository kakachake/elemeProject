<template lang="html">

    <div class="tab border-bottom">
          <router-link tag="div" to="/goods" class="tab-item">
            商品
          </router-link>
          <router-link tag="div" to="/ratings" class="tab-item">
            评论
          </router-link>
          <router-link tag="div" to="/seller" class="tab-item">
            商家
          </router-link>
    </div>

</template>

<script>
export default {
  name: 'indexTab'
}
</script>

<style lang="stylus" scoped>
  .border-bottom
    border-bottom:1px solid rgba(7, 17, 27,  0.1)
  .tab
    display: flex
    width: 100%
    height: .8rem
    line-height: .8rem
    .tab-item
      flex: 1
      text-align: center
      font-size: .28rem
      color: rgb(77, 85, 93)
    .router-link-active
      color: rgb(240, 20, 20);
</style>
