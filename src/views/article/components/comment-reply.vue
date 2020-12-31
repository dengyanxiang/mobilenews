<template>
<div class="comment-reply">
    <!-- 头部信息 -->
    <van-nav-bar :title="`${comment.reply_count}条回复`">
        <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>
    <!-- 当前回复项 -->
    <comment-item
    :comment="comment"
     />
</div>
</template>

<script>
import CommentItem from './comment-item'
export default {
  name: 'CommentReplay',
  components: {
    CommentItem
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
