<template>
 <div class="suggest-history">
     <van-cell title="搜索历史">
       <div v-if="isDeleteShow">
           <span @click="$emit('updata-histories',[])">全部删除</span>
           &nbsp;&nbsp;
           <span @click="isDeleteShow=false">完成</span>
       </div>
       <van-icon v-else name="delete" @click="isDeleteShow=true"/>
     </van-cell>
     <van-cell :title="history"
     v-for="(history, index) in searchHistories"
     :key="index"
     @click="isDelete(history, index)"
     >
         <van-icon
         v-show="isDeleteShow"
          name="close" />
     </van-cell>
 </div>
</template>

<script>
import { setItem } from '@/utils/storeage'
export default {
  name: 'SearchHistory',
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false
    }
  },
  methods: {
    isDelete (history, index) {
      // 如果是删除状态，则执行删除操作
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1)
        // 数据持久化处理
        // 1.修改本地存储数据
        // 2.请求接口删除线上数据
        setItem('search-histories', this.searchHistories)// 持久化本地数据
        return
      }
      // 如果是非删除状态，则展示搜索结果
      this.$emit('search', history)
    }
  }
}
</script>

<style scoped>

</style>
