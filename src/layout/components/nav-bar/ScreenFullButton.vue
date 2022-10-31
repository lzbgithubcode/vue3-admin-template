<template>
  <div>
    <i-ep-fullScreen v-if="isFullScreen" @click="toggleFullScreen" />
    <i-ep-switch v-else />
  </div>
</template>

<script setup>
import { useFullScreen } from '../../../hooks/core/useFullScreen.js';

const { isFullScreen, toggle } = useFullScreen();

// 定义方法
const toggleFullScreen = () => toggle();
</script>
<style scoped lang='scss'>
</style>