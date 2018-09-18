import {getStore} from '../config/mUtils'

export default {
  getActiveMenu (state) {
    let activeMenu = getStore('activeMenu')
    if (activeMenu) {
      state.activeMenu = activeMenu
    }
    return state.activeMenu
  }
}
