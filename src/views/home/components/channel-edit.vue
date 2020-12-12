<template>
<div class="channel-edit">
   <van-cell center :border="false">
     <div class="channel-title" slot="title">我的频道</div>
     <van-button type="danger"
      plain round
      size="mini"
      @click="isEdit=!isEdit"
      >{{ isEdit ? '完成' : '编辑' }}</van-button>
   </van-cell>
   <van-grid :gutter="10">
     <van-grid-item class="grid-item"
      :icon="isEdit && index !== 0 ? 'clear' : ''"
      v-for="(channel,index) in userChannels"
      :key="index" :text="channel.name"
      @click="onUserChannelClick(index)"
       />
   </van-grid>
   <van-cell center :border="false">
     <div class="channel-title" slot="title">频道推荐</div>
   </van-cell>
   <van-grid :gutter="10">
     <van-grid-item class="grid-item"
      v-for="(channel,index) in recommondChannels"
      :key="index"
      :text="channel.name"
      @click="onAdd(channel)"
       />
   </van-grid>
</div>
</template>

<script>
import { getAllCahnnels } from '@/api/channel'
export default {
  name: 'channel-edit',
  props: {
    userChannels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      allChannels: [], // 所有频道的数据
      isEdit: false
    }
  },
  computed: {
    // 推荐频道列表
    recommondChannels () {
      // 思路： 所有频道-我的频道=推荐频道  filter筛选器
      return this.allChannels.filter(channel => {
        // 判断channel是否属于用户频道
        return !this.userChannels.find(userChannels => {
          // 判断是否ID=我的频道的ID
          return userChannels.id === channel.id
        })
      })
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    // 接收接口数据
    async loadAllChannels () {
      const { data } = await getAllCahnnels()
      this.allChannels = data.data.channels
    },
    onAdd (channel) {
      this.userChannels.push(channel)
      // 数据持久化
    },
    onUserChannelClick (index) {
      if (this.isEdit && index !== 0) {
        // 编辑状态：删除频道
        this.deleteChannel(index)
      } else {
        // 非编辑状态：进入频道，切换频道
        this.switcChannel(index)
      }
    },
    deleteChannel (index) {
      this.userChannels.splice(index, 1)
      // 数据持久化
    },
    switcChannel (index) {
      console.log('switchChanel')
    }
  }
}
</script>
<style scoped lang="less">
.channel-edit{
    padding-top: 54px;
    .channel-title{
        font-size: 16px;
        color: #333;
    }
    .grid-item{
        width: 80px;
        height: 43px;
       /deep/ .van-grid-item__content{
           background: #f4f5f6;
           .van-grid-item__text{
               font-size: 14px;
               color: #222;
               margin-top: 0;
           }
        }
      /deep/ .van-grid-item__icon{
        position: absolute;
        top: -5px;
        right: -5px;
        color: #ccc;
        font-size: 20px;
      }
    }
}
</style>
