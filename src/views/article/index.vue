<template>
 <div class="atricle-container">
     <van-nav-bar
     title="文章详情"
     class="app-nav-bar"
     left-arrow
     @click-left="$router.back()" />
     <div class="wrap">
      <h1 class="title">{{article.title}}</h1>
      <!--有哪些类似《天才枪手》里的作弊手段和故事？-->
      <van-cell center>
         <!--https://img.yzcdn.cn/vant/cat.jpeg-->
          <van-image
          class="img"
          slot="icon"
          round
          fit="cover"
          :src="article.aut_photo"
          />
          <!--天涯小夏卡尔-->
          <div slot="title" class="title">{{article.aut_name}}</div>
          <!--14小时前发布-->
          <div class="time-lable" slot="label">{{article.pubdata | relativeTime}}</div>
          <van-button
          class="btn" round
          :type="article.is_followed ? 'default':'info'"
          slot="right-icon"
          :icon="article.is_followed ? '':'plus'"
          :loading="isFollowLoading"
          @click="onFollow"
          >{{article.is_followed ? '已关注':'关注'}}</van-button>
      </van-cell>
      <div class="content markdown-body" v-html="article.content" ref="article-content">
      </div>
      <!--评论区域-->
      <van-cell>评论列表</van-cell>
       <comment-list
        :list="commentList"
        :source="articleId" />
    </div>
    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
      >写评论</van-button>
      <van-icon
        name="comment-o"
        badge="123"
        color="#777"
      />
      <van-icon
      :name="article.is_collected ? 'star':'star-o'"
      :color="article.is_collected ? 'orange':'#777'"
      @click="onCollect"
      />
      <van-icon
       :name="article.attitude === 1 ? 'good-job':'good-job-o'"
       :color="article.attitude === 1 ?'pink':'#777'"
       @click="onLike"
      />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
    <!--发布评论-->
    <van-popup
      v-model="isPostShow"
      position="bottom"
     >
     <post-comment
      :target="articleId"
      :post-success="onPostSuccess"
       />
     </van-popup>
 </div>
</template>

<script>
import './markdown-css.css'
import { getArticleById, addCollect, deleteCollect, addLike, deleteLike } from '@/api/articles'
import { ImagePreview } from 'vant'
import { addFollow, deleteFollow } from '@/api/user'
import CommentList from './components/comment-list'
import PostComment from './components/post-comment'
export default {
  name: 'ArticleIndex',
  components: {
    CommentList,
    PostComment
  },
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      article: {}, // 文章数据对象
      isFollowLoading: false,
      isCollectLoading: false,
      isPostShow: false, // 控制评论区域弹出层的显示状态
      commentList: [] // 使评论列表的子组件用于接收列表数据
    }
  },
  created () {
    this.loadArticle()
  },
  methods: {
    async  loadArticle () {
      const { data } = await getArticleById(this.articleId)
      this.article = data.data
      // 得到所有的IMG元素
      // 数据影响视图更新不是立即的，所以
      // 如果需要在修改数据之后立即使用该数据，需要将其放入 $nextTick（）函数中，才能立即使用数据
      this.$nextTick(() => {
        this.handlePreviewImage()
      })
    },
    handlePreviewImage () {
      // 1.获取文章DOM 容器
      const articleContent = this.$refs['article-content']
      // 2.获取所有的IMG 元素
      const imgs = articleContent.querySelectorAll('img')
      // 用于存储图片的地址
      const imgPaths = []
      imgs.forEach((img, index) => {
        imgPaths.push(img.src)
        // // 3.循环IMG元素，对图片进行点击事件注册
        img.onclick = function () {
          // 4.在处理事件中调用 ImagePreview 函数
          ImagePreview({
            images: imgPaths, // 预览图片路径列表
            startPosition: index
          })
        }
      })
    },
    async onFollow () {
      this.isFollowLoading = true
      if (this.article.is_followed) {
        // 已关注，则取消关注
        await deleteFollow(this.article.aut_id)
      } else {
        // 未关注，则点击关注
        await addFollow(this.article.aut_id)
      }
      this.article.is_followed = !this.article.is_followed
      this.isFollowLoading = false
    },
    async onCollect () {
      // this.isCollectLoading = true
      if (this.article.is_collected) {
        // 已收藏，则取消收藏
        await deleteCollect(this.articleId)
        this.$toast.success('取消收藏')
      } else {
        // 未收藏，则点击收藏
        await addCollect(this.articleId)
        this.$toast.success('收藏成功')
      }
      this.article.is_collected = !this.article.is_collected
      this.isCollectLoading = false
    },
    async onLike () {
      if (this.article.attitude === 1) {
        // 已点赞，则取消点赞
        await deleteLike(this.articleId)
        this.article.attitude = -1
        this.$toast.success('取消点赞成功')
      } else {
        // 未点赞，则点击点赞
        await addLike(this.articleId)
        this.article.attitude = 1
        this.$toast.success('点赞成功')
      }
    },
    onPostSuccess (comment) { // 发布评论成功时调用的函数
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true
      })
      // 把发布成功的评论添加到评论列表顶部
      this.CommentList.unshift(comment)
      // 把评论弹出层关闭
      this.isPostShow = false
    }
    // onFocus () {
    //   const isFocus = this.isFocus
    //   if (!this.isFocus) {
    //     this.isFocus = !this.isFocus
    //     this.$toast.success('关注成功')
    //   } else {
    //     this.isFocus = !isFocus
    //     this.$toast.success('已取消点赞')
    //   }
    //   setItem('isFocus', this.isFocus)
    // },
    // onStar () {
    //   const isColected = this.isColected
    //   if (!this.isColected) {
    //     this.isColected = !this.isColected
    //     this.$toast.success('收藏成功')
    //   } else {
    //     this.isColected = !isColected
    //     this.$toast.success('已取消收藏')
    //   }
    //   setItem('isColected', this.isColected)
    // },
    // onLike () {
    //   const isLike = this.isLike
    //   if (!this.isLike) {
    //     this.isLike = !this.isLike
    //     this.$toast.success('点赞成功')
    //   } else {
    //     this.isLike = !isLike
    //     this.$toast.success('已取消点赞')
    //   }
    //   setItem('isLike', this.isLike)
    // }
  }
}
</script>
<style scoped lang="less">
.wrap{
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 44px;
  overflow-y: auto;
}
.title{
    font-size: 22px;
    color: rgb(14, 13, 13);
    padding: 15px;
    font-weight: bolder;
    margin: 0;
    background: white;
}
.img{
    width: 50px;
    height: 50px;
}
.time-lable{
    font-size: 14px;
    margin-left: 24px;
    margin-top: -10px;
}
.btn{
    width: 100px;
    height:29px;
}
.content{
    padding: 14px;
    background: #fff;
}
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
  .change{
      color: red;
  }
  .comment-btn {
    width: 141px;
    height: 23px;
    border: 1px solid #eeeeee;
    font-size: 15px;
    line-height: 23px;
    color: #a7a7a7;
  }
  .van-icon {
    font-size: 20px;
    .van-info {
      font-size: 11px;
      background-color: #e22829;
    }
  }
}
</style>
