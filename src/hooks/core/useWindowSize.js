import { ref, onMounted, onUnmounted } from 'vue'
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
  includeScrollbar: true
}

export function useWindowSize(opts = useWindowSizeOptions) {
  const options = {}
  Object.assign(options, useWindowSizeOptions, opts)

  const width = ref(options.initialWidth)
  const height = ref(options.initialHeight)

  const update = () => {
    if (window) {
      if (options.includeScrollbar) {
        width.value = window.innerWidth
        height.value = window.innerHeight
      } else {
        width.value = window.document.documentElement.clientWidth
        height.value = window.document.documentElement.clientHeight
      }
    }
  }
  update()

  onMounted(() => {
    // 监听大小
    window.addEventListener('resize', update, { passive: true })

    // 监听方向
    options.listenOrientation &&
      window.addEventListener('orientationchange', update, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('resize', update)
    // 监听方向
    options.listenOrientation &&
      window.removeEventListener('orientationchange', update, {
        passive: true
      })
  })

  return { width, height }
}
