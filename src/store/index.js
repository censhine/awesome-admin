import Vue from 'vue'
import Vuex from 'vuex'

import awadmin from './modules/awadmin'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    awadmin
  }
})
