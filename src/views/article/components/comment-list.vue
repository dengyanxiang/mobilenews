<template>
<div class="comment-list">
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
        <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>
</div>
</template>

<script>
import { getComments } from '@/api/comment'
export default {
  name: 'CommentList',
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  methods: {
    async onLoad () {
      // 1.请求获取数据
      const { data } = await getComments({
        type: 'a', // 评论类型 a->文章（article）评论； c-> 评论（comment）的回复
        source: this.source, // 源ID，文章的ID 或 评论的ID
        offset: this.offset,
        limit: this.limit
      })
      console.log(data)
      // 2.把获取到的数据添加到列表
      // 3.把本次的loading状态关闭
      /** 4.判断是否还有数据，
      如果还有，则继续获取下一页的页码，
      如果没有，则将finish设置为true，不再触发加载更多
      */
    }
    // onLoad(){
    //   // 异步更新数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1)
    //     }
    //     // 加载状态结束
    //     this.loading = false
    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true
    //     }
    //   }, 1000)
    // }
  }
}
</script>

<style scoped>

</style>
