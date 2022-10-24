<template>
  <div class="app-layout-wrapper">

    <div class="layout-left-wrapper">左侧菜单</div>

    <div class="layout-right-wrapper">
      右侧内容
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
.app-layout-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>