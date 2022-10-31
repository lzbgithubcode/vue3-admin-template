<template>
  <div class="nav-bar-wrapper">
    <div class="nav-bar-left">
      <!-- 折叠按钮 -->
      <Hamburger class="bar-hamburger" />
      <!-- 面包屑 -->
      <Breadcrumb />
      <!--全屏 -->
      <ScreenFullButton />

    </div>
    <div class="nav-bar-right">

    </div>
  </div>
</template>

<script setup>
import Breadcrumb from './Breadcrumb.vue';
import Hamburger from './Hamburger.vue';
import ScreenFullButton from './ScreenFullButton.vue';
</script>
<style scoped lang='scss'>
.nav-bar-wrapper {
  display: flex;
  align-items: center;
  height: $navigatorOperationBarHeight;
  line-height: $navigatorOperationBarHeight;
  .nav-bar-left {
    flex: 1;
    display: flex;
    cursor: pointer;
  }
  .nav-bar-right {
    flex: 3;
  }
}
</style>