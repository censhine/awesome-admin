<template>
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

        <el-col :span="12">
          <el-form-item
            label="首拼"
            prop="phonetic">
            <el-input
              v-model="form.phonetic"
              placeholder="不填写系统将自动识别"
              :clearable="true"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item
        label="所属分类"
        prop="goods_category_id">
        <el-cascader
          v-model="form.goods_category_id"
          placeholder="可选择品牌所属的分类 试试搜索：手机"
          :options="catData"
          :props="catProps"
          style="width: 100%;"
          filterable
          clearable>
        </el-cascader>
      </el-form-item>

      <el-form-item
        label="描述"
        prop="description">
        <el-input
          v-model="form.description"
          placeholder="可输入品牌描述"
          :clearable="true"/>
      </el-form-item>

      <el-form-item
        label="Logo"
        prop="logo">
        <el-input
          v-model="form.logo"
          placeholder="可输入品牌Logo"
          :clearable="true">
          <template slot="prepend">
            <el-popover
              v-if="form.logo"
              width="150"
              placement="top"
              trigger="hover">
              <div class="popover-image">
                <el-image
                  :src="form.logo | getPreviewUrl"
                  @click.native="$preview(form.logo)"
                  fit="fill"/>
              </div>
              <i slot="reference" class="el-icon-picture"/>
            </el-popover>
          </template>

          <el-dropdown
            slot="append"
            :show-timeout="50"
            @command="handleCommand">
            <el-button icon="el-icon-upload"/>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="storage" icon="el-icon-finished">资源选择</el-dropdown-item>
              <el-dropdown-item command="upload" icon="el-icon-upload2">上传资源</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-input>
      </el-form-item>

      <el-form-item
        label="链接"
        prop="url">
        <el-input
          v-model="form.url"
          placeholder="可输入品牌链接地址"
          :clearable="true"/>
      </el-form-item>

      <el-form-item
        label="打开方式"
        prop="target">
        <el-radio-group v-model="form.target">
          <el-radio label="_self">当前窗口</el-radio>
          <el-radio label="_blank">新窗口</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="排序值"
        prop="sort">
        <el-input-number
          v-model="form.sort"
          controls-position="right"
          :min="0"
          :max="255"
          style="width: 120px;"/>
      </el-form-item>

      <el-form-item
        label="状态"
        prop="status">
        <el-switch
          v-model="form.status"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
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
</template>

<script>
    export default {
      components: {
        'csUpload': () => import('@/components/aw-upload'),
        'csStorage': () => import('@/components/aw-storage'),
       },
      data() {
          return {
            formData: {},
            data: ()=>{return []},
            value: [],
            filterMethod(query, item) {
              return item.label.indexOf(query) > -1;
            },
            showVerify: false,
            currentTableData: [],
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
                text: '待审核',
                type: 'danger'
              },
              1: {
                text: '通过',
                type: 'success'
              },
              2: {
                text: '不通过',
                type: 'info'
              }
            },
            dialogLoading: false,
            dialogFormVisible: false,
            dialogStatus: '',
            textMap: {
              update: '编辑品牌',
              create: '新增品牌',
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
              goods_category_id: undefined,
              name: undefined,
              phonetic: undefined,
              description: undefined,
              logo: undefined,
              url: undefined,
              target: undefined,
              sort: undefined,
              status: undefined
            },
            rules: {
              name: [
                {
                  required: true,
                  message: '名称不能为空',
                  trigger: 'blur'
                },
                {
                  max: 50,
                  message: '长度不能大于 50 个字符',
                  trigger: 'blur'
                }
              ],
              phonetic: [
                {
                  max: 10,
                  message: '长度不能大于 10 个字符',
                  trigger: 'blur'
                }
              ],
              description: [
                {
                  max: 100,
                  message: '长度不能大于 100 个字符',
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
              url: [
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
        }
    }
</script>

<style scoped>

</style>
