import { computed, ref } from 'vue';
import { useAppStore } from '@/store/modules/app.js';
import { useTagsViewStore } from '../../store/modules/tagsView';
import { useRoute, useRouter } from 'vue-router';
import { resolve } from 'path';
import { usePermissionStore } from '../../store/modules/permission';

export const useTags = () => {
  const useApp = useAppStore();
  const useTagsView = useTagsViewStore();
  const usePermission = usePermissionStore();
  const $route = useRoute();
  const router = useRouter();
  const allRoutes = usePermission.permissionAllRoutes;
  // 是否显示tag
  const showTags = computed(() => {
    return useApp.settings.showTagsView;
  });
  // 保存的标签
  const visitedViews = computed(() => {
    return useTagsView.visitedViews;
  });

  /**
   *  过滤固定路由
   * @param {*} routes
   * @param {*} basePath
   */
  const filterAffixTags = (routes, basePath = '/') => {
    let tags = [];
    if (!routes || routes.length == 0) return tags;

    for (let i = 0, len = routes.length; i < len; i++) {
      const route = routes[i];
      if (route.meta && route.meta?.affix) {
        const tagPath = resolve(basePath, route.path);
        tags.push({
          name: route.name,
          fullPath: tagPath,
          path: tagPath,
          meta: route.meta
        });
      }
      if (route.children) {
        const tempTags = filterAffixTags(route.children, route.path);
        if (tempTags.length >= 1) {
          tags = [...tags, ...tempTags];
        }
      }
    }
    return tags;
  };

  /**
   * 动态增加tagView
   */
  const dynamicAddTagView = (route) => {
    route.name && useTagsView.addVisitedView(route);
  };
  return {
    showTags,
    visitedViews,
    $route,
    router,
    allRoutes,
    filterAffixTags,
    dynamicAddTagView
  };
};
