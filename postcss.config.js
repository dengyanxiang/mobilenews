module.exports = {
  plugins: { // 配置要使用的插件
    //   autoprefixer: {//用來兼容不同的瀏覽器
    //     browsers: ['Android >= 4.0', 'iOS >= 8'], // 會出現警告信息 :原因：與.browserelistrc中的內容相衝突
    //   },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
