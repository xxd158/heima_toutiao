<template>
  <van-cell-group>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      ref="pullrefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell
          :title="item.title"
          value="内容1"
          label="描述信息"
          v-for="(item, index) in articlelist"
          :key="index"
      /> -->
        <ArticleItem
          v-for="(item, index) in articlelist"
          :key="index"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </van-cell-group>
</template>

<script>
import ArticleItem from '@/components/ArticleItem.vue'
import { getArticleList } from '@/api/home'
let ele = null// 全局变量
let scrollTop = 0
export default {
  name: 'ArticleList',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getArticleList()
  },
  mounted () {
    // 组件最终渲染成html dom,$el就是渲染好的根标签
    // console.log(this.$refs.pullrefresh)
    ele = this.$refs.pullrefresh.$el
    this.$refs.pullrefresh.$el.addEventListener('scroll', function () {
      // console.log(this.scrolltop)
      scrollTop = this.scrollTop
    })
  },
  activated () {
    ele.scrollTop = scrollTop
  },
  data () {
    return {
      timestamp: Date.now(),
      articlelist: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    async getArticleList () {
      if (this.refreshing) {
        this.articlelist = []
        this.refreshing = false
      }
      try {
        const res1 = await getArticleList(
          { channel_id: this.id, timestamp: this.timestamp })
        // console.log(res1)
        this.timestamp = res1.data.data.pre_timestamp
        // 若数据已全部加载完毕，则直接将 finished 设置成 true 即可。
        if (this.timestamp === null) {
          this.finished = true
        }
        this.articlelist.push(...res1.data.data.results)
        // 数据更新完毕后，将 loading 设置成 false 即可。
        this.loading = false
        // console.log(this.articlelist)
      } catch (error) {
        console.log(error)
      }
    },
    onLoad () {
      this.getArticleList()
    },
    onRefresh () {
      // console.log('刷新了')
      this.finished = false
      this.loading = true
      this.timestamp = Date.now()
      this.getArticleList()
    }

  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleItem }
}
</script>

<style scoped lang='less'>
.van-cell-group {
  padding-top: 174px; //margin-top
}
</style>
