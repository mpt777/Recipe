const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      proxy: {
        "/api/*": {
          target: "http://server:3000",
          secure: false,
        }
      }
    },
  },
})