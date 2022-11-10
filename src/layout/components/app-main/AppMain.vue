<template>
  <section class="app-main">

    <router-view v-slot="{ Component }" :key="key">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>

  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useTagsViewStore } from '@/store/modules/tagsView.js';

const route = useRoute();
const useTagsView = useTagsViewStore();

const cachedViews = computed(() => useTagsView.cachedViews);
const key = computed(() => route.path);
</script>
<style scoped lang='scss'>
.app-main {
  overflow: hidden;
  position: relative;
  min-height: calc(100vh - #{$navigatorOperationBarHeight});
  box-sizing: border-box;
  padding: 15px;
}
.fixed-header + .app-main {
  margin-top: $navigatorOperationBarHeight;
}
</style>