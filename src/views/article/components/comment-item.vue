<template>
<van-cell class="comment-item">
    <van-image
    class="image"
    slot="icon"
    fit="cover"
    round
    :src="comment.aut_photo" />
    <div slot="title">
        <div class="line">
            <div class="title">{{comment.aut_name}}</div>
            <div class="good" @click="onCommentLike">
                <van-icon
                :color = "comment.is_liking?'red':'#333'"
                :name = "comment.is_liking?'good-job':'good-job-o'"
                 />
                <span>{{comment.like_count}}</span>
            </div>
        </div>
        <div class="descrble">{{comment.content}}</div>
        <div class="time-wrap">
            <span class="time">{{comment.pubdate | dataTime}}</span>
            <van-button class="btn" round size="mini">{{comment.reply_count}}条回复</van-button>
        </div>
    </div>
    <!-- <van-image
    class="image"
    slot="icon"
    fit="cover"
    round
    src="https://img.yzcdn.cn/vant/cat.jpeg" />
    <div slot="title">
        <div class="line">
            <div class="title">你好啊</div>
            <div class="good">
                <van-icon name="good-job-o" />
                <span>112</span>
            </div>
        </div>
        <div class="descrble">啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</div>
        <div class="time-wrap">
            <span class="time">2020-12-13</span>
            <van-button class="btn" round size="mini">回复</van-button>
        </div>
    </div> -->
</van-cell>
</template>

<script>
import { addCommentLike, deleteCommentLike } from '@/api/comment'
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  methods: {
    async onCommentLike () {
      const commentId = this.comment.com_id.toString()
      if (this.comment.is_liking) {
        // 如果已点赞，则取消点赞
        await deleteCommentLike(commentId)
        this.comment.like_count--
      } else {
        // 如果没有点赞，则点赞
        await addCommentLike(commentId)
      }
      // 更新视图
      this.comment.is_liking = !this.comment.is_liking
      this.comment.like_count++
    }
  }
}
</script>

<style scoped lang="less">
.comment-item{
  .image{
      width: 36px;
      height: 36px;
      margin-right: 15px;
  }
  .line{
    display: flex;
    justify-content: space-between;
    .title{
      font-size: 13px;
      color:#406599;
    }
    .good{
        display: flex;
        align-items: center;
        justify-content: center;
    }
  }
  .descrble{
      font-size: 15px;
      color: #222222;
  }
  .time-wrap{
      display: flex;
    justify-content: space-between;
    .time{
      font-size: 10px;
    }
    .btn{
        background-color: rgb(108, 161, 182);
    }
  }
}
</style>
