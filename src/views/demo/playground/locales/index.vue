<template>
  <aw-container>
    <p class="aw-mt-0">
      <el-radio-group v-model="$i18n.locale">
        <el-radio-button
          v-for="language in $languages"
          :key="language.value"
          :label="language.value">
          {{ language.label }}
        </el-radio-button>
      </el-radio-group>
    </p>
    <el-alert
      :title="$t('page.demo.playground.locales.text')"
      type="success">
    </el-alert>
    <aw-link-btn
      slot="footer"
      title="文档"
      link="https://d2.pub/zh/doc/aw-admin/locales"/>
  </aw-container>
</template>
