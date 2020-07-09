/**
 * 将数据源处理为菜单树
 * @param arr
 * @returns {{header: Array, aside: Array}}
 */
function getMenuData(arr) {
  let menuList = [{
    path: '/aw/goods',
    name: '商品管理',
    meta:{
      title:'商品管理',
      icon: '',
    },
    children:[
      {
        path: 'index',
        name: '商品列表',
        meta:{
          title:'商品列表',
          icon:'el-icon-s-home',
          routerType:'leftmenu'
        },
        component: () => import('@/views/aw/goods/index'),
      }
    ]
  }]
  let tree = { aside: [] }
  arr.forEach(value => {
    let arrElem = {
      path: value.webUrl,
      name: value.name,
      icon: value.icon,
      meta:{
        title:value.name,
        icon: value.icon,
      },
      children:[]
    }
    if(value.children.length){
      let childrenArr = value.children
      childrenArr.forEach(val=>{
        let pathArr = val.webUrl.split('/')
        arrElem.path = val.webUrl.replace('/'+pathArr[pathArr.length-1],'')
        arrElem.children.push({
          path: pathArr[pathArr.length-1],
          name: val.name,
          meta:{
            title:val.name,
            icon:val.icon,
            routerType:'leftmenu'
          },
          component: () => import('@/views/'+arrElem.path),
        })
      })
    }
    tree.aside.push(arrElem)
  })
  return tree
}

let newArr = []

function arrConversion(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i]['children'])) {
      arrConversion(arr[i]['children'])
    } else {
      newArr.push(arr[i]['webUrl'])
    }
  }
  return newArr
}

export default {
  install(vm, source) {
    const menu = getMenuData(source||[])
    arrConversion(source||[])
    console.log('install_menu:', menu)
    console.log('rights:', newArr)
    vm.commit('awadmin/leftmenu/asideSet', menu.aside)
    vm.commit('awadmin/leftmenu/rightSet', newArr)
  }
}
