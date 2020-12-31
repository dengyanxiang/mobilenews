<template>
<div class="post-comment">
    <van-field
    v-model="message"
    rows="2"
    autosize
    type="textarea"
    maxlength="50"
    placeholder="请输入评论"
    show-word-limit
    />
    <van-button @click="onPost" >发布</van-button>
</div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'PostComment',
  props: {
    target: {
      type: [String, Object, Number],
      required: true
    },
    articleId: {
      type: [String, Object, Number],
      default: null // 表明这个参数不是必须的
    }
  },
  data () {
    return {
      message: '' // 显示信息
    }
  },
  methods: {
    async  onPost () {
      const { data } = await addComment({
        target: this.target.toString(), // 对评论文章的ID
        comment: this.message, // 文章内容，即用户输入内容
        art_id: this.articleId === null ? null : this.articleId.toString() // 文章ID，对别人评论内容发表回复时，需要传输这个参数，对文章本身回复时，不需要传此参数
      })
      this.$emit('post-success', data.data.new_obj)
      this.$toast.success('发布成功')
      // 更新评论总数
      this.totalCommentCount++
      // 发布成功后清空输入框内容
      this.message = ''
    }
  }
}
</script>

<style scoped lang="less">
.post-comment{
    padding: 14px;
    display: flex;
    align-items: center;
}
</style>
