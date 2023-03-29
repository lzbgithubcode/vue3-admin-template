<template>
  <div class="sidebar-log-container" :class="{ collapse: collapse }">
    <transition name="logoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="state.logo" :src="state.logo" class="sidebar-logo" />
        <span v-else class="sidebar-title">{{ state.title }}</span>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="state.logo" :src="state.logo" class="sidebar-logo" />
        <span class="sidebar-title">{{ state.title }}</span>
      </router-link>
    </transition>
  </div>
</template>

<script setup>
import settings from '@/settings.js';
import { reactive, defineProps } from 'vue';

// 定义属性
defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
});

const state = reactive({
  title: settings.title,
  logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
});
</script>
<style scoped lang="scss">
.sidebar-log-container {
  position: relative;
  width: 100%;
  height: $navigatorLogoBarHeight;
  font-size: 14px;
  text-align: center;
  background: #2b2f3a;
  overflow: hidden;
  line-height: $navigatorLogoBarHeight;

  .sidebar-logo-link {
    width: 100%;
    height: 100%;
    background: #29384a;

    .sidebar-logo {
      width: 25px;
      height: 25px;
      vertical-align: middle;
      margin-right: 10px;
    }

    .sidebar-title {
      display: inline-block;
      flex: 1;
      margin: 0;
      color: #fff;
      font-weight: 600;
      vertical-align: middle;
    }
  }

  // 缩小的时候
  &.collapse {
    .sidebar-logo {
      margin-right: 0;
    }
  }

  // // 过渡动画
  .logoFade-enter-active {
    transition: opacity 1.5s;
  }

  .logoFade-enter,
  .logoFade-leave-to {
    opacity: 0;
  }
}
</style>
