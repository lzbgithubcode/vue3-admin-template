import { useTagsViewStore } from '../../store/modules/tagsView';
import { useRouter } from 'vue-router';
import { BaseRoute } from '../../utils/constants/RoutePathConstants';
import { isAffix } from '../utils/TagHelper.js';

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
    }
  };
  /**
   * @description: 动态删除tag
   * @param {Boolean} selectLasted
   * @param {*} tag
   * @return {*}
   */
  const dynamicDeleteTagView = (tag, selectLasted = true) => {
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

    // 不选择上一个
    if (!selectLasted) return true;

    // 3.移除是否是当前选择的标签- 不是- 保持默认的选择
    if (currentPath && currentPath !== tag.path) {
      return true;
    }

    // 4. 如果上一个选择存在
    if (preTagPath) {
      const lastIndex = useTagsView.visitedViews.findIndex((item) => {
        return item.path === preTagPath;
      });
      selectedPointTagView(lastIndex);
    } else {
      selectedPointTagView(valueIndex - 1);
    }
  };
  /**
   * @description: 批量删除标签
   * @param {*} tag  指定不能删除的标签,其他都删除
   * @return {*}
   */
  const dynamicPatchDeleteTagView = (tag) => {
    if (!useTagsView.visitedViews || useTagsView.visitedViews.length === 0) {
      return false;
    }

    // 过滤数据
    const filterViews = useTagsView.visitedViews.filter(
      (item) => isAffix(item) || (tag && tag.path == item.path)
    );
    // 更新数据
    useTagsView.updateVisitedViews(filterViews);

    // 指定选择标签
    if (tag) {
      // 选中-剩余的tag
      const valueIndex = useTagsView.visitedViews.findIndex((item) => {
        return item.path === tag.path;
      });
      if (valueIndex === -1) return false;
      selectedPointTagView(valueIndex);
    } else {
      // 不存在-选择第一个固定的tag
      selectedPointTagView(-1);
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
    dynamicPatchDeleteTagView,
    selectedPointTagView
  };
};
