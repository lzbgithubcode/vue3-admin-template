<template>
  <div class="nav-bar-wrapper">
    <div class="nav-bar-left">
      <!-- 折叠按钮 -->
      <Hamburger class="bar-hamburger hover-bg" />
      <!--全屏 -->
      <ScreenFullButton v-if="!isMobile" class="bar-full-screen hover-bg" />
      <!-- 面包屑 -->
      <Breadcrumb v-if="!isMobile && isShowBreadcrumb" class="bar-breadcrumb" />
    </div>
    <div class="nav-bar-right">
      <el-dropdown trigger="hover">
        <div class="right-menu avatar-wrapper">
          <img :src="avatar" class="user-avatar" />
          <span class="user-name">{{ userName }}</span>
          <i-ep-ArrowDown class="user-arrow-down" />
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>控制台</el-dropdown-item>
            </router-link>
            <a target="_blank" href="https://github.com/lzbgithubcode/vue3-admin-template">
              <el-dropdown-item>Github</el-dropdown-item>
            </a>

            <el-dropdown-item divided @click="loginOut"> 退出 </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- 设置按钮  -->
      <div class="setting-icon" @click="openSettingPanel">
        <i-ep-setting />
      </div>
    </div>
  </div>
</template>

<script setup>
import Breadcrumb from './Breadcrumb.vue';
import Hamburger from './Hamburger.vue';
import ScreenFullButton from './ScreenFullButton.vue';
import { useNav } from '../../hooks/useNav.js';
import { useAppStore } from '../../../store/modules/app';
import { computed } from 'vue';

const { isMobile, userName, avatar, loginOut, openSettingPanel } = useNav();
const useApp = useAppStore();
const isShowBreadcrumb = computed(() => useApp.settings.showBreadcrumb);
</script>
<style scoped lang="scss">
.nav-bar-wrapper {
  display: flex;
  align-items: center;
  height: $navigatorOperationBarHeight;
  line-height: $navigatorOperationBarHeight;
  border-bottom: 1px solid $borderSeparateColor;
  background: white;

  .nav-bar-left {
    display: flex;
    flex: 1;
    cursor: pointer;

    .hover-bg {
      transition: background 0.2s;
    }

    .hover-bg:hover {
      background: rgb(0 0 0 / 2.5%);
    }

    // 面包屑
    .bar-breadcrumb {
      margin-left: 15px;
    }
  }

  .nav-bar-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 3;
    padding-right: 15px;

    .avatar-wrapper {
      .user-avatar {
        width: 40px;
        height: 40px;
        border: 1px solid $borderSeparateColor;
        border-radius: 50%;
        box-sizing: border-box;
      }

      .user-name {
        margin-left: 10px;
      }

      .user-arrow-down {
        margin-left: 5px;
      }
    }

    .right-menu {
      display: flex;
      align-items: center;
      cursor: pointer;
      padding-right: 15px;
    }

    .setting-icon {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      height: $navigatorOperationBarHeight;
      width: 30px;
      &:hover {
        background-color: #f2f2f2;
      }
    }
  }
}
</style>
