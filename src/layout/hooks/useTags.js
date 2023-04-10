import { computed, ref, getCurrentInstance } from 'vue';
import { useAppStore } from '@/store/modules/app.js';
import { useTagsViewStore } from '../../store/modules/tagsView';
import { useRoute, useRouter } from 'vue-router';

import { usePermissionStore } from '../../store/modules/permission';
import { hasClass, toggleClass } from '../../utils/helper/DomHelper.js';
import { isAffix } from '../utils/TagHelper.js';

export const useTags = () => {
  const useApp = useAppStore();
  const useTagsView = useTagsViewStore();
  const usePermission = usePermissionStore();
  const instance = getCurrentInstance();
  const $route = useRoute();
  const router = useRouter();
  const allRoutes = usePermission.permissionAllRoutes;
  const hoverIndex = ref(-1);
  // 是否显示tag
  const showTags = computed(() => {
    return useApp.settings.showTagsView;
  });
  // 保存的标签
  const visitedViews = computed(() => {
    return useTagsView.visitedViews;
  });
  // 标签是否活跃
  const linkIsActiveClass = computed(() => {
    return (tag) => {
      return isActiveRoute(tag) ? 'is-active' : '';
    };
  });
  // 是否是固定的class
  const isAffixClass = computed(() => {
    return (tag) => {
      return isAffix(tag) ? 'affix-tag' : '';
    };
  });

  // 下划线是否活跃
  const scheduleIsActiveClass = computed(() => {
    return (tag) => {
      return isActiveRoute(tag) ? 'schedule-active' : '';
    };
  });

  // close 是否是活跃
  const closeIsActive = computed(() => {
    return (tag, index) => {
      if (isAffix(tag)) return false;
      return isActiveRoute(tag) || index === hoverIndex.value;
    };
  });

  /**
   * @description: 监听鼠标进入标签
   * @param {*} index
   * @return {*}
   */
  const onMouseEnter = (index) => {
    hoverIndex.value = index;
    const scheduleNode = instance.refs['schedule' + index][0];
    if (hasClass(scheduleNode, 'schedule-active')) return;
    toggleClass(scheduleNode, 'schedule-out', true);
    toggleClass(scheduleNode, 'schedule-in', false);
  };

  /**
   * @description: 监听鼠标进入标签
   * @param {*} index
   * @return {*}
   */
  const onMouseLeave = (index) => {
    hoverIndex.value = -1;
    const scheduleNode = instance.refs['schedule' + index][0];
    if (hasClass(scheduleNode, 'schedule-active')) return;
    toggleClass(scheduleNode, 'schedule-out', false);
    toggleClass(scheduleNode, 'schedule-in', true);
  };

  /**
   * @description: 重置hoverIndex的值
   * @param {*} index
   * @return {*}
   */
  const resetHoverIndex = (index = -1) => {
    hoverIndex.value = index;
  };

  /**
   * @description: 是否是当前活跃的路由
   * @return {*}
   */
  const isActiveRoute = (tag) => {
    return $route.path === tag.path;
  };

  return {
    showTags,
    visitedViews,
    $route,
    router,
    allRoutes,
    hoverIndex,
    linkIsActiveClass,
    scheduleIsActiveClass,
    isAffixClass,
    closeIsActive,
    resetHoverIndex,
    isActiveRoute,
    onMouseEnter,
    onMouseLeave
  };
};
