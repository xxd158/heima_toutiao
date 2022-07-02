<template>
  <div>
    <van-cell
      :title="item"
      icon="search"
      v-for="(item, index) in list"
      :key="index"
      @click="$emit('search',item)"
    >
      <template #title>
        <span v-html="highlight(item)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestList } from '@/api/search'
let timer = null
export default {
  name: 'SearchSuggest',
  props: {
    searchtext: {
      type: String,
      required: true
    }
  },
  created () { },
  data () {
    return {
      list: []
    }
  },
  methods: {
    highlight (str) {
      const reg = new RegExp(this.searchtext, 'g')// 正则写法
      return str.replace(reg, `<span style="color:red">${this.searchtext}</span>`)
    }
  },
  computed: {},
  watch: {
    searchtext: {
      handler (newVal) {
        clearTimeout(timer)
        // console.log(newVal)
        timer = setTimeout(async () => {
          // console.log(newVal)
          try {
            const res = await getSuggestList(newVal)
            // console.log(res)
            this.list = res.data.data.options
          } catch (error) {
            console.log(error)
          }
        }, 900)
      },
      immediate: true
    }
  },
  filters: {},
  components: {},
  beforeDestroy () {
    clearTimeout(timer)
  }
}
</script>

<style scoped lang='less'>
</style>
