<template>
		<el-dialog
			title='分配权限'
      :visible.sync="addDialogFormVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      width="600px">

      <el-tree
        ref="rightsTree"
        :data="data"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[]"
        :default-checked-keys="defaultCheckedKeys"
        :props="defaultProps"
        >
      </el-tree>

			<span slot="footer" class="dialog-footer">
			    <el-button type="primary" @click="getCheckedKeys">更新</el-button>
			</span>
		</el-dialog>
</template>

<script>
  const MODULE_NAME = 'role'
  const REFRESH = 'roleListRefresh'
  const SUBMIT = 'roleSubmit'
  import {findPageList,insertInfo,deleteInfo,updateInfo,getEntityInfo,getListByParentId,getTreeList} from '@/api/requestData'
  import util from '@/utils/util'
  export default {
    data() {
      return {
        id: 0,
        addDialogFormVisible: false,
        dialogLoading: false,
        dialogStatus: '',
        form:{

        },
        props: {
          label: 'name',
          children: 'zones'
        },
        data: [],
        defaultCheckedKeys: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        count: 1
      };
    },
    mounted() {

    },
    methods: {
      getCheckedKeys() {
        const ids = this.$refs.rightsTree.getCheckedKeys()
        updateInfo(MODULE_NAME,{menuIdsStr:ids.join(),id:this.id}).then(res=>{
          if(res.status){
            this.$message.success('更新成功')
            this.addDialogFormVisible = false;
            this.data = []
          }
        }).catch(e=>{

        })
      },
      isShowDia(parentToChildData, isVisible){
        if (!parentToChildData) {
          return
        }
        if(this.$refs.addForm){
          this.className = 'hideMsg'
          this.$refs.addForm.clearValidate()
        }
        this.id = parentToChildData.id;
        getTreeList('menu',null,null).then((res)=>{
          this.data = res.data;
        }).catch(e=>{

        })
        getEntityInfo(MODULE_NAME,null,{id:this.id}).then(res=>{
          this.defaultCheckedKeys = res.data.menuIds || []
        }).catch(e=>{

        })
        this.addDialogFormVisible = isVisible
      },
      handleNodeClick(data) {
        console.log(data);
      },
    }
  };
</script>

<style scoped lang="scss">
	.btn {
		margin: 20px 0;
	}

	.info p {
		line-height: 36px;
	}
</style>
