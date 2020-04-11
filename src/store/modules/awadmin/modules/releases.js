import util from '@/libs/util.js'

export default {
  namespaced: true,
  mutations: {
    /**
     * @description 显示版本信息
     * @param {Object} state state
     */
    versionShow () {
      util.log.capsule('awadmin', `v${process.env.VUE_APP_VERSION}`)
      console.log('D2 Admin  https://github.com/aw-projects/aw-admin')
      console.log('D2 Crud   https://github.com/aw-projects/aw-crud')
      console.log('Document  https://d2.pub/zh/doc/aw-admin')
      console.log('请不要吝啬您的 star，谢谢 ~')
    }
  }
}
