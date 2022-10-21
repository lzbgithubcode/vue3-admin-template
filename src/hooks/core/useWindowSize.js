import { ref } from "vue";
const useWindowSizeOptions = {
  window: window,
  /**
   * 初始化width/height
   */
  initialWidth: 0,
  initialHeight: 0,
  /**
   * 是否监听方向
   */
  listenOrientation: true,
  /**
   * 是否包含滚动条
   */
  includeScrollbar: true,
};

export function useWindowSize(opts = useWindowSizeOptions) {
  const options = {};
  Object.assign(options, useWindowSizeOptions, opts);

  const width = ref(options.initialWidth);
  const height = ref(options.initialHeight);

  return { width, height };
}
