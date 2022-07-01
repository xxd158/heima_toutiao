import request from '@/utils/request'
/**
 *
 * @param {发送验证码} mobile
 * @returns
 */
export const GetSmsCode = (mobile) => {
  return request({
    url: `sms/codes/${mobile}`
  })
}
/**
 *
 * @param {*发送登录请求} param0
 * @returns
 */
export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile,
      code
    }
  })
}
/**
 *获取用户个人资料windows+v？？？
 */
export const getUserInfor = () => {
  return request({
    url: '/user'
    // headers验证的token放到了拦截器里
  })
}
