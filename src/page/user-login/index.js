require('./index.css')
require('page/common/nav-simple/index.js')

var _mm = require('util/_mm.js')
var _user = require('service/user-service.js')
var formError = {
  show: function (errMsg) {
    $('.error-item').show().find('.err-msg').text(errMsg)
  },
  hide: function () {
    $('.error-item').hide().find('.err-msg').text('')
  }
}

//page逻辑部分
var page = {
  init: function () {
    this.bindEvent()
  },
  bindEvent: function () {
    var _this = this
    $('#submit').click(function () {
      _this.submit()
    });
    $('.user-content').keyup(function (e) {
      if (e.keyCode === 13) {
        _this.submit()
      }
    })
  },
  //提交表单
  submit: function () {
    var formData = {
      username: $.trim($('#username').val()),
      password: $.trim($('#password').val())
    }
    validateResult = this.formValidate(formData)
    if (validateResult.status) {
      //提交
      _user.login(formData, function (res) {
        window.location.href = _mm.getUrlParam('redirect') || './index.html'
      }, function (errMsg) {
        formError.show(errMsg)
      })
    } else {
      formError.show(validateResult.msg)
    }
  },
  //表单验证
  formValidate: function (formData) {
    var result = { status: false, msg: '' }
    //验证失败
    if (!_mm.validate(formData.username, 'require')) {
      result.msg = '用户名不能为空'
      return result
    }
    if (!_mm.validate(formData.password, 'require')) {
      result.msg = '密码不能为空'
      return result
    }
    //通过验证，返回正确提示
    result.status = true
    result.msg = '验证通过'
    return result
  }
}
// $(function() {}) 是$(document).ready(function()的简写
$(function () {
  page.init()
})