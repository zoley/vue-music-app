'use strict'
const path = require('path')
// var express = require('express')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = 'vue-music-app' // page title
const port = 9527 // dev port
/*
 * var app = express();
 * var apiRoutes = express.Router();
 */

/*
 * apiRoutes.get('/getDiscList', function (req, res) {
 *   var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
 *   axios.get(url, {
 *     headers: {
 *       referer: 'https://c.y.qq.com/',
 *       host: 'c.y.qq.com'
 *     },
 *     params: req.query
 *   }).then((response) => {
 *     res.json(response.data)
 *   }).catch((e) => {
 *     console.log(e)
 *   })
 * })
 */

/*
 * app.use('/api', apiRoutes);
 * app.listen(port);
 */

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': { // 代理url关键字
        target: 'https://c.y.qq.com', // 需要代理的地址
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/api': ''
        }
      },
      '/pc': { // 代理url关键字
        target: 'https://u.y.qq.com', // 需要代理的地址
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/pc': ''
        },
        // 突破host和origin的限制
        headers: {
          referer: 'https://y.qq.com/',
          origin: 'https://y.qq.com'
        }
      }
    }
  },
  configureWebpack: {
    /*
     * provide the app's title in webpack's name field, so that
     * it can be accessed in index.html to inject the correct title.
     */
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // Provide path to the file with resources（这里是你.scss文件所在路径）
          resources: './src/assets/css/base.scss'
        })
        .end()
    })
  }
}
