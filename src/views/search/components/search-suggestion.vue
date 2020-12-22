<template>
 <div class="earch-suggestion">
     <van-cell
      icon="search"
      v-for="(str,index) in suggestions"
      :key="index"
      @click="$emit('search',str)"
      >
      <div slot="title" v-html="highLight(str)"></div>
      </van-cell>
 </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'
// const fn = _.debounce(function () {
//   console.log('hello')
// }, 1000)
// fn()
export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: [] // 联想列表数据
    }
  },
  methods: {
    highLight (str) {
      return str.replace( // new RegExp:正则表达式的构造函数--参数1：表达式（字符串）----参数2：匹配模式
        new RegExp(this.searchText, 'gi')
        , `<span style="color:red">${this.searchText}</span>`)
    }
  },
  watch: {
    // 监视数据的变化:  属性名---要监视的数据的名称,不能随便定义
    // searchText () {
    //   console.log('hello')
    // }
    searchText: {
      // 当数据发生了变化就会执行handler
      handler: debounce(async function () {
        const { data } = await getSearchSuggestions(this.searchText)
        this.suggestions = data.data.options
      }, 200),
      // async  handler () {
      //   // 1，找到数据接口
      //   // 2,获取接口数据
      //   const { data } = await getSearchSuggestions(this.searchText)
      //   this.suggestions = data.data.options
      //   // 3.进行模板展示
      // },
      immediate: true // 该回调将会在侦听开始之后立即被执行
    }
  }
}
</script>

<style scoped>

</style>
