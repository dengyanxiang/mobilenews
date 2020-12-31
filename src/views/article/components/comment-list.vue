<template>
<div class="comment-list">
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
        <comment-item v-for="(comment, index) in list" :key="index" :comment="comment" />
        <!-- <van-cell v-for="(comment, index) in list" :key="index" :title="comment.title" /> -->
        </van-list>
</div>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item'
export default {
  name: 'CommentList',
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      // 数组或者对象的默认值必须使用函数进行返回，不能直接default=[]
      default: function () {
        return []
      }
    }
  },
  components: {
    CommentItem
  },
  data () {
    return {
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
        offset: this.offset, // 获取下一页数据的页码
        limit: this.limit
      })
      // 2.把获取到的数据添加到列表
      const { results } = data.data
      this.list.push(...results)
      // 3.把本次的loading状态关闭
      this.loading = false
      // 4.判断是否还有数据，
      if (results.length) {
        // 如果还有，则继续获取下一页的页码，
        this.offset = data.data.last_id
      } else {
      // 如果没有，则将finish设置为true，不再触发加载更多
        this.finished = true
      }
    }
  }
}
</script>

<style scoped>

</style>
