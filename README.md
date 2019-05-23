# mall-FG
电商网站前台前端项目

# 项目初始化
在建好项目目录后，在根目录下执行npm init命令

# 安装webpack版本1.15.0
在全局和开发环境中都要安装这个版本，4.0后的版本变化很大

# 在开发环境中安装依赖
npm install webpack@1.15.0 -D
其中-D是--save-dev的简写

# jquery的引入问题
若是使用npm安装，则每个文件中都要用require引入才能使用
故采用在首页中加载cdn文件的方式，全局引入
在webpack中配置扩展，可以在文件中引入window下的jQuery

# 全局通用模块配置
webpack.optimize.CommonsChunkPlugin

# css样式处理
loader安装和单独打包配置css-loader、style-loader、extract-text-webpack-plugin

# webpack对html模板的处理
html-webpack-plugin，html-loader可以将通用html模块到一个单独文件，通过<%=(html-loader!./path%>导入

# 对图片的打包处理
url-loader，file-loader

# webpack-dev-server实现热更新
配置好开发环境下的环境变量

# 通用工具类的封装
在util下创建_mm.js

# 路径别名配置，方便引入其他文件，同时配置开发服务器代理
在webpack.config.js中的resolve下配置alias，devServer

# 配置通用样式和使用font-awesome图标
记得在webpack配置文件中配置对应的loader，正则表达式要写对