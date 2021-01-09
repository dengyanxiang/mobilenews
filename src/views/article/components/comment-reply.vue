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
    <!-- 所有评论的回复 -->
    <van-cell title="所有回复" />
    <comment-list
    :source="comment.com_id"
    type="c"
    :list="commentList"
    />
     <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
      >写评论</van-button>
      <!-- 发布评论弹出层 -->
    <van-popup
      v-model="isPostShow"
      position="bottom"
     >
     <post-comment
     :target="comment.com_id"
     :article-id="articleId"
     @post-success="onPostSuccess"
      />
    </van-popup>
    </div>
</div>
</template>

<script>
import CommentItem from './comment-item'
import CommentList from './comment-list.vue'
import PostComment from './post-comment'
export default {
  name: 'CommentReplay',
  components: {
    CommentItem,
    CommentList,
    PostComment
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      isPostShow: false,
      commentList: [] // 评论的回复列表
    }
  },
  methods: {
    onPostSuccess (comment) {
      // 将发布的评论放到列表顶部
      this.commentList.unshift(comment)
      // 更新评论回复的数量
      this.comment.reply_count++
      // 关闭评论弹出层
      this.isPostShow = false
    }
  }
}
</script>

<style scoped lang="less">
.article-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  height: 44px;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  .comment-btn {
    width: 141px;
    height: 23px;
    border: 1px solid #eeeeee;
    font-size: 15px;
    line-height: 23px;
    color: #a7a7a7;
  }
}
</style>
