<template>
  <div class="app-layout-wrapper">
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

const appStore = useAppStore();
const fixedHeader = computed(() => appStore.settings.fixedHeader);
console.log('=============', fixedHeader);
</script>


<style lang="scss">
@import '../assets/scss/layout.scss';
</style>



