module.exports = {
  devServer: {
    port: 8080,

    host: "localhost",

    https: false,

    // 自动启动浏览器

    open: false,
    // 将此处2个地址改为自己的地址
    proxy: {
      "/api": {
        // target: 'https://www.xuanmo.xin',
        target: "http://106.54.113.128/wordpress",
        pathRewrite: {
          "^/api": "/"
        }
      },
      "/wp-content": {
        // target: 'https://www.xuanmo.xin'
        target: "http://106.54.113.128/wordpress"
      }
    }
  }
};
