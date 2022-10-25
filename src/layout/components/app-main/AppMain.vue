<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
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
</style>