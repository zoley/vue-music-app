'use strict'
const path = require('path')
var express = require('express')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = 'vue-music-app' // page title

// var app = express()

// var appData = require('./data.json');
// var seller = appData.seller;
// var goods = appData.goods;
// var ratings = appData.ratings;

// var apiRoutes = express.Router();

// apiRoutes.get('/seller', function (req, res) {
//   res.send({
//     code: 0,
//     data: seller
//   });
// });

// apiRoutes.get('/goods', function (req, res) {
//   res.send({
//     code: 0,
//     data: goods
//   });
// });

// apiRoutes.get('/ratings', function (req, res) {
//   res.send({
//     code: 0,
//     data: ratings
//   });
// });

// app.use('/api', apiRoutes);
// app.listen(3000);

const port = 9527 // dev port

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
      '/api': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
}
