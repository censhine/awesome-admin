const types = {
  HANDLE_LEFT_MENU:'HANDLE_LEFT_MENU',  // 收缩左侧菜单
  INIT_LEFT_MENU:'INIT_LEFT_MENU',     // 初始化左侧菜单
  SET_LEFT_COLLAPSE:"SET_LEFT_COLLAPSE", // 改变左边菜单的收缩宽度
  SET_FOOTER_SHOW:"SET_FOOTER_SHOW", // 显示隐藏底部layout
}

const leftmenu = {
  state :{
    minLeftMenuWidth:35,
    maxLeftMenuWidth:200,
    leftsidebar: {
      opened: true,
      width: 200
    },
    isCollapsed:false, // 菜单默认展开
    isFooter:false
  },
  getters : {
    leftsidebar:state => state.leftsidebar,
    isCollapsed:state => state.isCollapsed,
    isFooter:state => state.isFooter
  },
  mutations:{
    [types.HANDLE_LEFT_MENU] (state) {
      if(state.leftsidebar.opened){//true
        state.leftsidebar.width = state.minLeftMenuWidth;
      }else{
        state.leftsidebar.width = state.maxLeftMenuWidth;
      }
      state.leftsidebar.opened = !state.leftsidebar.opened
    },
    [types.INIT_LEFT_MENU] (state) {
      state.leftsidebar = state.leftsidebar
    },
    [types.SET_LEFT_COLLAPSE] (state) {
      state.isCollapsed = !state.isCollapsed
    },
    [types.SET_FOOTER_SHOW] (state) {
      state.isFooter = true
    }

  },
  actions:{
    handleLeftMenu:({ commit }) => {
      commit(types.HANDLE_LEFT_MENU)
    },
    initLeftMenu:({ commit }) => {
      commit(types.INIT_LEFT_MENU)
    },
    setLeftCollapse:({ commit}) => {
      commit(types.SET_LEFT_COLLAPSE)
    }
  }

}

export default leftmenu;
