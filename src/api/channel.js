/**
 * 获取全部列表的接口
 */
import request from '@/utils/request'
export const getAllCahnnels = () => {
  return request({
    methods: 'GET',
    url: '/app/v1_0/channels'
  })
}
