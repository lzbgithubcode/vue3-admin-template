import { defineStore } from "pinia";
import defaultSettings from "@/settings.js";

const key = "app";
export const useAppStore = defineStore(key, {
  state: () => {
    return {
      sidebar: {
        opened: true,
        withoutAnimation: false,
      },
      device: "pc",
      settings: defaultSettings,
    };
  },

  actions: {
    // 修改设置
    actionChangeSettings(data) {
      this.$patch((state) => {
        state.settings = { ...state.settings, ...data };
      });
    },
    // 触发侧滑栏
    toggleSideBar(withoutAnimation) {
      this.$patch((state) => {
        state.sidebar.opened = !state.sidebar.opened;
        state.sidebar.withoutAnimation = withoutAnimation;
      });
    },

    // 关闭侧滑栏
    closeSideBar(withoutAnimation) {
      this.$patch((state) => {
        state.sidebar.opened = false;
        state.sidebar.withoutAnimation = withoutAnimation;
      });
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: key,
        storage: localStorage,
      },
    ],
  },
});
