<template>
<div class="update-name">
    <van-nav-bar title="修改昵称"
      left-text="取消"
      right-text="确定"
      @click-left="$emit('close')"
      @click-right="onConfirm"
     />
     <div class="name-wrap">
        <van-field
            v-model="loaclName"
            rows="2"
            autosize
            type="textarea"
            maxlength="10"
            placeholder="请输入昵称"
            show-word-limit
        />
     </div>
</div>
</template>

<script>
import { updataUserProfile } from '@/api/user'
export default {
  name: 'UpdataName',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loaclName: this.name
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidclick: true
      })
      // 请求提交更新父组件昵称
      try {
        await updataUserProfile({
          name: this.loaclName
        })
        // 更新成功————修改父组件的name————关闭弹出层
        this.$toast.success('保存成功')
        this.$emit('updata-name', this.loaclName)
        this.$emit('close') // 关闭弹出层
      } catch (err) {
        if (err && err.response && err.response.status === 409) {
          this.$toast.fail('昵称已存在')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.name-wrap{
    padding: 10px;
}
</style>
