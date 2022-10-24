import { defineStore } from "pinia";
import defaultSettings from "@/settings.js";
const useAppStore = defineStore("app", {
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
    M_settings(data) {
      this.$patch((state) => {
        state.settings = { ...state.settings, ...data };
      });
    },
    // 触发侧滑栏
    M_toggleSideBar(withoutAnimation) {
      this.$patch((state) => {
        state.sidebar.opened = !state.sidebar.opened;
        state.sidebar.withoutAnimation = withoutAnimation;
      });
    },

    // 关闭侧滑栏
    M_closeSideBar(withoutAnimation) {
      this.$patch((state) => {
        state.sidebar.opened = false;
        state.sidebar.withoutAnimation = withoutAnimation;
      });
    },
  },
});
