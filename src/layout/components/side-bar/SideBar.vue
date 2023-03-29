<template>
  <div :class="{ 'has-logo': showLogo }">
    <!-- logo -->
    <Logo v-if="showLogo" :collapse="isCollapse" />

    <!-- 菜单 -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="scssJson.menuBg"
        :text-color="scssJson.menuTextColor"
        :unique-opened="false"
        :active-text-color="scssJson.menuActiveTextColor"
        :collapse-transition="false"
        mode="vertical"
        @select="selectedMenu"
      >
        <SideBarItem
          v-for="route in permissionRoutes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import Logo from './Logo.vue';
import SideBarItem from './SideBarItem.vue';
import variablesObj from '@/styles/extend-to-js.scss';
import { useAppStore } from '@/store/modules/app.js';
import { usePermissionStore } from '@/store/modules/permission.js';
import { useRoute, useRouter } from 'vue-router';
import { ExternalLinkRouterWhiteList } from '@/utils/constants/EnumConstants';
import { isExternalURL } from '../../../utils/helper/ValidateHelper';

const appStore = useAppStore();
const permissionStore = usePermissionStore();
const route = useRoute();
const router = useRouter();

const settings = computed(() => appStore.settings);

const showLogo = computed(() => settings.value.sidebarLogo);
const isCollapse = computed(() => !appStore.sidebar.opened);
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
  if (isExternalURL(path)) {
    return false;
  }

  const constantsList = ExternalLinkRouterWhiteList;
  if (constantsList.indexOf(path) !== -1) {
    const routeUrl = router.resolve({
      path
    });
    window.open(routeUrl.href, '_blank');
  }
};

/**
 * scss -> json
 */
const scssToJson = (scssExportJson) => {
  const jsonString = scssExportJson.replace(/:export\s*/, '').replace(/[\s+\r\n]/g, '');
  const scssJson = {};
  jsonString
    .slice(1, jsonString.length - 2)
    .split(';')
    .forEach((fItem) => {
      const arr = fItem.split(':');
      scssJson[arr[0]] = arr[1];
    });
  return scssJson;
};

const scssJson = scssToJson(variablesObj);
console.log('=======scssJson=====', scssJson);
</script>
<style scoped lang="scss"></style>
