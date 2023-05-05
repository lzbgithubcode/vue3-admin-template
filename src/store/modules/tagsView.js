import { defineStore } from 'pinia';
const key = 'tagsView';

export const useTagsViewStore = defineStore('tagsView', {
  state: () => {
    return {
      visitedViews: [],
      pageCacheList: []
    };
  },
  actions: {
    /**
     * 新增标签
     */
    addVisitedView(view) {
      this.$patch((state) => {
        // 1.标题 - 不能增加标题是空的标签
        const title = (view.query && view.query.targetTitle) || view.meta.title;
        if (!title || title.length === 0) return;

        // 2.路径 - 不能重复
        const tagPath = view.path;
        const isExitPath = state.visitedViews.some((v) => v.path === tagPath);
        if (isExitPath) return;

        // 3. 保存标签
        const tagItem = {
          fullPath: view.fullPath,
          meta: view.meta,
          name: view.name,
          params: view.params,
          path: view.path,
          query: view.query,
          title: title
        };
        state.visitedViews.push(tagItem);
        this.addPageCached(view);
      });
    },
    /**
     * 移除标签
     */
    deleteVisitedView(path) {
      this.$patch((state) => {
        const findIndex = state.visitedViews.findIndex((v) => v.path === path);
        if (findIndex === -1) return;
        state.visitedViews.splice(findIndex, 1);
        console.log('移除之后的 结果====', state.visitedViews);
      });
      this.removePageCached(path);
    },
    /**
     * @description: 更新标签
     * @return {*}
     */
    updateVisitedViews(visitedViews) {
      this.$patch((state) => {
        state.visitedViews = visitedViews;
      });
    },

    /**
     * 新增缓存标签
     */
    addPageCached(view) {
      this.$patch((state) => {
        if (state.pageCacheList.includes(view.name)) return;
        if (!view.meta.noCache) {
          state.pageCacheList.push(view.name);
        }
      });
    },
    /**
     * 移除缓存标签
     */
    removePageCached(path) {
      this.$patch((state) => {
        const findIndex = state.pageCacheList.findIndex((v) => v.path === path);
        if (findIndex === -1) return;
        state.pageCacheList.splice(findIndex, 1);
      });
    },
    /**
     * @description: 更新缓存页面
     * @param {*} visitedViews
     * @return {*}
     */
    updatePageCache(visitedViews) {
      this.$patch((state) => {
        state.pageCacheList = [];
        visitedViews &&
          visitedViews.map((item) => {
            this.addPageCached(item);
          });
      });
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: key,
        storage: localStorage
      }
    ]
  }
});
