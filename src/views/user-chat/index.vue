<template>
  <div class="user-chat">
    <!-- 导航栏 -->
    <van-nav-bar
      title="小智同学"
      class="app-nav-bar"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 消息列表 -->
    <van-cell-group class="message-list" ref="message-list">
      <van-cell
       v-for="(index, item) in messages"
       :key="index"
      :title="item.msg" />
    </van-cell-group>
    <!-- 底部信息 -->
    <van-cell-group class="send-message-wrap">
      <van-field v-model="message" placeholder="请输入信息" :border="false" />
      <van-button class="btn" size="small" type="info" @click="onSend">发送</van-button>
    </van-cell-group>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { getItem, setItem } from '@/utils/storeage'
// // 收发消息
// // 消息的发送  socket.emit('消息类型', 消息内容)
// // 消息的接收  socket.on('消息类型', function (data) {})
export default {
  name: 'UserChat',
  data () {
    return {
      message: '',
      socket: null, // websocket 通信对象
      messages: [] || getItem('chat-message') // 消息列表
    }
  },
  created () {
    // 建立连接
    const socket = io('http://ttapi.research.itcast.cn/')
    this.socket = socket
    socket.on('connect', () => {
      console.log('建立链接')
    })
    // socket.on('event', function(data){})
    socket.on('disconnect', () => {
      console.log('断开链接')
    })
    // 监听服务端发来的信息
    socket.on('message', data => {
    // 把地方回复的信息添加到列表中
      this.messages.push(data)
    })
  },
  watch: {
    messages () {
      setItem('chat-message', this.message) // 数据持久化操作
      // 由于数据的高度的变化不是立即的，所以需要使用 $nextTick 函数进行操作
      this.$nextTick(() => {
        this.scrollToBottom() // 监听数据列表高度的变化
      })
    }
  },
  mounted () {
    this.scrollToBottom()
  },
  methods: {
    onSend () {
      // 请求发送消息
      const data = {
        msg: this.message,
        timestamp: Date.now()
      }
      this.socket.emit('message', data)
      // 把用户发送的数据存储到列表中
      this.messages.push(data)
      // 信息发完就清空
      this.message = ''
    },
    scrollToBottom () {
      const list = this.$refs['message-list']
      list.scrollTop = list.scrollHeight // 让其滚动到最底部，最底部的高度=列表的高度
    }
  }
}
</script>

<style scoped lang="less">
.send-message-wrap {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  display: flex;
  padding: 0 10px;
  align-items: center;
}
.message-list{
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow-y: auto;
}
</style>
