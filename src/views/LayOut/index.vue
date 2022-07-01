<template>
  <div>
    <keep-alive :include="['Home']">
      <router-view class="main" />
    </keep-alive>

    <van-tabbar route>
      <van-tabbar-item replace to="/home" icon="home-o">
        <template #icon>
          <i class="toutiao toutiao-shouye"></i>
        </template>
        首页</van-tabbar-item
      >
      <van-tabbar-item replace to="/video" icon="search">
        <template #icon> <i class="toutiao toutiao-shipin"></i> </template
        >视频</van-tabbar-item
      >
      <van-tabbar-item replace to="/question" icon="search">
        <template #icon> <i class="toutiao toutiao-wenda"></i> </template
        >问答</van-tabbar-item
      >
      <van-tabbar-item replace to="/my" icon="search">
        <template #icon> <i class="toutiao toutiao-wode"></i> </template
        >{{ status }}</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>

export default {

  created () { },
  data () {
    return {
      status: '我的'
    }
  },
  methods: {},
  computed: {

  },
  watch: {

  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.toutiao {
  font-size: 40px;
}
/deep/ .van-tabbar-item__text {
  font-size: 20px !important;
}
.main {
  padding-bottom: 100px;
}
</style>
