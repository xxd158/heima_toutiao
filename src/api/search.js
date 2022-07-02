import request from '@/utils/request'
/**
 *
 * @param {发送列表请求} q
 * @returns
 */
export const getSuggestList = (q) => {
  return request({
    url: 'suggestion',
    params: {
      q
    }
  })
}
/**
 * 发送搜索结果请求
 */
// eslint-disable-next-line camelcase
export const getSearchResult = ({ page, per_page, q }) => {
  return request({
    url: '/search',
    params: { page, per_page, q }
  })
}
