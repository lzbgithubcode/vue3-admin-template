<template>
  <div :class="{'has-log': showLog}">
    <!-- logo -->
    <Logo v-if="showLogo" :collapse="isCollapse" />
    <!-- 菜单 -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu" :collapse="isCollapse" :background-color="variables.menuBg"
        :text-color="variables.menuText" :unique-opened="false" :active-text-color="variables.menuActiveText"
        :collapse-transition="false" @select="selectedMenu" mode="vertical">
        <SideBarItem v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import Logo from './Logo.vue';
import SideBarItem from './SideBarItem.vue';
import variablesObj from '@/assets/scss/extend-to-js.scss';
import { useAppStore } from '@/store/modules/app.js';
import { usePermissionStore } from '@/store/modules/permission.js';
import { useRoute } from 'vue-router';
import { ExternalLinkRouterWhiteList } from '@/utils/constants/EnumConstants';

const appStore = useAppStore();
const permissionStore = usePermissionStore();
const route = useRoute();

const variables = computed(() => variablesObj);
const settings = computed(() => appStore.settings);
const showLogo = computed(() => settings.sidebarLogo);
const isCollapse = computed(() => appStore.sidebar.opened);
const permissionRoutes = computed(() => {
  return permissionStore.routes;
});
const activeMenu = computed(() => {
  const { meta, path } = route;
  // 激活的菜单
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});

// =====================================定义方法====================================
/**
 * 菜单选择
 */
const selectedMenu = (path) => {
  const constantsList = ExternalLinkRouterWhiteList;
  if (constantsList.indexOf(path) !== -1) {
    const routeUrl = this.$router.resolve({
      path,
    });
    window.open(routeUrl.href, '_blank');
  }
};
</script>
<style scoped lang='scss'>
</style>