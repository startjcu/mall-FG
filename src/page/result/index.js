require('./index.css')
require('page/common/nav-simple/index.js')

var _mm = require('util/_mm.js')

$(function () {
  var type = _mm.getUrlParam('type') || 'default'
  //显示对应的提示元素
  $('.' + type + '-success').show()
})