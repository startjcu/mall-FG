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
    //验证用户名是否存在
    $('#username').blur(function () {
      //jQuery选择器中的this指向当前DOM元素
      var username = $.trim($(this).val())
      //当有输入用户名时再验证，规避空验证
      if (username) {
        //异步验证用户名是否存在
        _user.checkUsername(username, function (res) {
          formError.hide()
        }, function (errMsg) {
          formError.show(errMsg)
        })
      }
    })
    //注册按钮点击
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
      password: $.trim($('#password').val()),
      passwordConfirm: $.trim($('#password-confirm').val()),
      phone: $.trim($('#phone').val()),
      email: $.trim($('#email').val()),
      question: $.trim($('#question').val()),
      answer: $.trim($('#email').val())
    }
    validateResult = this.formValidate(formData)
    if (validateResult.status) {
      //提交
      _user.register(formData, function () {
        window.location.href = './result.html?type=register'
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
    if (formData.password.length < 6) {
      result.msg = '密码长度不能少于6位'
      return result
    }
    if (formData.password !== formData.passwordConfirm) {
      result.msg = '两次输入的密码不一致'
      return result
    }
    if (!_mm.validate(formData.phone, 'phone')) {
      result.msg = '手机号格式不正确'
      return result
    }
    if (!_mm.validate(formData.email, 'email')) {
      result.msg = '邮箱格式不正确'
      return result
    }
    if (!_mm.validate(formData.question, 'require')) {
      result.msg = '密保问题不能为空'
      return result
    }
    if (!_mm.validate(formData.answer, 'require')) {
      result.msg = '密保问题的答案不能为空'
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