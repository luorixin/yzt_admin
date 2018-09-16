import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'

export const getUser = () => fetch('/api/user/', {username: getStore('username')})
