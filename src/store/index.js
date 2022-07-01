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
    user: {}
  },
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
