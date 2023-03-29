import { useAppStore } from '../../store/modules/app.js';
import { onBeforeUnmount, onBeforeMount, onMounted } from 'vue';

const BASE_MAX_MOBILE_WIDTH = 992;

export const useResizeDevice = () => {
  const useApp = useAppStore();

  /**
   * 是否是手机设备
   */
  const isMobileDevice = () => {
    const rect = document.body.getBoundingClientRect();
    return rect.width - 1 < BASE_MAX_MOBILE_WIDTH;
  };

  const resizeHandler = () => {
    if (!document.hidden) {
      const isMobile = isMobileDevice();

      useApp.toggleDevice(isMobile ? 'mobile' : 'pc');
      isMobile && useApp.closeSideBar();
    }
  };

  // 生命周期
  onBeforeMount(() => {
    window && window.addEventListener('resize', resizeHandler);
  });
  onMounted(() => {
    isMobileDevice() && useApp.toggleDevice('mobile');
    isMobileDevice() && useApp.closeSideBar();
  });
  onBeforeUnmount(() => {
    window && window.removeEventListener('resize', resizeHandler);
  });
};
