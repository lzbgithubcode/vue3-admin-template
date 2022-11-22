import { defineStore } from 'pinia'
const key = 'tagsView'

export const useTagsViewStore = defineStore('tagsView', {
  state: () => {
    return {
      visitedViews: [],
      cachedViews: []
    }
  },
  actions: {
    /**
     * 新增标签
     */
    addVisitedView(view) {
      this.$patch((state) => {
        if (state.visitedViews.some((v) => v.path === view.path)) return
        state.visitedViews.push({
          fullPath: view.fullPath,
          meta: view.meta,
          name: view.name,
          params: view.params,
          path: view.path,
          query: view.query,
          title: (view.query && view.query.targetTitle) || view.meta.title || 'no-name'
        })
      })
    },
    /**
     * 新增缓存标签
     */
    addCachedView(view) {
      this.$patch((state) => {
        if (state.cachedViews.includes(view.name)) return
        if (!view.meta.noCache) {
          state.cachedViews.push(view.name)
        }
      })
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
})
