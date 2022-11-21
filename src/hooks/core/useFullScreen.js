import ScreenFull from 'screenfull'
import { ref } from 'vue'

export function useFullScreen() {
  const isSupported = ScreenFull.isEnabled
  const isFullScreen = ref(false)

  // 触发全屏
  const toggle = () => {
    console.log('触发全屏=========', isFullScreen)
    return ScreenFull.toggle()
  }

  // 退出全屏
  const exit = () => {
    return ScreenFull.exit()
  }

  // 监听全屏
  ScreenFull.on('change', () => {
    isFullScreen.value = ScreenFull.isFullscreen
  })

  return {
    isSupported,
    isFullScreen,
    toggle,
    exit
  }
}
