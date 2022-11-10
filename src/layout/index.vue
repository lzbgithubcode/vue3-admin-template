<template>
  <div class="app-layout-wrapper" :class="classObj">

    <!--覆盖面板-->
    <div v-if="showMobileBg" class="mobile-open-side-bar-bg" @click="onClickCloseSideBar"></div>

    <!-- 左侧菜单 -->
    <SideBar class="layout-side-bar"></SideBar>

    <!-- 右侧内容 -->
    <div class="layout-right-wrapper">
      <div :class="{ 'fixed-header': fixedHeader }">
        <NavBar />
      </div>
      <AppMain></AppMain>
      <Footer></Footer>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { AppMain, NavBar, Footer, SideBar } from './components/index.js';
import { useAppStore } from '@/store/modules/app.js';
import { useResizeDevice } from '../hooks/core/useResizeDevice.js';

useResizeDevice();
const useApp = useAppStore();
const fixedHeader = computed(() => useApp.settings.fixedHeader);
const showMobileBg = computed(() => useApp.device == 'mobile' && useApp.sidebar.opened);
const classObj = computed(() => {
  return {
    hideSidebar: !useApp.sidebar.opened,
    openSidebar: useApp.sidebar.opened,
    mobile: useApp.device === 'mobile',
  };
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
@import '../assets/scss/layout.scss';
</style>



