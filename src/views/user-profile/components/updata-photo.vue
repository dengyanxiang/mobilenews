<template>
<div class="updata-photo">
  <img
  class="image"
  :src="image"
  ref="image"
  >
  <van-nav-bar
   class="toolbar"
   left-text="取消"
   right-text="确定"
   @click-left="$emit('close')"
   @click-right="onConfirm"
   />
</div>
</template>

<script>
import { updataUserPhoto } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

export default {
  name: 'UpdataPhoto',
  props: {
    file: {
      // type: Object,
      required: true
    }
  },
  data () {
    return {
      image: window.URL.createObjectURL(this.file),
      cropper: null // 裁切器实例
    }
  },
  mounted () {
    // 获取需要裁切的图片
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  },
  methods: {
    getCroppedCanvas () {
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas.toBlob((blob) => {
          resolve(blob)
        })
      })
    },
    async onConfirm  () {
      this.$toast.loading({
        message: '保存中...',
        forbidclick: true
      })
      const file = await this.getCroppedCanvas()
      const fd = new FormData()
      fd.append('photo', file)
      /**
       * 如果要求Content-Type 是 multipart/form-data,则一定需要提交FormData数据对象，不能直接提交{}普通对象
      updataUserPhoto()
       */
      // const fd = new FormData()
      // fd.append('photo', this.file)
      await updataUserPhoto(fd) // 加载修改照片的数据接口
      this.$toast.success('保存成功')
      // 更新父组件的用户头像
      this.$emit('updata-photo', window.URL.createObjectURL(file))
      // 修改成功后，关闭弹出层
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="less">
.toolbar{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: black;
}
.image {
  display: block;
  max-width: 100%;
}
</style>
