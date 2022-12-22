<template>
  <RightPanel>
    <div class="p-settings-wrapper">
      <div class="c-row-item">
        <span>是否固定头部</span>
        <el-switch v-model="setting.fixedHeader" class="c-row-item-switch" />
      </div>

      <div class="c-row-item">
        <span>是否显示LOGO</span>
        <el-switch v-model="setting.showSidebarLogo" class="c-row-item-switch" />
      </div>

      <div class="c-row-item">
        <span>是否显示面包屑</span>
        <el-switch v-model="setting.showBreadcrumb" class="c-row-item-switch" />
      </div>

      <div class="c-row-item">
        <span>是否显示标签栏</span>
        <el-switch v-model="setting.showTagsView" class="c-row-item-switch" />
      </div>
    </div>
  </RightPanel>
</template>

<script setup>
import { computed, reactive } from 'vue'
import RightPanel from '../../../components/right-panel/index.vue'
import { useAppStore } from '../../../store/modules/app'
const useApp = useAppStore()
const setting = reactive({
  fixedHeader: computed({
    get: () => useApp.settings.fixedHeader,
    set: (val) => {
      useApp.actionChangeSettings({ fixedHeader: val })
    }
  }),
  showSidebarLogo: computed({
    get: () => useApp.settings.showSidebarLogo,
    set: (val) => {
      useApp.actionChangeSettings({ showSidebarLogo: val })
    }
  }),
  showBreadcrumb: computed({
    get: () => useApp.settings.showBreadcrumb,
    set: (val) => {
      useApp.actionChangeSettings({ showBreadcrumb: val })
    }
  }),
  showTagsView: computed({
    get: () => useApp.settings.showTagsView,
    set: (val) => {
      useApp.actionChangeSettings({ showTagsView: val })
    }
  })
})
</script>
<style scoped lang="scss">
.p-settings-wrapper {
  .c-row-item {
    display: flex;
    align-items: center;
    font-size: 14px;
    justify-content: space-between;
    margin-bottom: 30px;
    .c-row-item-switch {
      float: right;
    }
  }
}
</style>
