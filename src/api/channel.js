import request from '@/utils/request'
/**
 * 获取全部列表的接口
 */
export const getAllCahnnels = () => {
  return request({
    methods: 'GET',
    url: '/app/v1_0/channels'
  })
}
/**
 * 批量修改用户频道接口
 */
export const addUserCahnnels = (data) => {
  return request({
    methods: 'PATCH',
    url: '/app/v1_0/user/channels',
    data // 用于接收接收到的数据
  })
}
/**
 * 删除用户指定频道
 */
export const deleteUserCahnnels = channelID => {
  return request({
    methods: 'DELETE',
    url: `/app/v1_0/user/channels/${channelID}`
  })
}
