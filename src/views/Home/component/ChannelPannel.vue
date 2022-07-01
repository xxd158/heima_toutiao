<template>
  <div>
    <div class="channel-container">
      <div class="title">
        <h3>我的频道</h3>
        <van-button type="danger" round @click="isShow = !isShow">{{
          isShow ? "完成" : "编辑"
        }}</van-button>
      </div>
      <van-row>
        <van-col span="6" v-for="(item, index) in channels" :key="item.id">
          <div
            @click="onClick(index)"
            class="inner"
            :style="{ color: active === index ? 'red' : '' }"
          >
            {{ item.name }}
            <van-icon
              name="close"
              v-if="index !== 0"
              v-show="isShow"
              :style="{ color: active === index ? 'red' : '' }"
            />
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="channel-container">
      <div class="title">
        <h3>推荐频道</h3>
      </div>
      <van-row>
        <van-col span="6" v-for="item in recommendChannels" :key="item.id"
          ><div class="inner van-ellipsis" @click="add(item.id)">
            +{{ item.name }}
          </div></van-col
        >
      </van-row>
    </div>
  </div>
</template>

<script>
import { setItem } from '@/utils/storage'
// 用常量定义好维护
import { getAllArticleList, saveChannels } from '@/api/home'
const CHANNELS = 'channels'
export default {
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true

    }
  },
  async created () {
    try {
      const res = await getAllArticleList()
      console.log(res)
      this.recommendChannels = res.data.data.channels.filter(item => this.channels.every(item1 => item1.id !== item.id))
    } catch (error) {
      console.log(error)
    }
  },
  data () {
    return {
      recommendChannels: [],
      isShow: false
    }
  },
  methods: {
    add (id) {
      const index = this.recommendChannels.findIndex((item) => item.id === id)
      this.channels.push(this.recommendChannels[index])
      this.recommendChannels.splice(index, 1)
    },
    onClick (index) {
      if (this.isShow) {
        if (index === 0) return// 推荐不能删除，所以要排除掉
        // 删除，注意先存再删
        this.recommendChannels.push(this.channels[index])
        this.channels.splice(index, 1)
        if (index < this.active) {
          this.$emit('del-event', this.active - 1)
        }
      } else {
        this.$emit('change-active', index)
      }
    }
  },
  computed: {},
  watch: {
    channels: {
      async handler (newVal) {
        // 登陆过就发送ajax存储数据，未登录过就用本地存储
        // console.log(newval)
        if (this.$store.state.user && this.$store.state.user.token) { // 登录过
          const arr = []
          newVal.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          })
          console.log(arr)
          try {
            const res = await saveChannels(arr)
            console.log(res)
          } catch (error) {
            console.log(error)
          }
        } else { // 没有登录过
          setItem(CHANNELS, newVal)
        }
      },
      deep: true
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.title {
  margin-bottom: 16px;
  padding-left: 24px;
  padding-right: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    font-size: 32px;
    font-weight: 400;
    color: #333;
  }
  .van-button {
    width: 120px;
    height: 48px;
    border-radius: 20px;
    // text-align: center;
  }
}
.inner {
  width: 160px;
  height: 86px;
  background: #f4f5f6;
  border-radius: 6px;
  font-size: 28px;
  font-weight: 400;
  color: #222222;
  text-align: center;
  line-height: 86px;
  position: relative;
  .van-icon-close {
    position: absolute;
    right: -12px;
    top: -12px;
  }
}
.van-row {
  margin-left: 20px;
}
.van-col {
  margin-bottom: 10px;
}
</style>
