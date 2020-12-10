<template>
  <div class="home-container">
    <!--导航栏-->
    <van-nav-bar class="app-nav-bar">
      <van-button slot="title" class="search-btn" icon="search" round size="small" type="info">搜索</van-button>
    </van-nav-bar>
     <!--文章标签页-->
    <van-tabs v-model="active" class="channel-tabs">
      <van-tab class="tab-item" v-for="channel in channels" :key="channel.id" :title="channel.name">
        <!--文章列表页-->
        <article-list :channel="channel"></article-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList
  },
  data () {
    return {
      active: 0, // 控制被激活的标签，以0为索引值开始
      channels: []// 频道列表
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () { // 请求接口文章数据
      const { data } = await getUserChannels()
      this.channels = data.data.channels
    }
  }
}
</script>

<style scoped lang="less">
.home-container{
  /deep/ .van-nav-bar__title{
    max-width: none;
  }
  .search-btn{
    width: 277px;
    height: 32px;
    background: #81b8f0;
    border: none;
  }
  .van-icon{
    font-size: 16px;
  }
  .van-button__text{
    font-size: 14px;
  }
  .channel-tabs{
    /deep/ .van-tab{
      border-right: 1px solid rgb(245, 242, 242);
       border-bottom: 1px solid rgb(245, 242, 242);
    }
    /deep/ .va-tabs__line{
      bottom: 20px;
      width: 15px !important;
      height: 3px;
      background: #3692fa;
    }
  }
}
</style>
