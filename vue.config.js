module.exports = {
  devServer: {
    port: 8080,

    host: "localhost",

    https: false,

    open: false,
    proxy: {
      "/api": {
        target: "http://106.54.113.128/wordpress",
        pathRewrite: {
          "^/api": "/"
        }
      },
      "/wordpress": {
        target: "http://106.54.113.128/wordpress",
        pathRewrite: {
          "^/wordpress": "/"
        }
      },
      "/wp-content": {
        target: "http://106.54.113.128/wordpress"
      }
    }
  }
};
