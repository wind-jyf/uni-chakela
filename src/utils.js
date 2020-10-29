/*
 * @Author: wind-jyf
 * @Date: 2020-07-15 16:14:19
 * @LastEditTime: 2020-10-27 20:35:21
 * @LastEditors: wind-jyf
 * @Description: 
 * @FilePath: \uni-chakela\src\utils.js
 */
export const validatePassword = (pass = '') => /^[a-zA-Z0-9_]{6,20}$/.test(pass) ? true : '密码必须是6-20位字符数字和下划线'

export const validateQQ = qq => /^$|[1-9]\d{4,9}$/.test(qq) ? true : '请输入正确的qq号'
  
export const validateUsername = name => /^[a-zA-Z0-9]{4,12}$/.test(name) ? true : '用户名由字母a-z或数字组成，长度为4-12位'

export const validateEmail = email => /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(email) ? true : false

export const validateTelephone = telephone => /^1[34578]\d{9}$/.test(telephone) ? true : '手机号格式不正确'

export const testAllSpace = value => /^\s+$/.test(value) || value.length == 0 ? true : false