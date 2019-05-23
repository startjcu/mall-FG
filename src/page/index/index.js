var _mm = require('util/_mm.js')

var html = '<div>{{content}}</div>'

var data = {
  content: 'hello wrold'
}

console.log(_mm.renderHtml(html, data))