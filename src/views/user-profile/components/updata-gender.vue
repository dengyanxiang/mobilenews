<template>
<div class="updata-gender">
    <van-picker
      show-toolbar
      :default-index="defaultIndex"
      :columns="columns"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onGenderChange"
    />
</div>
</template>

<script>
import { updataUserProfile } from '@/api/user'
export default {
  name: 'UpdataGgender',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      defaultIndex: this.value // 设置默认的索引
    }
  },
  methods: {
    onGenderChange (picker, value, index) {
      this.defaultIndex = index
    },
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidclick: true
      })
      // 请求提交更新父组件性别
      await updataUserProfile({
        gender: this.defaultIndex
      })
      // 更新成功————修改父组件的gender————关闭弹出层
      this.$emit('updata-gender', this.defaultIndex)
      this.$emit('close') // 关闭弹出层
      this.$toast.success('保存成功')
    }
  }
}
</script>

<style scoped lang="less">

</style>
