<template>
<div class="search-container">
  <!--搜索栏-->
  <!--Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。-->
  <form action="/">
    <van-search v-model="searchText"
    placeholder="请输入搜索关键词"
      show-action
      @search="onSearch(searchText)"
      @cancel="$router.back()"
      @focus="isResultShow=false"
     />
  </form>
   <!--搜索结果-->
  <search-result
  :search-text="searchText"
   v-if="isResultShow"/>
  <!--联想想象-->
  <search-suggestion
  :search-text="searchText"
   v-else-if="searchText"
   @search="onSearch"
   />
  <!--历史记录,-->
  <search-history v-else
  :search-histories="searchHistorise"
  @search="onSearch"
  @updata-histories="searchHistorise = $event"
  />
</div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion'
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storeage'
import { getSearchHistories } from '@/api/search'
import { mapState } from 'vuex'
export default {
  name: 'SearchIndex',
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult
  },
  data () {
    return {
      searchText: '', // 搜索输入框内容
      isResultShow: false, // 控制搜索结果显示的状态
      searchHistorise: [] // 用于存放搜索历史记录
    }
  },
  computed: {
    ...mapState('[user]')
  },
  methods: {
    onSearch (searchText) {
      // 按回车时执行
      // 你输入框设置为要搜索的结果
      this.searchText = searchText
      const index = this.searchHistorise.indexOf(searchText)
      if (index !== -1) {
        // 把重复项删除
        this.searchHistorise.splice(index, 1) // 从当前索引开始删除一个
      }
      // 把最新的数据放置到历史记录的最顶部
      this.searchHistorise.unshift(searchText)
      // 如果用户已登录，则把历史记录放到线上
      // 如果未登录，则存储到本地
      setItem('search-histories', this.searchHistorise)
      this.isResultShow = true
    },
    async loadSearchHistories () {
      // 把后端接口返回的数据与本地的数据进行汇总
      let searchHistories = getItem('search-histories') || [] // 获取本地历史记录
      // 如果已登录
      if (this.user) {
        const { data } = await getSearchHistories()
        // 合并数组: [... 数组，...数组]
        // 把 Set 转为数组: [...new Set([])]
        // 数组重组：[...new Set([... 数组，...数组])]
        // ES6数组重组可以使用 newSet() 方法
        searchHistories = [...new Set([...searchHistories, ...data.data.keywords])]
      }
      console.log(searchHistories)
      this.searchHistorise = searchHistories
    }
  },
  created () {
    this.loadSearchHistories()
  }
}
</script>

<style scoped>

</style>
