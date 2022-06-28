<template>
  <div>
    <!-- 登录后的 -->
    <div class="header header-login" v-if="user && user.token">
      <div class="avatar">
        <div class="left">
          <van-image
            round
            width="1.76rem"
            height="1.76rem"
            :src="userInfo.photo"
          />
          <span>{{userInfo.name}}</span>
        </div>
        <div class="button">编辑资料</div>
      </div>
      <ul class="list">
        <li>
          <p>{{userInfo.art_count}}</p>
          <p>头条</p>
        </li>
        <li>
          <p>{{userInfo.follow_count}}</p>
          <p>关注</p>
        </li>
        <li>
          <p>{{userInfo.fans_count}}</p>
          <p>粉丝</p>
        </li>
        <li>
          <p>{{userInfo.like_count}}</p>
          <p>获赞</p>
        </li>
      </ul>
    </div>
    <!-- 未登录的 -->
    <div class="header header-notlogin" v-else>
      <div class="inner" @click="$router.push('/login')">
        <img src="@/assets/mobile.png" alt="" />
        <p>登录/注册</p>
      </div>
    </div>
    <!--  -->
    <van-grid :column-num="2">
      <van-grid-item icon="photo-o" text="收藏">
        <template #icon>
          <i class="toutiao toutiao-shoucang"></i>
        </template>
      </van-grid-item>
      <van-grid-item icon="photo-o" text="历史">
        <template #icon>
          <i class="toutiao toutiao-lishi"></i>
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 单元格 -->
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小志同学" is-link />
    </van-cell-group>
    <!-- 退出 -->
    <van-button block class="logout" v-if="user && user.token" @click="logout"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfor } from '@/api/user'
export default {
  name: 'My',
  async created () {
    if (this.user && this.user.token) { // ???
      try {
        const res = await getUserInfor()
        // console.log(res.data.data)
        this.userInfo = res.data.data
      } catch (error) {
        console.log(error)
      }
    }
  },
  data () {
    return {
      userInfo: ''
    }
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({
          message: '确定退出吗？'
        })
        this.$store.commit('setUser', {})
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.header {
  width: 750px;
  height: 401px;
  background: rgb(50, 150, 250, 0.7) url("@/assets/banner.png") no-repeat;
  background-size: cover;
}
.header-notlogin {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 132px;
    height: 132px;
    margin-bottom: 15px;
  }
  p {
    font-size: 28px;
    font-weight: 400;
    color: #fff;
  }
}
.header-login {
  padding-top: 116px;
  .avatar {
    margin-bottom: 55px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 32px;
    .button {
      text-align: center;
      line-height: 32px;
      width: 116px;
      height: 32px;
      background-color: #ffffff;
      border-radius: 16px;
      font-size: 20px;
      font-weight: normal;
      color: #666666;
    }
    .left {
      display: flex;
      align-items: center;
      span {
        margin-left: 22px;
        font-size: 30px;
        font-weight: normal;
        color: #ffffff;
      }
    }
  }
  .list {
    display: flex;
    li {
      flex: 1;
      text-align: center;
      p {
        color: #fff;
        &:nth-child(1) {
          font-size: 36px;
        }
        &:nth-child(2) {
          font-size: 23px;
        }
      }
    }
  }
}

.van-grid-item {
  .toutiao {
    font-size: 45px;
  }
  &:nth-child(1) {
    color: #eb5253;
  }
  &:nth-child(2) {
    color: #ff9d1d;
  }
}
/deep/ .van-grid-item__text {
  font-size: 28px;
}
.van-cell-group {
  margin: 9px 0;
}
.logout {
  color: #d86262;
}
</style>
