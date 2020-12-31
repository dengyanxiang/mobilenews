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
/**
 * 对评论文章或文章回复点赞
 */
export const addCommentLike = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/liking',
    data: {
      target
    }
  })
}
/**
 * 取消对评论文章或文章回复点赞
 */
export const deleteCommentLike = commentId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/liking/${commentId}`
  })
}
/**
 * 添加评论或评论回复
 */
export const addComment = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}
