<template>
  <div class="app-layout-wrapper">

    <div class="layout-left-wrapper">左侧菜单</div>

    <!-- 左侧菜单 -->
    <SideBar class="layout-side-bar"></SideBar>

    <div class="layout-right-wrapper">
      右侧内容
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { AppMain, NavBar, Footer, SideBar } from './components/index.js';
</script>


<style lang="scss">
.app-layout-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>



