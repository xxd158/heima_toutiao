<template>
  <div>
    <form action="/">
      <van-search
        v-model="searchtext"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @cancel="$router.back()"
        @search="onSearch"
        @focus="isShow = false"
        autofocus
      />
    </form>
    <SearchHistory v-if="searchtext === ''"  @search="onSearch"></SearchHistory>
    <template v-else>
      <SearchResult v-if="isShow"  :searchtext="searchtext"></SearchResult>
      <SearchSuggest
        v-else
        :searchtext="searchtext"
        @search="onSearch"
      ></SearchSuggest>
    </template>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggest from './components/SearchSuggest.vue'
import SearchResult from './components/SearchResult.vue'
export default {

  created () { },
  data () {
    return {
      searchtext: '',
      isShow: false
    }
  },
  methods: {
    onSearch (str) {
      this.searchtext = str
      this.isShow = true
      this.$store.commit('setSearchHistoryList', str)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { SearchHistory, SearchSuggest, SearchResult }
}
</script>

<style scoped lang='less'>
</style>
