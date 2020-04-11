<template>
  <div class="aw-p">
    <el-form
      :inline="true"
      size="small"
      @submit.native.prevent>
      <el-form-item>
        <el-button
          icon="el-icon-plus"
          :disabled="loading"
          @click="handleCreate('new')">创建分类</el-button>
      </el-form-item>

      <el-form-item>
        <el-button-group>
          <el-button
            v-if="auth.enable"
            icon="el-icon-check"
            :disabled="loading"
            @click="setStatusList(1)">启用</el-button>

          <el-button
            v-if="auth.disable"
            icon="el-icon-close"
            :disabled="loading"
            @click="setStatusList(0)">禁用</el-button>
        </el-button-group>
      </el-form-item>

      <el-form-item>
        <el-button-group>
<!--          <el-button-->
<!--            icon="el-icon-delete"-->
<!--            :disabled="loading"-->
<!--            @click="removeList">删除</el-button>-->

          <el-button
            icon="el-icon-refresh"
            :disabled="loading"
            @click="refresh">刷新</el-button>
        </el-button-group>
      </el-form-item>

      <el-form-item label="过滤">
        <el-input
          v-model="filterText"
          :disabled="loading"
          placeholder="输入关键词进行过滤"
          prefix-icon="el-icon-search"
          style="width: 240px;"
          :clearable="true">
        </el-input>
      </el-form-item>
    </el-form>

    <el-row :gutter="20">
      <el-col :span="24" v-loading="loading" >
        <el-tree
          class="tree-scroll"
          node-key="goods_category_id"
          :data="treeData"
          :props="treeProps"
          :filter-node-method="filterNode"
          :highlight-current="true"
          :default-expanded-keys="expanded"
          :show-checkbox="false"
          :draggable="false"
          :allow-drag="allowDrag"
          @node-click="handleNodeClick"
          @node-drop="handleDrop"
          ref="tree">
          <span class="custom-tree-node action" slot-scope="{node, data}">
            <span class="brother-showing" :class="{'status-tree': !data.status}">
              <i v-if="auth.move" class="el-icon-sort move-tree aw-mr-5"/>
              <i v-if="data.children" :class="`el-icon-${node.expanded ? 'folder-opened' : 'folder'}`"/>
              <i v-else class="el-icon-document"/>
              {{isFullName ? node.label : data.alias}}
            </span>

            <span class="active">
              <el-button
                type="text"
                size="mini"
                @click.stop="handleModify('child',data.goods_category_id)">
                创建子类
              </el-button>

<!--              <el-button-->
<!--                type="text"-->
<!--                size="mini"-->
<!--                @click.stop="setStatusItem(data.goods_category_id, data.status)">-->
<!--                {{data.status ? '禁用' : '启用'}}-->
<!--              </el-button>-->

              <el-button
                style="color:red"
                type="text"
                size="mini"
                @click.stop="remove([data.goods_category_id])">
                删除
              </el-button>

               <el-button
                 type="text"
                 size="mini"
                 @click.stop="handleModify(data.$index)">
                修改
              </el-button>

            </span>
          </span>
        </el-tree>
      </el-col>
    </el-row>

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      width="600px">
      <el-form
        :model="form"
        :rules="rules"
        label-width="80px"
        ref="form">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              label="名称"
              prop="name">
              <el-input
                v-model="form.name"
                placeholder="请输入品牌名称"
                :clearable="true"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button
          @click="dialogFormVisible = false"
          size="small">取消</el-button>

        <el-button
          v-if="dialogStatus === 'create'"
          type="primary"
          :loading="dialogLoading"
          @click="create"
          size="small">确定</el-button>

        <el-button
          v-else type="primary"
          :loading="dialogLoading"
          @click="update"
          size="small">修改</el-button>
      </div>

      <aw-storage
        ref="storage"
        style="display: none"
        :limit="1"
        @confirm="_getStorageFileList">
      </aw-storage>

      <aw-upload
        style="display: none"
        ref="upload"
        type="slot"
        accept="image/*"
        :limit="1"
        :multiple="false"
        @confirm="_getUploadFileList">
      </aw-upload>

    </el-dialog>

  </div>
</template>

<script>
import {
  addGoodsCategoryItem,
  delGoodsCategoryList,
  setGoodsCategoryIndex,
  setGoodsCategoryItem,
  setGoodsCategoryStatus
} from '@/api/goods/category'
import util from '@/utils/util'

