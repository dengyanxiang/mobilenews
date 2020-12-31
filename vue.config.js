module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    // 设置开发接口代理
    proxy: {
      server: {
        target: ' http://localhost:8080/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/serve': ''
        }
      }
    }
  }
}
