<template>
  <div class="app-layout-wrapper" :class="setting.classObj">
    <!--覆盖面板-->
    <div v-if="setting.showMobileBg" class="mobile-open-side-bar-bg" @click="onClickCloseSideBar" />

    <!-- 左侧菜单 -->
    <SideBar class="layout-side-bar" />

    <!-- 右侧内容 -->
    <div class="layout-right-wrapper" :class="{ 'layout-right-fixed': setting.fixedHeader }">
      <div :class="{ 'fixed-header': setting.fixedHeader }" class="header">
        <NavBar />
        <TagsBar v-if="setting.showTagsBar" />
      </div>
      <AppMain :class="{ 'app-main-fixed': setting.fixedHeader }" />
      <Footer :class="{ 'fixed-footer': setting.fixedHeader }" />
    </div>

    <!-- 系统设置 -->
    <Settings />
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue';
import { AppMain, NavBar, Footer, SideBar, Settings, TagsBar } from './components/index.js';
import { useAppStore } from '@/store/modules/app.js';
import { useResizeDevice } from '../hooks/core/useResizeDevice.js';

useResizeDevice();
const useApp = useAppStore();
const setting = reactive({
  fixedHeader: computed(() => useApp.settings.fixedHeader),
  showTagsBar: computed(() => useApp.settings.showTagsView),
  showMobileBg: computed(() => useApp.device == 'mobile' && useApp.sidebar.opened),
  classObj: computed(() => {
    return {
      hideSidebar: !useApp.sidebar.opened,
      openSidebar: useApp.sidebar.opened,
      mobile: useApp.device === 'mobile'
    };
  })
});

// =======================================methods =======================================//

/**
 * 点击关闭菜单
 */
const onClickCloseSideBar = () => {
  useApp.closeSideBar();
};
</script>

<style lang="scss">
@import '../styles/layout.scss';
</style>
