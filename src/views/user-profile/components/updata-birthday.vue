<template>
  <div class="updata-brithday">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="$emit('close')"
        @confirm="onConfirm"
     />
  </div>
</template>

<script>
import { updataUserProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'UpdataBirthday',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value) // new Date().......当前日期
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidclick: true
      })
      // 请求提交更新父组件性别
      /**
      * const data = `${this.currentDate.getFullYear()}
      -${this.currentDate.getMonth() + 1}
      -${this.currentDate.getDate()}
      `
      */
      const data = dayjs(this.currentDate).format('YYYY-MM-DD')
      await updataUserProfile({
        birthday: data
      })
      // 更新成功————修改父组件的gender————关闭弹出层
      this.$emit('updata-gender', data)
      this.$emit('close') // 关闭弹出层
      this.$toast.success('保存成功')
    }
  }
}
</script>

<style scoped lang="less">

</style>
