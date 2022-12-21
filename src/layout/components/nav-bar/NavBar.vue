<template>
  <div class="nav-bar-wrapper">
    <div class="nav-bar-left">
      <!-- 折叠按钮 -->
      <Hamburger class="bar-hamburger hover-bg" />
      <!--全屏 -->
      <ScreenFullButton v-if="!isMobile" class="bar-full-screen hover-bg" />
      <!-- 面包屑 -->
      <Breadcrumb v-if="!isMobile" class="bar-breadcrumb" />
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
    </div>
  </div>
</template>

<script setup>
import Breadcrumb from './Breadcrumb.vue'
import Hamburger from './Hamburger.vue'
import ScreenFullButton from './ScreenFullButton.vue'
import { useUserStore } from '../../../store/modules/user.js'
import { useAppStore } from '../../../store/modules/app.js'
import { logout } from '../../../utils/user/UserUtils.js'
import { computed } from 'vue'

const useUser = useUserStore()
const useApp = useAppStore()
const userName = computed(() => {
  return useUser.userData.userName
})
const avatar = computed(() => {
  return useUser.userData.avatar
})

const isMobile = computed(() => useApp.device == 'mobile')

const loginOut = () => {
  logout().then(() => {})
}
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
  }
}
</style>
