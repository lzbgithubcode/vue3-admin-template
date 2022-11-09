import { defineStore } from "pinia";
import defaultSettings from "@/settings.js";

const key = "app";
export const useAppStore = defineStore(key, {
  state: () => {
    return {
      sidebar: {
        opened: true,
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
    toggleSideBar() {
      this.$patch((state) => {
        state.sidebar.opened = !state.sidebar.opened;
      });
    },
    // 触发设备
    toggleDevice(device) {
      this.$patch((state) => {
        state.device = device;
      });
    },

    // 关闭侧滑栏
    closeSideBar() {
      this.$patch((state) => {
        state.sidebar.opened = false;
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
