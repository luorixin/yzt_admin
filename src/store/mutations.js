import {GET_USERINFO, RESET_USERNAME, RECORD_USERINFO, LOGOUT} from './mutation-type'
import {setStore, removeStore} from '../config/mUtils'

export default {
  [GET_USERINFO] (state, info) {
    if (state.userInfo && (state.userInfo.userName !== info.userName)) {
      return
    }
    if (!state.login) {
      return
    }
    if (!info.message) {
      state.userInfo = {...info}
    } else {
      state.userInfo = null
    }
  },
  [RESET_USERNAME] (state, username) {
    state.userInfo = Object.assign({}, state.userInfo, {username})
  },
  // 记录用户信息
  [RECORD_USERINFO] (state, info) {
    state.userInfo = info
    state.login = true
    setStore('username', info.username)
  },
  // 退出
  [LOGOUT] (state) {
    state.userInfo = null
    state.login = false
    removeStore('username')
  }
}
