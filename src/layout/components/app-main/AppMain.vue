<template>
  <section class="app-main" :class="{ 'show-tag-bar': showTags }">
    <router-view v-slot="{ Component }" :key="key">
      <transition name="fade-transform" mode="out-in" :appear="true">
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
import { useTags } from '../../hooks/useTags';

const route = useRoute();
const useTagsView = useTagsViewStore();
const { showTags } = useTags();

const cachedViews = computed(() => useTagsView.cachedViews);

const key = computed(() => route.path);
</script>
<style scoped lang="scss">
@import '@/styles/transition.scss';
.app-main {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  padding: 10px;

  &.show-tag-bar {
    margin-top: 0;
    min-height: auto;
  }
  &.app-main-fixed {
    margin-top: $navigatorOperationBarHeight;
    margin-bottom: $footerBarHeight;
    min-height: calc(100vh - #{$navigatorOperationBarHeight} - #{$footerBarHeight});
    height: calc(100vh - #{$navigatorOperationBarHeight} - #{$footerBarHeight});
  }

  &.app-main-fixed.show-tag-bar {
    margin-top: $navigatorOperationBarHeight + $tagsBarHeight;
    min-height: calc(
      100vh - #{$navigatorOperationBarHeight} - #{$tagsBarHeight} - #{$footerBarHeight}
    );
    height: calc(100vh - #{$navigatorOperationBarHeight} - #{$tagsBarHeight} - #{$footerBarHeight});
  }
}
</style>
