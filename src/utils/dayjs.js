/**
 * 初始化DayJS的相关配置
*/
import Vue from 'vue'
import dayjs from 'dayjs'
// 配置使用中文语言包
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
// 配置使用中文语言包
dayjs.extend(relativeTime)
dayjs.locale('zh-cn') // 全局使用
// 把处理相对时间的代码处理成过滤器
Vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs()) // 用于计算相对事件
})
