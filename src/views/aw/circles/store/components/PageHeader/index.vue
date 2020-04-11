<template>
  <el-form
    :inline="true"
    :model="form"
    ref="form"
    size="mini"
    style="margin-bottom: -18px;">

    <el-form-item label="" prop="store_owner">
      <el-input
        prefix-icon="el-icon-search"
        clearable
        placeholder="请输入群主名称"
        v-model="form.store_owner"/>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        icon="el-icon-search"
        :disabled="loading"
        @click="handleFormSubmit(true)">查询</el-button>
    </el-form-item>

    <el-form-item>
      <el-button
        icon="el-icon-refresh"
        @click="handleFormReset">刷新</el-button>
    </el-form-item>

  </el-form>
</template>

<script>

export default {
  props: {
    loading: {
      default: false
    },
    catData: {
      default: () => []
    }
  },
  components: {
  },
  data() {
    return {
      propsOptions: { checkStrictly: true },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: '',
      formData: {},
      form: {
        name: undefined,
        address: undefined,
        submitDate: undefined
      },
      catProps: {
        value: 'goods_category_id',
        label: 'name',
        children: 'children',
        checkStrictly: true,
        emitPath: false
      }
    }
  },
  methods: {
    // 弹出新建对话框
    handleCreate() {
      this.form = {
        store_owner: '',
        title: '',
        link: '',
        logo: '',
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
    //添加
    handleAdd(index) {
      this.$nextTick(() => {
        this.dialogStatus = 'add'
        this.dialogLoading = false
        this.formData = this.form
        this.$refs.addDialog.isShowDia(index, true)
      })
    },
    // 请求添加
    create() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.dialogLoading = true
          Promise.all([

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
    handleFormSubmit(isRestore = false) {
      this.$emit('submit', this.form, isRestore)
    },
    _getAddress(addr){
      this.form.address = addr
    },
    handleFormReset() {
      this.$refs.form.resetFields()
    }
  }
}
</script>
