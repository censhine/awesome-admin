<template>
  <div class="cs-p">

    <el-table
      :data="currentTableData"
      style="width: 100%;margin-bottom: 20px;"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">

      <el-table-column
        prop="name"
        label="名称"
        width="180"></el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="180"></el-table-column>
      <el-table-column
        prop="sort"
        label="排序"></el-table-column>
      <el-table-column
        prop="path"
        label="路径"></el-table-column>


      <el-table-column
        label="操作"
        align="center"
        fixed="right"
        min-width="140">
        <template slot-scope="scope">

          <el-button
            @click="handleView(scope.$index)"
            size="mini"
            type="text">查看</el-button>
          <el-button
            @click="handleEdit(scope.$index)"
            size="mini"
            type="text">编辑</el-button>
          <el-button
            @click="handleDelete(scope.$index)"
            size="mini"
            type="text">删除</el-button>

        </template>
      </el-table-column>

    </el-table>


    <edit-dialog :data="formData" ref="editDialog"></edit-dialog>
    <view-dialog :data="formData" ref="viewDialog"></view-dialog>

  </div>
</template>

<script>
import {
    addBrandItem,
    delBrandList,
    setBrandItem,
    setBrandSort,
    setBrandStatus
  } from '@/api/goods/brand'
import util from '@/utils/util'
import { getGoodsCategoryItem } from '@/api/goods/category'
import {delCircleList} from '@/api/mock.data'

