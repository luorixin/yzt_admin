import { GET_USERINFO, RESET_USERNAME } from './mutation-type'

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
      state.userInfo = null;
    }
  },
  [RESET_USERNAME] (state, username) {
    state.userInfo = Object.assign({}, state.userInfo, {username})
  }
}
