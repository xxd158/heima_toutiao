import Vue from 'vue'
import Vuex from 'vuex'
// vuex-persist插件 持久化存储
import VuexPersist from 'vuex-persist'
const vuexLocal = new VuexPersist({
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    searchHistoryList: []
  },
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setSearchHistoryList (state, payload) {
      let arr = state.searchHistoryList
      arr.unshift(payload)
      arr = [...new Set(arr)]
      state.searchHistoryList = arr
    },
    delHistory (state, payload) {
      state.searchHistoryList.splice(payload, 1)
    },
    delAllHistory (state) {
      state.searchHistoryList = []
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
