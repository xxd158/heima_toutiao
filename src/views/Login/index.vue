<template>
  <div>
    <van-nav-bar title="登录" @click-left='$router.back()'>
      <van-icon name="cross" slot="left" />
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model.trim="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请填写手机号' },
          { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '不符合手机格式' },
        ]"
      >
        <!-- <i class="toutiao toutiao-shouji" slot="left-icon"></i> -->
        <MyIcon name="shouji" slot="left-icon"></MyIcon>
      </van-field>
      <van-field
        v-model.trim="code"
        type="password"
        name="code"
        placeholder="请输入验证码"
        :rules="[
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码必须是6位数' },
        ]"
      >
        <!-- <i class="toutiao toutiao-yanzhengma" slot="left-icon"></i> -->
        <MyIcon name="yanzhengma" slot="left-icon"></MyIcon>
        <template #button>
          <van-count-down
            v-if="countDownIsShow"
            :time="time"
            format="ss s"
            @finish="countDownIsShow = false"
          />
          <van-button
            @click="onSendSms"
            v-else
            size="small"
            class="yzm"
            native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block native-type="submit" class="login-btn"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { GetSmsCode, login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      mobile: '15822493700', // 手机号
      code: '246810', // 短信验证码
      time: 10 * 1000,
      countDownIsShow: false
    }
  },
  methods: {
    async onSubmit (values) {
      // console.log('submit', values)
      try {
        const res = await login(values)
        // console.log(res)
        console.log('成功')
        this.$store.commit('setUser', res.data.data)
        this.$router.push({ name: 'my' })
      } catch (error) {
        // console.log(error)
        console.log('失败')
      }
    },
    async onSendSms () {
      try {
        // eslint-disable-next-line no-unused-vars
        const res = await this.$refs.form.validate('mobile')
        // console.log('校验通过')
        this.countDownIsShow = true
        try {
          await GetSmsCode(this.mobile)
          this.$toast('发送成功')
        } catch (error) {
          this.$toast('发送失败')
        }
      } catch (error) {
        // console.log(error)
        console.log('输入错误')
        this.$toast('输入错误')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang=less>
.yzm {
  width: 152px;
  height: 46px;
  background-color: #ededed;
  border-radius: 23px;
  font-size: 22px;
  color: #666666;
}
.van-button__text {
  zoom: 0.95;
}
.login-btn {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
  font-size: 30px;
  color: #ffffff;
}
.yzm {
  position: fixed;
  right: 10px;
}
.van-count-down {
  position: fixed;
  right: 20px;
}
</style>
