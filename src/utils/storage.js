// 方便项目中使用本地存储的数据，封装一个函数，json里只能用双引号
export function getItem (key) {
  const res = window.localStorage.getItem(key)
  try {
    return JSON.parse(res)
  } catch (error) {
    return res
  }
}
export function setItem (key, value) {
  if (typeof value === 'object') { // 复合数据类型
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    window.localStorage.setItem(key, value)
  }
}
export function removeItem (key) {
  window.localStorage.removeItem(key)
}
export function clearItem () {
  window.localStorage.clearItem()
}
