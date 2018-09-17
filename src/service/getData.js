// import fetch from '../config/fetch'
import {get, post} from './httpRequest'
import { baseUrl } from '@/config/env'

/**
 * 获取用户数据
 */
// export const getUser = () => fetch('/api/user/', {username: getStore('username')})
export const getUser = (username) => get(baseUrl + '/api/user/', {username: username})

export const login = (username, password) => post(baseUrl + '/api/user/sign/in', {username: username, password: password})

export const getcaptchas = (width, height) => get(baseUrl + '/api/upload/captcha', {width: width, height: height})
