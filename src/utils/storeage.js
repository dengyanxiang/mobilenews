/**
 * 本地存储模块的封装
 */
export const getItem = (name) => {
  const data = window.localStorage.getItem(name)// 获取本地存储的数据
  /**
   * 当获取到的数据不是JSON格式时，执行try中的JSON.parse()
   * 当获取的数据是JSON格式时，则直接返回data数据
   */
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

export const setItem = (name, value) => {
  // 防止输入的value值是对象，则执行if语句，否则直接输出
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

export const removeItem = (name) => {
  window.localStorage.removeItem(name)
}
