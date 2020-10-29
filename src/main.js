/*
 * @Author: wind-jyf
 * @Date: 2020-07-13 09:20:26
 * @LastEditTime: 2020-10-27 20:30:56
 * @LastEditors: wind-jyf
 * @Description:  
 * @FilePath: \uni-chakela\src\main.js
 */
import Vue from 'vue'
import App from './App'
import axios from 'axios'

// create an axios instance
const service = axios.create({
    baseURL: 'http://106.15.204.42:8081/', // url = base url + request url
    withCredentials: true, // send cookies when cross-domain requests
    // timeout: 5000, // request timeout
    crossDomain: true
})
axios.defaults.adapter = function(config) {
  return new Promise((resolve, reject) => {
      console.log(config)
      var settle = require('axios/lib/core/settle');
      var buildURL = require('axios/lib/helpers/buildURL');
      if(uni.getStorageSync('token')){
          config.headers['Authorization'] = uni.getStorageSync('token')
      }
      //console.log(config.headers)
      uni.request({
          method: config.method.toUpperCase(),
          url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
          header: config.headers,
          data: config.data,
          dataType: config.dataType,
          responseType: config.responseType,
          sslVerify: config.sslVerify,
          complete: function complete(response) {
              response = {
                  data: response.data,
                  status: response.statusCode,
                  errMsg: response.errMsg,
                  header: response.header,
                  config: config
              };

              settle(resolve, reject, response);
          }
      })
  })
}
Vue.prototype.$axios = service

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
