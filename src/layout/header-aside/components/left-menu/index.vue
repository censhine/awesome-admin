<template>
   <div class="menu_left cflex leftmenu_box" :style="{width:leftsidebar.width+'px'}">
        <div class="menu_page_top rflex">
<!--            <img :class='["logo",{"closeLogo":!sidebar.opened}]' :src="logo" alt="商家管理系统" >-->
            <!-- <span class='title' v-show="sidebar.opened">商家管理系统<i>Admin</i></span> -->
        </div>
        <div class="menu_page_bottom is-scroll-left">
            <el-menu
                mode="vertical"
                theme="dark"
                :uniqueOpened=true
                :show-timeout="200"
                :default-active="$route.path"
                :collapse="isCollapsed"
                :background-color="menuObj.bgColor"
                :text-color="menuObj.textColor"
                :active-text-color="menuObj.activeTextColor"
                :style="{width:leftsidebar.width+'px',height: '1000px'}"
                >
                    <template v-for="(item,index) in permission_routers">
                        <!--表示 有一级菜单-->
                        <router-link v-if="!item.hidden && item.noDropdown" :to="item.path+'/'+item.children[0].path" :key="index">
                            <el-menu-item class="dropItem"
                                :index="item.path+'/'+item.children[0].path"
                                >
                                <i v-if="item.meta.icon" class="item.meta.icon" />
                                <span v-if="item.meta.title" slot="title">{{item.name}}</span>
                            </el-menu-item>
                        </router-link>

                        <!--表示 有二级或者多级菜单 -->
                        <el-submenu v-if="item.children  && item.children.length >= 1 && !item.hidden && !item.noDropdown"  :index="item.path" :key="index">
                            <template slot="title">
                                <i v-if="item.meta.icon" class="item.meta.icon" />
                                <span class="title" v-if="item.meta.title" slot="title">{{ item.name}}</span>

                            </template>
                            <!--直接定位到子路由上，子路由也可以实现导航功能-->
                            <router-link v-for="(citem,cindex) in item.children" :to="getIindex(citem,item,cindex)"  :key="cindex">
                                <el-menu-item
                                    v-if="citem.meta.routerType != 'topmenu' && citem.hidden != true && citem.meta.title"
                                    :index="getIindex(citem,item,cindex)">
                                    <span slot="title"> {{ citem.name }}</span>
                                </el-menu-item>
                            </router-link>
                        </el-submenu>
                    </template>
            </el-menu>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as mUtils from "@/utils/mUtils";

export default {
  name: "left-Menu",
  data() {
    return {
       menuObj:{
         bgColor:'#33333d',
         textColor:'#999',
         activeTextColor:'#ff6428',
       },
       //logo:logoImg
    };
  },
  computed:{
      ...mapGetters([
        'permission_routers',
        'isCollapsed',
        'leftsidebar',
        'menuIndex'
      ]),
  },
  created(){
      console.log(this.isCollapsed)
      console.log(this.leftsidebar)
  },
  mounted(){
  },
  methods: {
    getIindex(citem,item,cindex){
      return (citem.meta.titleList)?item.path+'/'+citem.path+'/'+citem.meta.titleList[0].path:item.path+'/'+citem.path;
    }
  }
};
</script>

<style lang="scss">
  $left-bgColor:#fff;  // 左侧菜单背景颜色;
  $icon-link: #324eff;
    .menu_left{
        position: absolute;
        top:0;
        left:0;
        bottom:0;
       .title{
         font-weight: 600;
       }
       .is-active{
         color:$color-primary !important;
         font-weight: 500;
       }
      .el-submenu__title{
        padding-left: 0 !important;
      }
    }
    .menu_page_top{
        width:100%;
        height: 60px;
        align-items: center;
        justify-content: space-around;
        text-transform: uppercase;
        box-sizing: border-box;
        box-shadow:0px 2px 5px 0px rgba(230,224,224,0.5);
        .logo {
            height: 36px;
            width: 36px;
            vertical-align: middle;
            display: inline-block;
        }
        .closeLogo{
            width:30px;
            height:30px;
        }
        .title{
            font-size: 22px;
            i{
                color:#FF6C60;
            }
        }
    }
  .menu_page_bottom {
      width:100%;
      overflow-y: scroll;
      overflow-x: hidden;
      flex:1;
      margin-top:3px;
      z-index: 10;
      box-shadow: 0 0 10px 0 rgba(230, 224, 224, 0.5)
  }
  .menu_page_top{
    height: 0 !important;
  }

  .leftmenu_box{
    #leftMenu .el-menu-item.is-active {
      background: rgba(0, 0, 0, 0.5) !important;
      border-left: 1px solid $color-primary;
    }

    .is-opened .el-submenu__title {
      background: black !important;
      color:white !important;
    }

    .is-opened .el-menu--inline{
      /*border-bottom: 1px solid #ededed;*/
    }

    .el-menu-item .is-active{
      background: black;
    }

    .el-menu-item{
      background: black !important;
    }
  }
  .menu_left .title{
    padding-left: 20px;
  }

  .el-menu-item.is-active{
    background: $color-primary !important;
    color: white !important;
  }
  .el-submenu .el-menu-item:hover{
    background: $color-primary !important;
    color: white !important;
  }
  .el-submenu .el-menu-item{
    height: 38px !important;
    line-height: 38px !important;
  }

  .el-menu-item, .el-submenu__title{
    height: 42px !important;
    line-height: 42px !important;
  }
</style>