export default {
  components: {
    'csUpload': () => import('@/components/cs-upload'),
    'csStorage': () => import('@/components/cs-storage'),
    'editDialog': ()=>import('../../edit'),
    'viewDialog':()=>import('../../view')
  },
  props: {
    loading: {
      default: false
    },
    tableData: {
      default: () => []
    },
    catData: {
      default: () => []
    }
  },
  data() {
    const generateData = _ => {
      const data = [];
      const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
      //const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          //pinyin: pinyin[index]
        });
      });
      return data;
    };
    return {
      formData: {},
      data: generateData(),
      value: [],
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1;
      },
      showVerify: false,
      currentTableData:[],
      multipleSelection: [],
      auth: {
        add: false,
        set: false,
        del: false,
        sort: false,
        url: false,
        enable: false,
        disable: false
      },
      targetMap: {
        _self: {
          text: '当前窗口',
          value: '_self'
        },
        _blank: {
          text: '新窗口',
          value: '_blank'
        }
      },
      statusMap: {
        0: {
          text: '未启用',
          type: 'danger'
        },
        1: {
          text: '启用',
          type: 'success'
        },
      },
      dialogLoading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增',
        look: '查看'
      },
      catProps: {
        value: 'goods_category_id',
        label: 'name',
        children: 'children',
        checkStrictly: true,
        emitPath: false
      },
      form: {
        title: undefined,
        logo: undefined,
        link: undefined,
        sort: undefined,
        status: undefined
      },
      rules: {
        title: [
          {
            required: true,
            message: '标题不能为空',
            trigger: 'blur'
          },
          {
            max: 50,
            message: '长度不能大于 50 个字符',
            trigger: 'blur'
          }
        ],
        logo: [
          {
            max: 512,
            message: '长度不能大于 512 个字符',
            trigger: 'blur'
          }
        ],
        link: [
          {
            max: 255,
            message: '长度不能大于 255 个字符',
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
      return val ? util.getImageCodeUrl(val, 'goods_brand') : ''
    }
  },
  watch: {
    tableData: {
      handler(val) {
        this.currentTableData = val
      },
      immediate: true
    }
  },
  mounted() {
    this._validationAuth()
  },
  methods: {
    // 验证权限
    _validationAuth() {
      this.auth.add = this.$permission('/zis/user/list/add')
      this.auth.set = this.$permission('/zis/user/list/set')
      this.auth.del = this.$permission('/zis/user/list/del')
      this.auth.sort = this.$permission('/zis/user/list/sort')
      this.auth.url = this.$permission('/zis/user/list/url')
      this.auth.enable = this.$permission('/zis/user/list/enable')
      this.auth.disable = this.$permission('/zis/user/list/disable')
    },
    // 获取列表中的编号
    _getIdList(val) {
      if (val === null) {
        val = this.multipleSelection
      }

      let idList = []
      if (Array.isArray(val)) {
        val.forEach(value => {
          idList.push(value.brand_id)
        })
      } else {
        idList.push(this.currentTableData[val].brand_id)
      }

      return idList
    },
    // handleStatus(command){
    //   this.$message.success('启用成功')
    // },
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
        this.form.logo = response.data[0].url
      }
    },
    // 获取选择资源
    _getStorageFileList(files) {
      if (!files.length) {
        return
      }

      for (const value of files) {
        if (value.type === 0) {
          this.form.logo = value.url
          break
        }
      }
    },
    // 选中数据项
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 获取排序字段
    sortChange({ column, prop, order }) {
      let sort = {
        order_type: undefined,
        order_field: undefined
      }

      if (column && order) {
        sort.order_type = order === 'ascending' ? 'asc' : 'desc'
        sort.order_field = prop
      }

      this.$emit('sort', sort)
    },
    // 弹出新建对话框
    handleCreate() {
      this.form = {
        title: '',
        logo: '',
        link: '',
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
    },
    // 请求创建
    create() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.dialogLoading = true
          Promise.all([
            //addBrandItem({ ...this.form }),
            //getGoodsCategoryItem(this.form.goods_category_id)
          ])
            .then(res => {
              this.currentTableData.unshift({
                ...res[0].data,
                category_name: res[1].data ? res[1].data.name : ''
              })

              this.dialogFormVisible = false
              this.$message.success('操作成功')
            })
            .catch(() => {
              this.dialogLoading = false
            })
        }
      })
    },
    // 弹出编辑对话框
    handleUpdate(index) {
      this.currentIndex = index
      this.form = { ...this.currentTableData[index] }

      this.$nextTick(() => {
        if (this.$refs.form) {
          this.$refs.form.clearValidate()
        }

        this.dialogStatus = ''
        this.dialogLoading = false
        this.dialogFormVisible = true
      })
    },
    // 弹出审核对话框
    handleVerify(index) {
      this.currentIndex = index
      this.form = { ...this.currentTableData[index] }

      this.$nextTick(() => {
        if (this.$refs.form) {
          this.$refs.form.clearValidate()
        }
        this.dialogStatus = 'update'
        this.dialogLoading = false
        this.formData = this.form
        this.$refs.verifyDialog.isShowDia(this.formData,true)
      })
    },
    // 弹出审核对话框
    handleView(index) {
      this.currentIndex = index
      this.form = { ...this.currentTableData[index] }

      this.$nextTick(() => {
        if (this.$refs.form) {
          this.$refs.form.clearValidate()
        }
        this.dialogStatus = 'update'
        this.dialogLoading = false
        this.formData = this.form
        this.$refs.viewDialog.isShowDia(this.formData,true)
      })
    },
    // 弹出审核对话框
    handleEdit(index) {
      this.currentIndex = index
      this.form = { ...this.currentTableData[index] }

      this.$nextTick(() => {
        if (this.$refs.form) {
          this.$refs.form.clearValidate()
        }
        this.dialogStatus = 'update'
        this.dialogLoading = false
        this.formData = this.form
        this.$refs.editDialog.isShowDia(this.formData,true)
      })
    },
    // 请求编辑
    update() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.dialogLoading = true
          Promise.all([
            //setCircleItem({ ...this.form }),
            //getGoodsCategoryItem(this.form.goods_category_id)
          ])
            .then(res => {
              this.$set(
                this.currentTableData,
                this.currentIndex,
                {
                  ...this.currentTableData[this.currentIndex],
                  ...res[0].data,
                  category_name: res[1].data ? res[1].data.name : ''
                })

              this.dialogFormVisible = false
              this.$message.success('操作成功')
            })
            .catch(() => {
              this.dialogLoading = false
            })
        }
      })
    },
    handleSwitch(status,index){
        this.$message.success('账户启用状态成功')
        this.currentTableData[index].status = status > 0 ? 0 : 1
    },
    // 批量设置状态
    handleStatus(val, status = 0, confirm = false) {
      let brand_id = this._getIdList(val)
      if (brand_id.length === 0) {
        this.$message.error('请选择要操作的数据')
        return
      }

      function setStatus(brand_id, status, vm) {
        setCircleStatus(brand_id, status)
          .then(() => {
            vm.currentTableData.forEach((value, index) => {
              if (brand_id.indexOf(value.brand_id) !== -1) {
                vm.$set(vm.currentTableData, index, {
                  ...value,
                  status
                })
              }
            })

            vm.$message.success('操作成功')
          })
      }

      if (!confirm) {
        let oldData = this.currentTableData[val]
        const newStatus = oldData.status ? 0 : 1

        if (oldData.status > 1) {
          return
        }

        // 禁用权限检测
        if (newStatus === 0 && !this.auth.disable) {
          return
        }

        // 启用权限检测
        if (newStatus === 1 && !this.auth.enable) {
          return
        }

        this.$set(this.currentTableData, val, { ...oldData, status: 2 })
        setStatus(brand_id, newStatus, this)
        return
      }

      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          setStatus(brand_id, status, this)
        })
        .catch(() => {
        })
    },
    // 批量删除
    handleDelete(val) {
      let brand_id = this._getIdList(val)
      if (brand_id.length === 0) {
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
          delCircleList(brand_id)
            .then(() => {
              console.log(this.currentTableData)
              this.currentTableData.splice(val, 1)
              console.log(this.currentTableData)
              for (let i = this.currentTableData.length - 1; i >= 0; i--) {
                if (brand_id.indexOf(this.currentTableData[i].brand_id) !== -1) {
                  this.currentTableData.splice(i, 1)
                }
              }

              if (this.currentTableData.length <= 0) {
                this.$emit('refresh', true)
              }

              this.$message.success('操作成功')
            })
        })
        .catch(() => {
        })
    },
    // // 打开链接地址
    // handleView(index) {
    //   if (this.currentTableData[index].url) {
    //     this.$open(this.currentTableData[index].url)
    //     return
    //   }
    //   this.$message.warning('无效的链接地址')
    // },
    // 设置排序值
    handleSort(index) {
      setBrandSort(
        this.currentTableData[index].brand_id,
        this.currentTableData[index].sort
      )
    }
  }
}
</script>

<style scoped>
  .popover-image {
    text-align: center;
    line-height: 0;
  }
  .popover-image /deep/ img {
    vertical-align: middle;
    cursor: pointer;
  }
  .el-image /deep/ .el-image__error {
    line-height: 1.4;
  }
</style>
