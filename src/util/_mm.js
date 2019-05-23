var conf = {
  serverHost: ''
}

var Hogan = require('hogan.js')

var _mm = {
  //网络请求
  request: function (param) {
    var _this = this
    $.ajax({
      type: param.method || 'get',
      url: param.url || '',
      dataType: param.dataType || 'json',
      data: param.data || '',
      success: function (res) {
        if (0 === res.status) { //请求成功
          typeof param.success === 'function' && param.success(res.data, res.msg)
        } else if (10 === res.status) { //没有登录状态，需要强制登录
          _this.doLogin()
        } else if (1 === res.status) { //请求数据错误
          typeof param.error === 'function' && param.error(res.msg)
        }
      },
      error: function (err) {
        typeof param.error === 'function' && param.error(err.statusText)
      }
    })
  },
  //统一登录处理
  doLogin: function () {
    window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href)
  },
  //获取服务器地址
  getServerUrl: function (path) {
    return conf.serverHost + path
  },
  //获取url参数
  getUrlParam: function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var result = window.location.search.substr(1).match(reg)
    return result ? decodeURIComponent(result[2]) : null
  },
  //渲染html模板
  renderHtml: function (htmlTemplate, data) {
    var template = Hogan.compile(htmlTemplate)
    return template.render(data)
  },
  //成功提示
  successTips: function (msg) {
    alert(msg || '操作成功')
  },
  //错误提示
  errorTips: function (msg) {
    alert(msg || '好像出错了~')
  },
  //字段验证，支持非空、手机、邮箱的验证
  validate: function (value, type) {
    var value = $.trim(value)
    //非空验证
    if ('require' === type) {
      return !!value
    }
    //手机号验证
    if ('phone' === type) {
      return /^1\d{10}$/.test(value)
    }
    //邮箱格式验证
    if ('email' === type) {
      return /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(value)
    }
  },
  goHome: function () {
    window.location.href = './index.html'
  }
}

module.exports = _mm