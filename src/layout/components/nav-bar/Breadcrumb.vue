<template>
  <el-breadcrumb class="breadcrumb-wrapper" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { BaseRoute } from '@/utils/constants/RoutePathConstants';
import { useRoute, useRouter } from 'vue-router';
import {isEmptyObject} from "@/utils/helper/ObjectHelper.js";
import pathToRegexp from "path-to-regexp";

// 路由级别
const levelList = ref(null);

const route = useRoute();
const router = useRouter();

// 定义方法
const isFixedPathRoute = (route) => {
        const name = route && route.name;
        if (!name) {
            return false;
        }
        return name.trim().toLocaleLowerCase() === "home".toLocaleLowerCase();
  },

const getBreadcrumb = () => {
  const matched = route.matched.filter((item) => item.meta && item.meta.title);
  const first = matched[0];
   if (!isFixedPathRoute(first)) {
        const fixRoute = {
            path: BaseRoute.FIX_PATH,
            meta: { title: "控制台" }
        };
        const routes = [];
        routes.push(fixRoute);
        matched = routes.concat(matched);
    }
    levelList.value = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false);

    // 更改你标题
    if (levelList.value && levelList.value.length > 0) {
        levelList.value.map(item => {
            if (item.path == route.path && route.query.targetTitle && route.query.targetTitle.length > 0) {
               item.meta.title = route.query.targetTitle;
            }
        });
    }
};


const pathCompile =(path)=>{
     const { params } = route;
      if (!isEmptyObject(params)) {
          const toPath = pathToRegexp.compile(path)(params);
          return toPath;
      } else {
          return path;
      }
}

const handleLink = (item) => {
        const { redirect, path } = item;
        if (redirect) {
            router.push(redirect);
            return;
        }
        router.push(pathCompile(path));
    }
</script>
<style scoped lang="scss">
.breadcrumb-wrapper {
  display: inline-block;
  font-size: 14px;
  margin-left: 8px;
  line-height: $navigatorLogoBarHeight;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
