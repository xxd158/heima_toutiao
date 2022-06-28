import request from '@/utils/request'// ?????
import store from '@/store'
export const GetSmsCode = (mobile) => {
  return request({
    url: `sms/codes/${mobile}`
  })
}
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
 *获取用户个人资料windows+v
 */
export const getUserInfor = () => {
  return request({
    url: '/user',
    headers: {
      Authorization: 'Bearer ' + store.state.user.token

    }
  })
}
