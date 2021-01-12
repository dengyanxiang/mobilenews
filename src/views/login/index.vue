<template>
  <div class="login-container">
    <van-nav-bar title="注册/登录" class="app-nav-bar" left-arrow @click-left="$router.back()" />
    <!--
      1.使用van-form进行表单的包裹，同时将button按钮包裹到van-form表单中
      2.给van-form绑定一个submit提交时间
      2.使用rule规则进行验证，通过后才会触发submit的提交
    -->
   <van-form @submit="onLogin" @failed="onFailed" validate-first ref="login-form" :show-error="false" :show-error-message="false">
      <van-field
       v-model="user.mobile"
        left-icon="phone-o"
        placeholder="请输入手机号"
        center
        name="mobile"
        :rules="formRule.mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        left-icon="edit"
        placeholder="请输验证码"
        name="code"
        :rules="formRule.code"
      >
          <template #button>
             <van-count-down v-if="isCountDownShow" :time = "1000*60" farmat= "ss s"  @finish="isCountDownShow = false" />
             <van-button v-else class="vbtn" size="small" round :loading= "isSendSmsLoading" @click.prevent="onSendSms()">发送验证码
             </van-button>
          </template>
      </van-field>
      <div class="login-div">
         <van-button  class="login-btn" type="primary" block @click="onLogin()">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
import { Toast } from 'vant'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: '246810'
      },
      formRule: { // 效验验证码规则，
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|8|8]\d{9}$/, message: '手机号格式错误' }// 以1开头的，第二位数值为3/3,7,8,9，后面还有九位数的手机格式
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{9}$/, message: '验证码格式错误' }// 9位数的验证码格式
        ]
      },
      isCountDownShow: false, // 控制倒计时和发送按钮的状态
      isSendSmsLoading: false // 发送验证码按钮的loading状态
    }
  },
  methods: {
    async onLogin () {
      Toast.loading({
        message: '登录中...', // 显示提示文本
        forbidClick: true, // 禁止背景点击
        duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失
      })
      // 1.找到数据接口  2.封装请求方法
      // 3.请求调用登录
      try {
        // const res = await login(this.user)
        const { data } = await login(this.user)
        // 4.处理相应结果
        this.$toast.success('登录成功')
        // 将后端返回的数据存储到vuex容器中
        this.$store.commit('setUser', data.data)
        // console.log(res)
        // 清除 layout 的缓存，让其重新渲染
        this.$store.commit('removeCachePages', 'LayoutIndex')
        // Toast.success('登陆成功')
        // 登陆成功，跳转到原来的页面
        // this.$router.back()
        this.$router.push(this.$route.query.redirect || '/')
      } catch (err) {
        // console.log(err)
        // console.log('登陆失败', err)
        // Toast.fail('登录失败，手机或者验证码错误')
        this.$toast.fail('登陆失败，手机号或者验证码错误')
      }
    },
    onFailed (error) {
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message, // 提示信息
          position: 'top'// 防止键盘太高看不到信息
        })
      }
    },
    async onSendSms () {
      // 校验手机号码
      try {
        await this.$refs['login-form'].validator('mobile')
        // 验证通过，请求发送验证码
        this.isSendSmsLoading = true// 展示按钮的loading状态，防止因为网络慢让用户多次点击
        await sendSms(this.user.mobile)// 向后方发送请求
        // // 短信发送成功，隐藏按钮，显示倒计时
        this.isCountDownShow = true
      } catch (err) {
        // 不同的错误需要有不同的提醒，需要不同的分析
        let message = ''
        if (err && err.response && err.response.status === 429) {
          message = '操作频繁，请稍后'// 发送短信失败时的提醒
        } else if (err.name === 'mobile') {
          // 表单验证时失败的提醒
          message = err.message
        } else {
          // 未知错误
          message = '发送失败，请重新发送'
        }
        // 提示用户
        this.$toast({
          message: err.message,
          position: 'top'
        })
      }
      this.isSendSmsLoading = false// 无论成功还是失败，都要需要把发送按钮的loading取消
      // 验证通过 -> 请求发送验证码 -> 用户接受验证码 -> 输入验证码 -> 请求登录
      // 请求发送验证码 -> 隐藏发送按钮，显示倒计时
      // 倒计时结束 -> 显示发送按钮，隐藏倒计时
    }
  }
}
</script>

<style scoped lang="less">
.login-container{
  .left-icon {
     font-size: 14px;
  }
  .vbtn {
      width: 80px;
      height: 24px;
      background: #ededed;
      .van-button__text{
        font-size: 11px;
        color: #666;
      }
  }
  .login-div{
    margin: 26px 16px;
    .login-btn{
      background: #6bd4fb;
      border: none;
      .van-button__text{
        font-size: 15px;
      }
    }
  }
}
</style>
