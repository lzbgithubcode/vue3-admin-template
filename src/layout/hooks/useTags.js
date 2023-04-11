import { computed, ref, getCurrentInstance, reactive } from 'vue';
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
  const contextPaneLeft = ref(0);
  const contextPaneTop = ref(0);
  const visible = ref(false);
  const rightPaneMenuList = reactive([
    {
      icon: '',
      text: '重新加载',
      show: true
    },
    {
      icon: '',
      text: '关闭当前标签',
      show: true
    },
    {
      icon: '',
      text: '关闭其他标签',
      show: true
    },
    {
      icon: '',
      text: '关闭所有标签',
      show: true
    }
  ]);
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
   * @description: 获取右键菜单的样式
   * @param {*} computed
   * @return {*}
   */
  const getContextPaneStyle = computed(() => {
    return { left: contextPaneLeft.value + 'px', top: contextPaneTop.value + 'px' };
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

  /**
   * @description:显示 所有菜单
   * @return {*}
   */
  const showAllPaneMenu = () => {
    rightPaneMenuList.map((item) => {
      item.show = true;
    });
  };

  /**
   * @description:显示 所有菜单
   * @return {*}
   */
  const showRefreshPaneMenu = () => {
    rightPaneMenuList.map((item) => {
      item.show = false;
    });
    // 显示刷新
    rightPaneMenuList[0].show = true;
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
    contextPaneLeft,
    visible,
    getContextPaneStyle,
    rightPaneMenuList,
    showRefreshPaneMenu,
    showAllPaneMenu,
    resetHoverIndex,
    isActiveRoute,
    onMouseEnter,
    onMouseLeave
  };
};
