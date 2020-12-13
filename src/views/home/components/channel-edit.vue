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
   <!-- :class="{ active: index === active }" 用于动态激活索引频道的高亮-->
   <van-grid :gutter="10">
     <van-grid-item class="grid-item"
      :class="{ active: index === active }"
      :icon="isEdit && index !== 0 ? 'clear' : ''"
      v-for="(channel,index) in userChannels"
      :key="index" :text="channel.name"
      @click="onUserChannelClick(channel,index)"
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
import { getAllCahnnels, addUserCahnnels, deleteUserCahnnels } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storeage'
export default {
  name: 'channel-edit',
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    // 用于接收active的索引值
    active: {
      type: Number,
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
    ...mapState(['user']), // 将用户映射到本地
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
    async onAdd (channel) { // 添加频道状态
      this.userChannels.push(channel)
      // TODO: 数据持久化
      // 如果用户登录了，数据存储到线上的后台服务器，如果未登录，数据则存储到本地
      if (this.user) {
        // 如果用户登录了，数据存储到线上的后台服务器
        await addUserCahnnels({
          channels: [
            {
              id: channel.id,
              seq: this.channels.length // 序号
            }
          ]
        })
      } else {
        // 如果未登录，数据则存储到本地
        setItem('user-channel', this.userChannels)
      }
    },
    onUserChannelClick (channel, index) {
      if (this.isEdit && index !== 0) {
        // 编辑状态：删除频道
        this.deleteChannel(channel, index)
      } else {
        // 非编辑状态：进入频道，切换频道
        this.switcChannel(index)
      }
    },
    async deleteChannel (channel, index) { // 添加频道状态
      // 如果删除的是当前激活频道之前的频道
      if (index <= this.active) {
        // 更新激活的索引为原来的索引减一
        this.$emit('updata-active', this.active - 1)
      }
      // 删除频道
      this.userChannels.splice(index, 1)
      // 数据持久化
      if (this.user) {
        // 如果用户登录了，数据存储到线上的后台服务器
        await deleteUserCahnnels(channel.id)
      } else {
        // 如果未登录，数据则存储到本地
        setItem('user-channel', this.userChannels)
      }
    },
    switcChannel (index) {
      // 切换频道
      console.log('switchChanel')
      // 切换频道
      this.$emit('updata-active', index)
      // 关闭弹出层
      this.$emit('close')
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
    .active{
      /deep/ .van-grid-item__text{
          color: red !important;
      }
    }
}
</style>
