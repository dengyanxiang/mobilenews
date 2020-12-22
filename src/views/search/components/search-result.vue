<template>
<div class="search-result">
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
    <van-cell v-for="(article,index) in list" :key="index" :title="article.title" />
</van-list>
</div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 10
    }
  },
  methods: {
    async onLoad  () {
      const { data } = await getSearchResult({
        page: this.page, // 页码
        per_page: this.per_page, // 每页大小
        q: this.searchText // 搜索的字符
      })
      // 2.将数据放置到数据列表中
      const { results } = data.data
      this.list.push(...results)
      // 3.关闭本次loading
      this.loading = false
      // 4.判断是否还有数据，如果还有，则更新设置下一页数据，如果没有数据，则将finish设置为true，关闭加载更多
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-result{
  position: fixed;
  left: 0;
  top: 54px;
  bottom: 0;
  right: 0;
  overflow-y: auto;
}
</style>
