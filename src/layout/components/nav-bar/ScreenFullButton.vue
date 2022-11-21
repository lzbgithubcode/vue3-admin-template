<template>
  <div class="full-screen-button" @click="toggleFullScreen">
    <i-ep-switch v-if="isFullScreen" />
    <i-ep-fullScreen v-else />
  </div>
</template>

<script setup>
import { useFullScreen } from '../../../hooks/core/useFullScreen.js'

const { isFullScreen, toggle } = useFullScreen()

// 定义方法
const toggleFullScreen = () => toggle()
</script>
<style scoped lang="scss">
.full-screen-button {
  display: flex;
  align-items: center;
  svg {
    width: 21px;
    height: 21px;
    padding: 0 7px;
  }
}
</style>
