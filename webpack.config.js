var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlPlugin = require('html-webpack-plugin')

//环境变量配置，dev/online
var WEBPACK_DEV = process.env.WEBPACK_DEV || 'dev'

//获取html-webpack-plugin参数的方法
var getHtmlConfig = function (name) {
  return {
    template: './src/view/' + name + '.html',
    filename: 'view/' + name + '.html',
    favicon: './favicon.ico',
    inject: true,
    hash: true,
    chunks: ['common', name]
  }
}

var config = {
  entry: {
    common: ['./src/page/common/index.js'],
    index: ['./src/page/index/index.js'],
    login: ['./src/page/login/index.js'],
  },
  output: {
    path: './dist',
    publicPath: '/dist/',
    filename: 'js/[name].js'
  },
  externals: {
    jquery: 'window.jQuery'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
      { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
      { test: /\.string$/, loader: 'html-loader' }
    ]
  },
  resolve: {
    alias: {
      node_modules: __dirname + '/node_modules',
      util: __dirname + '/src/util',
      page: __dirname + '/src/page',
      service: __dirname + '/src/service',
      image: __dirname + '/src/image',
    }
  },
  plugins: [
    //将独立通用模块打包到js/base.js
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/base.js'
    }),
    //把css打包到独立文件中
    new ExtractTextPlugin('css/[name].css'),
    //html模板的处理，自动导入css和js文件
    new HtmlPlugin(getHtmlConfig('index')),
    new HtmlPlugin(getHtmlConfig('login'))
  ],
  devServer: {
    port: 8088,
    inline: true,
    proxy: {
      '**/*.do': {
        target: 'http://test.happymmall.com',
        changeOrigin: true
      }
    }
  }
}

if ('dev' === WEBPACK_DEV) {
  config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}

module.exports = config