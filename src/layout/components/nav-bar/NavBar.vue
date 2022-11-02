<template>
  <div class="nav-bar-wrapper">
    <div class="nav-bar-left">
      <!-- 折叠按钮 -->
      <Hamburger class="bar-hamburger hover-bg" />
      <!--全屏 -->
      <ScreenFullButton class="bar-full-screen hover-bg" />
      <!-- 面包屑 -->
      <Breadcrumb class="bar-breadcrumb" />

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
  border-bottom: 1px solid $borderSeparateColor;
  .nav-bar-left {
    flex: 1;
    display: flex;
    cursor: pointer;

    .hover-bg {
      transition: background 0.2s;
    }
    .hover-bg:hover {
      background: rgba(0, 0, 0, 0.025);
    }

    // 面包屑
    .bar-breadcrumb {
      margin-left: 15px;
    }
  }
  .nav-bar-right {
    flex: 3;
  }
}
</style>