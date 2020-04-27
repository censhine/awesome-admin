import Vue from 'vue'
import Vuex from 'vuex'

import awadmin from './modules/awadmin'

import leftmenu from './modules/leftmenu'
import permission from './modules/permission'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    awadmin,
    leftmenu,
    permission
  }
})
