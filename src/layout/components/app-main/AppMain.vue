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
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTagsViewStore } from '@/store/modules/tagsView.js'

const route = useRoute()
const useTagsView = useTagsViewStore()

const cachedViews = computed(() => useTagsView.cachedViews)

const key = computed(() => route.path)
</script>
<style scoped lang="scss">
@import '../../../assets/scss/extend-variables.scss';
.app-main {
  position: relative;
  min-height: calc(100vh - #{$navigatorOperationBarHeight});
  padding: 15px;
  overflow: hidden;
  box-sizing: border-box;
}

.fixed-header + .app-main {
  margin-top: $navigatorOperationBarHeight;
}
</style>
