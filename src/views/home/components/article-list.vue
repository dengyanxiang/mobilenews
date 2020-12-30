<template>
 <div class="article-list">
  <van-pull-refresh
   v-model="isRefreshLoading"
   :success-text="refreshSuccessText"
   :success-duration="1500"
   @refresh="onRefresh"
   >
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
       <article-item
         v-for="(article, index) in articles"
        :key="index"
        :article="article"
          />
    </van-list>
  </van-pull-refresh>
 </div>
</template>

<script>
import { Toast } from 'vant'
import { getArticles } from '@/api/articles'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: { // 定义频道
      typt: Object,
      Request: true
    }
  },
  data () {
    return {
      articles: [], // 数据列表，用来存储数据
      loading: false, // 用来控制加载中的loading状态
      finished: false, // 用来控制结束的状态，当加载中时，值为true；当结束加载时，值为false，不再加载更多
      timestamp: null, // 用于接收获取的时间戳
      isRefreshLoading: false,
      refreshSuccessText: '', // 刷新后的提示信息
      url: 'https://cn.vuejs.org/'
    }
  },
  methods: {
    async onLoad () {
      // // 1，请求获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id, // 频道的ID
        timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前时间戳，请求历史推荐传指定时间戳，
        // timestamp相当于页码，请求最新数据请求当前时间戳
        with_top: 1
        // 是否包含置顶，进入第一次请求时需要包含置顶文章，1表示包含，0表示不包含
      })
      // 2.将获取的数据放置list列表中
      const { results } = data.data
      this.articles.push(...results) // ...用于将数组重组到另外一个(es6新语法)
      // // 3.加载状态结束：设置本次加载结束，判断是否需要进行再次加载
      this.loading = false
      // // 4，数据全部加载结束
      if (results.length) { // 还有数据
        // 更新获取下一页的页码
        this.timestamp = data.data.pre_timestamp
      } else { // 没有数据
        // 把加载数据设置为结束，不再触发更多的加载
        this.finished = true
      }
    },
    async onRefresh () {
      // // 1，请求发送数据
      const { data } = await getArticles({
        channel_id: this.channel.id, //
        timestamp: Date.now(), // 时间戳为当前的时间，以便更好地获取新的数据
        with_top: 1
      })
      // // 2.把获取的数据追加到列表顶部，实现刷新  unshift:实现向顶部的插入
      const { results } = data.data
      this.articles.unshift(...results)
      // // 3.关闭刷新状态下的loading
      this.isRefreshLoading = false
      this.refreshSuccessText = `更新了 ${results.length}条数据`
    }
  }
}
</script>

<style scoped lang="less">
.article-list{
  position: fixed;
  top: 90px;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: scroll;
  // .list-item{
  //   background-color: rgb(235, 229, 229);
  // }
}
</style>
