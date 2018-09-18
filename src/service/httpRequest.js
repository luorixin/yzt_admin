import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import qs from 'qs'

const http = axios.create({
  timeout: 1000 * 30
})

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
  const token = Vue.cookie.get('token') // 请求头带上token
  config.data = qs.stringify(config.data)
  config.headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  if (token) {
    config.headers['Authorization'] = 'bearer ' + token
  }
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
  if (response.data && response.data.code === 401) { // 401, token失效
    clearLoginInfo()
    router.push({ name: 'login' })
  }
  return response
}, error => {
  return Promise.reject(error)
})

/**
 * 清除登录信息
 */
export function clearLoginInfo () {
  Vue.cookie.delete('token')
}

/**
 * 封装get方法
 * @param url
 * @param params
 * @returns {Promise<any>}
 */
export function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    http.get(url, {
      params: params
    }).then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 封装post方法
 * @param url
 * @param data
 * @returns {Promise<any>}
 */
export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    http.post(url, data)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function put (url, data = {}) {
  return new Promise((resolve, reject) => {
    http.put(url, qs.stringify(data))
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
