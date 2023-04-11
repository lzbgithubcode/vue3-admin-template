import { useTagsViewStore } from '../../store/modules/tagsView';
import { useRouter } from 'vue-router';
import { BaseRoute } from '../../utils/constants/RoutePathConstants';
export const useTagsOperation = () => {
  // tag store
  const useTagsView = useTagsViewStore();

  // 定义当前的tag path 与上一个tag path
  let currentPath = '';
  let preTagPath = '';
  // 路由
  const router = useRouter();
  /**
   * @description: 动态增加tag
   * @param {*} route
   * @return {*}
   */
  const dynamicAddTagView = (route) => {
    if (route.name) {
      // 记录上一个
      preTagPath = currentPath;
      // 记录当前的
      currentPath = route.path;
      // 缓存
      useTagsView.addVisitedView(route);
      useTagsView.addPageCached(route);
    }
  };
  /**
   * @description: 动态删除tag
   * @param {*} tag
   * @return {*}
   */
  const dynamicDeleteTagView = (tag) => {
    if (!useTagsView.visitedViews || useTagsView.visitedViews.length === 0) {
      return false;
    }

    // 1. 是否是在标签中
    const valueIndex = useTagsView.visitedViews.findIndex((item) => {
      return item.path === tag.path;
    });
    if (valueIndex === -1) return false;

    // 2. 移除标签
    useTagsView.deleteVisitedView(tag.path);
    useTagsView.removePageCached(tag.path);

    // 3. 手动选择 上一个标签
    if (currentPath && preTagPath && currentPath === tag.path) {
      const lastIndex = useTagsView.visitedViews.findIndex((item) => {
        return item.path === preTagPath;
      });
      selectedPointTagView(lastIndex);
    } else {
      selectedPointTagView(valueIndex - 1);
    }
  };

  /**
   * @description: 选择指定的标签view
   * @param {Number} pointIndex
   * @return {Boolean}
   */
  const selectedPointTagView = (pointIndex) => {
    if (pointIndex >= 0 && pointIndex < useTagsView.visitedViews.length) {
      const selectedTag = useTagsView.visitedViews[pointIndex];
      router.push({ ...selectedTag });
    } else {
      router.replace({ path: BaseRoute.ROOT_PATH });
    }
  };
  /**
   * @description: 刷新标签
   * @param {*} route
   * @return {*}
   */
  const refreshCurrentTagView = (route) => {
    const { fullPath, query } = route;
    router.replace({
      path: '/redirect' + fullPath,
      query: query
    });
  };

  return {
    refreshCurrentTagView,
    dynamicAddTagView,
    dynamicDeleteTagView,
    selectedPointTagView
  };
};