export default {
  components: {
    'csUpload': () => import('@/components/aw-upload'),
    'csStorage': () => import('@/components/aw-storage')
  },
  props: {
    treeData: {
      default: () => []
    },
    loading: {
      default: false
    }
  },
  data() {
    return {
      expanded: [],
      filterText: '',
      isFullName: true,
      treeProps: {
        label: 'name',
        children: 'children'
      },
      cascaderProps: {
        value: 'goods_category_id',
        label: 'name',
        children: 'children',
        checkStrictly: true,
        emitPath: false
      },
      formStatus: 'create',
      formLoading: false,
      textMap: {
        create: '新增分类',
        update: '编辑分类'
      },
      dialogLoading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      stateButton: {
        create: '确定',
        update: '修改'
      },
      auth: {
        add: false,
        del: false,
        set: false,
        enable: false,
        disable: false,
        move: false
      },
      form: {
        parent_id: undefined,
        name: undefined,
        name_phonetic: undefined,
        alias: undefined,
        alias_phonetic: undefined,
        category_pic: undefined,
        category_ico: undefined,
        keywords: undefined,
        description: undefined,
        category_type: 0,
        sort: 50,
        is_navi: 0,
        status: 1
      },
      rules: {
        name: [
          {
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
          },
          {
            max: 100,
            message: '长度不能大于 100 个字符',
            trigger: 'blur'
          }
        ],
        name_phonetic: [
          {
            max: 10,
            message: '长度不能大于 10 个字符',
            trigger: 'blur'
          }
        ],
        alias: [
          {
            max: 50,
            message: '长度不能大于 50 个字符',
            trigger: 'blur'
          }
        ],
        alias_phonetic: [
          {
            max: 10,
            message: '长度不能大于 10 个字符',
            trigger: 'blur'
          }
        ],
        category_pic: [
          {
            max: 512,
            message: '长度不能大于 512 个字符',
            trigger: 'blur'
          }
        ],
        category_ico: [
          {
            max: 50,
            message: '长度不能大于 50 个字符',
            trigger: 'blur'
          }
        ],
        keywords: [
          {
            max: 255,
            message: '长度不能大于 255 个字符',
            trigger: 'blur'
          }
        ],
        description: [
          {
            max: 255,
            message: '长度不能大于 255 个字符',
            trigger: 'blur'
          }
        ],
        category_type: [
          {
            type: 'number',
            message: '必须为数字值',
            trigger: 'blur'
          }
        ],
        sort: [
          {
            type: 'number',
            message: '必须为数字值',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  filters: {
    getPreviewUrl(val) {
      return val ? util.getImageCodeUrl(val, 'goods_category') : ''
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    // const auth = this._validationAuth()
    // console.log(auth);
  },
  methods: {
    // 验证权限
    // _validationAuth() {
    //   this.auth.add = this.$permission('/zis/goods/category/add')
    //   this.auth.set = this.$permission('/zis/goods/category/set')
    //   this.auth.del = this.$permission('/zis/goods/category/del')
    //   this.auth.enable = this.$permission('/zis/goods/category/enable')
    //   this.auth.disable = this.$permission('/zis/goods/category/disable')
    //   this.auth.move = this.$permission('/zis/goods/category/move')
    // },
    // 弹出编辑对话框
    handleUpdate(index) {
      this.currentIndex = index
      this.form = { ...this.currentTableData[index] }

      this.$nextTick(() => {
        if (this.$refs.form) {
          this.$refs.form.clearValidate()
        }

        this.dialogStatus = 'update'
        this.dialogLoading = false
        this.dialogFormVisible = true
      })
    },
    // 资源下拉框事件
    handleCommand(command) {
      switch (command) {
        case 'storage':
          this.$refs.storage.handleStorageDlg([0, 2])
          break

        case 'upload':
          this.$refs.upload.handleUploadDlg()
          break
      }
    },
    // 获取上传资源
    _getUploadFileList(files) {
      if (!files.length) {
        return
      }

      const response = files[0].response
      if (!response || response.status !== 200) {
        return
      }

      if (response.data[0].type === 0) {
        this.form.category_pic = response.data[0].url
      }
    },
    // 获取选择资源
    _getStorageFileList(files) {
      if (!files.length) {
        return
      }

      for (const value of files) {
        if (value.type === 0) {
          this.form.category_pic = value.url
          break
        }
      }
    },
    // 重置表单
    resetForm() {
      this.form = {
        parent_id: 0,
        name: '',
        name_phonetic: '',
        alias: '',
        alias_phonetic: '',
        category_pic: '',
        category_ico: '',
        keywords: '',
        description: '',
        category_type: 0,
        sort: 50,
        is_navi: 0,
        status: 1
      }
    },
    // 重置元素
    resetElements(val = 'create') {
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })

      this.formStatus = val
      this.formLoading = false
    },
    // 过滤分类
    filterNode(value, data) {
      if (!value) { return true }
      return data.name.indexOf(value) !== -1
    },
    // 批量设置状态
    setStatusList(val) {
      this.enable(this.$refs.tree.getCheckedKeys(), val)
    },
    // 快捷设置状态
    setStatusItem(key, val) {
      this.enable([key], val ? 0 : 1)
    },
    // 启用或禁用
    enable(key, val) {
      if (!key || !key.length) {
        this.$message.error('请选择要操作的数据')
        return
      }

      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          setGoodsCategoryStatus(key, val)
            .then(() => {
              this.expanded = [...key]
              this.$emit('refresh')
              this.$message.success('操作成功')
            })
        })
        .catch(() => {
        })
    },
    // 批量删除
    removeList() {
      this.remove(this.$refs.tree.getCheckedKeys())
    },
    // 删除分类
    remove(key) {
      if (!key || !key.length) {
        this.$message.error('请选择要操作的数据')
        return
      }

      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          delGoodsCategoryList(key)
            .then(() => {
              key.forEach(value => {
                this.$refs.tree.remove(value)
              })

              this.$refs.tree.setCheckedKeys([])
              this.handleCreate('create')
              this.$message.success('操作成功')
            })
        })
        .catch(() => {
        })
    },
    // 刷新
    refresh() {
      this.expanded = []
      this.$emit('refresh')
    },
    // 新增分类表单初始化
    handleCreate(status) {
      this.form = {
        goods_category_id: 0,
        name: '',
        phonetic: '',
        description: '',
        logo: '',
        url: '',
        target: '_blank',
        sort: 50,
        status: 1
      }
      this.$nextTick(() => {
        if (this.$refs.form) {
          this.$refs.form.clearValidate()
        }
        this.dialogStatus = 'create'
        this.dialogLoading = false
        this.dialogFormVisible = true
      })
      this.resetForm()
      this.resetElements(status)

      if (this.$refs.tree.getCurrentKey()) {
        this.$refs.tree.setCurrentKey(null)
      }
    },
    // 弹出编辑对话框
    handleModify(index) {
      this.currentIndex = index
      this.form = { ...this.currentTableData[index] }

      this.$nextTick(() => {
        if (this.$refs.form) {
          this.$refs.form.clearValidate()
        }

        this.dialogStatus = 'update'
        this.dialogLoading = false
        this.dialogFormVisible = true
      })
    },
    // 新增分类
    create() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.formLoading = true
          addGoodsCategoryItem({ ...this.form })
            .then(res => {
              this.expanded = [res.data.parent_id || res.data.goods_category_id]
              this.$emit('refresh')
              this.$message.success('操作成功')
            })
            .catch(() => {
              this.formLoading = false
            })
        }
      })
    },
    // 追加分类
    handleAppend(key) {
      this.handleCreate('create')
      this.$refs.tree.setCurrentKey(key)
      this.form.parent_id = key
    },

    // 点击树节点事件
    handleNodeClick(data) {
      if (!this.auth.add && !this.auth.set) {
        return
      }

      this.resetForm()
      this.resetElements('update')
      this.form = { ...data }
    },
    // 编辑
    update() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.formLoading = true
          setGoodsCategoryItem({ ...this.form })
            .then(res => {
              this.expanded = [res.data.parent_id || res.data.goods_category_id]
              this.$emit('refresh')
              this.$message.success('操作成功')
            })
            .catch(() => {
              this.formLoading = false
            })
        }
      })
    },
    // 判断节点是否可移动
    allowDrag() {
      return this.auth.move
    },
    /**
     * 拖拽成功后操作
     * @param draggingNode  被拖拽节点对应的 Node
     * @param dropNode      结束拖拽时最后进入的节点
     * @param dropType      被拖拽节点的放置位置（before、after、inner）
     * @param ev            event
     */
    handleDrop(draggingNode, dropNode, dropType, ev) {
      // 获取原始数据
      let setCat = {
        goods_category_id: draggingNode.data.goods_category_id,
        parent_id: draggingNode.data.parent_id
      }

      // 待排序编号
      let indexCat = []

      // 处理插入到其他分类中
      if (dropType === 'inner') {
        setCat.parent_id = dropNode.key
      } else {
        setCat.parent_id = dropNode.data.parent_id
        dropNode.parent.childNodes.forEach((value, index) => {
          indexCat.push(value.key)
          value.data.sort = index + 1
        })
      }

      setGoodsCategoryItem({ ...setCat })
        .then(res => {
          draggingNode.data.parent_id = res.data.parent_id
        })
        .catch(() => {
          this.$emit('refresh')
        })

      if (indexCat.length > 0) {
        setGoodsCategoryIndex(indexCat)
          .catch(() => {
            this.$emit('refresh')
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .tree-scroll {
    max-height: 640px;
    overflow: auto;
    padding-bottom: 1px;
  }
 .el-tree-node{
      padding-top: 8px;
      padding-bottom: 8px;
      border: 1px solid #ededed;
 }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .brother-showing i {
    width: 16px;
  }
  .active {
    display: block;
  }
  .action:hover .active {
    display: block;
  }
  .move-tree {
    color: $color-text-placehoder;
    cursor: move;
  }
  .status-tree {
    color: $color-text-placehoder;
    text-decoration: line-through;
  }
  .box-card {
    border-radius: 0;
    border: 1px solid $color-border-1;
  }
  .popover-image {
    text-align: center;
    line-height: 0;
  }
  .popover-image >>> img {
    vertical-align: middle;
    cursor: pointer;
  }
  .el-image >>> .el-image__error {
    line-height: 1.4;
  }
</style>

<style lang="scss">
  .aw-p .el-tree-node{
    padding-top:10px;
    padding-bottom:10px;
    border:1px solid #ededed
  }
</style>
