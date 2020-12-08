<template>
  <div class="mine-container">
    <van-cell-group v-if="user"  class="mine-info">
      <van-cell class="base-info" center :border="false" >
        <van-image
        class="avter"
         slot="icon"
         round
         fit="cover"
         :src="currentUser.photo" />
<!--下面的个人资料的信息都是currentUser中的json信息-->
        <div class="name" slot="title">昵称</div>
        <van-button class="update-btn" size="small" round >编辑资料</van-button>
      </van-cell>
      <van-grid class="data-info" :border="false">
        <van-grid-item  class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">123</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">123</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">123</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">123</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <div v-else class="on-login">
      <div @click="$router.push('/login')">
        <img class="mobile" src="./user.png" >
      </div>
      <div class="text">登录/注册</div>
    </div>
    <van-grid class="nav-grid mb-4" :column-num="2">
      <van-grid-item class="nav-grid-item" icon="star-o" text="收藏" />
      <van-grid-item class="nav-grid-item" icon="browsing-history-o" text="历史" />
    </van-grid>
    <van-cell title=消息通知 is-link url="/" />
    <van-cell class="mb-4" title="小智同学" is-link to="/" />
    <van-cell
      class="logout-cell"
      v-if="user"
      title="退出登录"
      @click="onLoginOut"
     />
  </div>
</template>

<script>
import { mapState } from 'vuex'// 获取数据
import { getCurrentUser } from '@/api/user'// 导入获取当前用户的封装好的方法
export default {
  name: 'MineIndex',
  data () {
    return {
      currentUser: {}// 当前用户的信息
    }
  },
  created () { // 不建议直接写逻辑在created中
    this.loadCurrentUser()// 执行methods方法中的加载当前用户模块
  },
  methods: {
    onLoginOut () {
      // 提示用户确认退出
      this.$dialog.confirm({
        title: '退出提示',
        message: '确定要退出吗？'
      })
        .then(() => { // 确定执行
          this.$store.commit('setUser', null)// 清除用户登录状态
        })
        .catch(() => { // 取消执行
          // on cancel
        })
      // 确认 -> 处理退出
    },
    async loadCurrentUser () {
      const { data } = await getCurrentUser()// 使用async方法获取getCurrentUser中的当前用户的信息
      this.currentUser = data.data
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped lang="less">
.mine-container{
 .mine-info{
   background: url("./banner.jpg") no-repeat;
   .base-info{
     box-sizing: border-box;
     height: 115px;
     background: unset;
     padding-top: 38px;
     padding-bottom: 11px;
     .avter{
       width: 66px;
       height: 66px;
       border:1px solid #fff;
       margin-right: 11px;
       box-sizing: border-box;
     }
     .name{
       font-size: 18px;
       color: #fff;
     }
     .update-btn{
       height: 16px;
       font-size: 11px;
       color:#666
     }
   }
  /deep/ .van-grid-item__content{
      background: unset;
   }
   background-size: cover;
 }
 .on-login{
   height: 180px;
   background: url(./banner.jpg) no-repeat;
   background-size: cover;
   display: flex;
   flex-direction: column;//垂直排列
   justify-content: center;
   align-items: center;
   .mobile{
     width: 66px;
     height: 66px;
   }
   .text{
     font-size: 14px;
     color: #fff;
   }
 }
 .data-info{
   .data-info-item{
      height: 65px;
      color: #fff;
    .text-wrap{
      display: flex;
      flex-direction: column;
      justify-content: center;
      .count{
       font-size: 8px;
      }
      .text{
       font-size: 11px;
      }
    }
  }
 }
   /deep/ .nav-grid{
      .nav-grid-item{
        height: 70px;
        .van-icon {
          font-size: 21px
        }
      .van-icon-star-o{
          color: #eb5253;
        }
      .van-icon-browsing-history-o{
        color:#ff9d1d;
      }
      .van-grid-item__text{
        font-size: 14px;
        color: #333;
      }
     }
   }
  .logout-cell{
    text-align: center;
    color: #db6262;
  }
  .mb-4{
    margin-bottom: 4px;
  }
}
</style>
