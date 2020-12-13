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
      <div slot="nav-right" style="flex-shrink:0; width:33px"></div>
      <div slot="nav-right"
       @click="isChannelEditShow=true"
       class="wap-nav-wrap"
       >
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup v-model="isChannelEditShow"
     position="bottom"
     class="channel-edit-popup"
     get-container="body"
     closeable
     close-icon-position="top-left"
     style="height:100%"
    >
    <!-- @close="isChannelEditShow=false"用于接收子组件的点击事件 -->
    <channel-edit :user-channels="channels"
    :active="active"
    @close="isChannelEditShow=false"
    @updata-active="onUpdataActive"
     />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storeage'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0, // 控制被激活的标签，以0为索引值开始
      channels: [], // 频道列表
      isChannelEditShow: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () { // 请求接口文章数据
      // const { data } = await getUserChannels()
      // this.channels = data.data.channels
      let channels = []
      if (this.user) {
        // 登录状态下，请求线上数据
        const { data } = await getUserChannels()
        channels = data.data.channels
      } else {
        // 未登录状态，判断本地是否存有数据
        const localChannels = getItem('user-channel')
        if (localChannels) { // 如果有本地存储，则使用本地数据
          channels = localChannels
        } else { // 如果没有本地存储，也没有登录，则请求默认的推荐的频道列表
          const { data } = await getUserChannels()
          channels = data.data.channels
        }
      }
      // 把处理好的数据放到data中，以供模板使用
      this.channels = channels
    },
    onUpdataActive (index) {
      // 激活指定索引的状态
      this.active = index
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
  .wap-nav-wrap{
    position: fixed;
    right: 0;
    width: 33px;
    height: 44px;
    line-height: 43px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, .8);
    .van-icon{
      font-size: 24px;
    }
  }
}
</style>
