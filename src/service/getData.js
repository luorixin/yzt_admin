import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'

/**
 * 获取用户数据
 */
export const getUser = () => fetch('/api/user/', {username: getStore('username')})
