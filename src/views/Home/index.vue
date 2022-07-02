<template>
  <div>
    <van-nav-bar fixed>
      <template #title
        ><van-button class="search-btn" icon="search" type="info" to='/search'
          >搜索</van-button
        ></template
      >
    </van-nav-bar>
    <van-tabs v-model="active" animated>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id"
        ><ArticleList :id="item.id"></ArticleList>
      </van-tab>

      <template #nav-right>
        <div class="menu" @click="isChannelShow = true">
          <MyIcon name="gengduo"></MyIcon>
        </div>
        <div class="menu1"></div>
      </template>
    </van-tabs>
    <van-popup
      v-model="isChannelShow"
      position="bottom"
      :style="{ height: '100%', paddingTop: '1rem' }"
      closeable
      close-icon-position="top-left"
      ><ChannelPannel
        :channels="channels"
        :active="active"
        @change-active="
          active = $event;
          isChannelShow = false;
        "
        @del-event="active = $event"
      ></ChannelPannel
    ></van-popup>
  </div>
</template>

<script>
import ChannelPannel from './component/ChannelPannel.vue'
import ArticleList from '@/components/ArticleList.vue'
import { getMyChannel } from '@/api/home'
import { getItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'
export default {
  name: 'Home',
  created () {
    this.getChannel()
  },
  data () {
    return {
      active: 0,
      channels: [],
      isChannelShow: false
    }
  },
  methods: {
    async getChannel () {
      const channels = getItem(CHANNELS)
      if (!(this.$store.state.user && this.$store.state.user.token) && channels) {
        this.channels = channels
      } else {
        try {
          const res1 = await getMyChannel()
          // console.log(res1.data.data.channels)
          this.channels = res1.data.data.channels
          // console.log(this.channels)
        } catch (error) {
          console.log(error)
        }
      }
    }
  },
  computed: {},

  filters: {},
  components: { ArticleList, ChannelPannel }
}
</script>

<style scoped lang='less'>
/deep/ .search-btn {
  width: 555px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 32px;
  // opacity: 0.8;
}
/deep/ .van-nav-bar__title {
  max-width: unset;
}
/deep/ .van-tabs__wrap--scrollable .van-tab {
  padding: 0 69px;
  border-right: 1px solid #edeff3;
}
.menu {
  min-width: 100px;
  height: 82px;
  background: hsl(255, 255, 255, 0.9);
  position: fixed;
  right: 0;
  text-align: center;
  line-height: 82px;
  font-size: 33px;
}
.menu1 {
  min-width: 100px;
  height: 82px;
  background: hsl(255, 255, 255, 0.9);
}
/deep/ .van-tabs__wrap {
  width: 750px; // 解决脱标问题
  position: fixed;
  top: 92px;
  z-index: 1; //提高层级
  border-bottom: 1px solid #edeff3;
}
/deep/ .van-pull-refresh {
  height: calc(100vh - 274px);
  overflow: auto;
}
</style>
