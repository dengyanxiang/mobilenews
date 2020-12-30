/**
 * 文章评论接口
 */
import request from '@/utils/request'
/**
 * 获取文章评论或者回复的接口
 */
export const getComments = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params // 请求的参数是一个对象
  })
}
