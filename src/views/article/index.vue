<template>
 <div class="atricle-container">
     <van-nav-bar
     title="文章详情"
     class="app-nav-bar"
     left-arrow
     @click-left="$router.back()" />
    <h1 class="title">有哪些类似《天才枪手》里的作弊手段和故事？</h1>
    <van-cell center>
         <van-image
        class="img"
        slot="icon"
        round
        fit="cover"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <div slot="title" class="title">天涯小夏卡尔</div>
        <div class="time-lable" slot="label">14小时前发布</div>
        <van-button
        class="btn" round
        :type="isFocus==true?'info':'warning'"
        slot="right-icon"
        :icon="isFocus==true?'':'plus'"
        @click="onFocus"
        >{{this.isFocus==true?'取消关注':'关注'}}</van-button>
    </van-cell>
    <div class="content markdown-body">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima architecto similique quod obcaecati expedita fugiat sit tempore veniam nisi natus suscipit iure eos consequuntur perspiciatis commodi assumenda quas, dolor repudiandae quis hic? Nulla ex nam, id ad sequi excepturi magnam quia, nesciunt recusandae aliquam quidem, officia beatae! Temporibus officiis ut autem quo harum quidem, dolor voluptatibus similique quas incidunt, voluptates ab culpa illo illum. Ducimus excepturi corrupti aliquid, quam omnis itaque libero eos explicabo harum quod autem iusto officia odit voluptates provident culpa adipisci nobis earum distinctio rerum repudiandae. Deleniti omnis harum autem molestias impedit doloribus fuga neque quos adipisci! Voluptatem qui consequatur incidunt neque debitis placeat, voluptatum ratione impedit? Libero quas magni esse nostrum officia vitae maxime nesciunt quisquam ad aut hic nemo reprehenderit veniam modi nam eos quaerat, consectetur dolor quasi nihil impedit laudantium molestias, maiores commodi. Praesentium ab numquam sapiente rem porro corrupti animi accusamus exercitationem perferendis, a doloribus hic aperiam asperiores nisi illum amet ex voluptatum facere voluptatem, voluptates cupiditate, recusandae assumenda corporis eaque. Laudantium deserunt minus quia vel nobis, unde, molestiae dignissimos fuga ut iure sunt animi qui laborum reprehenderit architecto officiis velit! Quisquam, optio vitae delectus a dolore facere veritatis totam eveniet. Illum, impedit!</p>
    </div>
    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
      >写评论</van-button>
      <van-icon
        name="comment-o"
        badge="123"
        color="#777"
      />
      <van-icon
      :name="this.isColected==true?'star':'star-o'"
      :color="this.isColected==true?'red':'#777'"
      @click="onStar"
      />
      <van-icon
       :name="this.isLike==true?'good-job':'good-job-o'"
       :color="this.isLike==true?'red':'#777'"
       @click="onLike" />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
 </div>
</template>

<script>
import './markdown-css.css'
import { setItem } from '@/utils/storeage'
export default {
  name: 'ArticleIndex',
  data () {
    return {
      isFocus: false,
      isColected: false,
      isLike: false
    }
  },
  methods: {
    onFocus () {
      const isFocus = this.isFocus
      if (!this.isFocus) {
        this.isFocus = !this.isFocus
        this.$toast.success('关注成功')
      } else {
        this.isFocus = !isFocus
        this.$toast.success('已取消点赞')
      }
      setItem('isFocus', this.isFocus)
    },
    onStar () {
      const isColected = this.isColected
      if (!this.isColected) {
        this.isColected = !this.isColected
        this.$toast.success('收藏成功')
      } else {
        this.isColected = !isColected
        this.$toast.success('已取消收藏')
      }
      setItem('isColected', this.isColected)
    },
    onLike () {
      const isLike = this.isLike
      if (!this.isLike) {
        this.isLike = !this.isLike
        this.$toast.success('点赞成功')
      } else {
        this.isLike = !isLike
        this.$toast.success('已取消点赞')
      }
      setItem('isLike', this.isLike)
    }
  }
}
</script>

<style scoped lang="less">
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
