<template>
  <div class="tag-bar-wrapper">
    <scroll-pane ref="scrollPane">
      <router-link
        v-for="tag in visitedViews"
        :key="tag.path"
        tag="span"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        class="tag-bar-item"
        @click.middle="isAffix(tag) ? '' : closeSelectedTag(tag)"
        @contextmenu.prevent="openMenuPane(tag, $event)"
      />
    </scroll-pane>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance, reactive, watch } from 'vue'
import ScrollPane from './ScrollPane.vue'
import { useTagsViewStore } from '../../../store/modules/tagsView.js'
import { usePermissionStore } from '../../../store/modules/permission'
import { useRouter, useRoute } from 'vue-router'

const useTags = useTagsViewStore()
const usePermission = usePermissionStore()
const $router = useRouter()
const $route = useRoute()
const { proxy } = getCurrentInstance()

// ============================================定义属性==================================================//
const state = reactive({
  visible: false,
  top: 0,
  left: 0,
  selectedTag: {},
  currTag: {},
  affixTags: []
})
const visitedViews = computed(() => useTags.visitedViews)
const routes = computed(() => usePermission.routes)

// ============================================watch==================================================//
watch(
  () => $route.path,
  (toPath) => {}
)

watch(
  () => state.visible,
  (val) => {
    if (val) {
      document.addEventListener('click', closeVisibleMenuPane)
    } else {
      document.removeEventListener('click', closeVisibleMenuPane)
    }
  }
)

// ============================================methods==================================================//

/**
 * @description: 是否是固定标签
 * @param {*} tag tag标签
 * @return {*} 是否是固定标签
 */
const isAffix = (tag) => tag.meta && tag.meta.affix

/**
 * @description: 关闭选择的菜单面板
 * @param {*} event 事件
 * @return {*}  无返回
 */
const closeVisibleMenuPane = (event) => {
  const { classList } = event.target
  if (classList.contains('tags-view-operate') || classList.contains('el-icon-setting')) {
    return false
  }
  state.visible = false
  return false
}

/**
 * @description: 打开菜单面板
 * @param {*} tag  标签
 * @param {*} event 事件
 * @return {*} void
 */
const openMenuPane = (tag, $event) => {
  // 左边距
  const offsetLeft = proxy.$el.getBoundingClientRect().left
}

/**
 * @description: 关闭选择的标签
 * @param {*} tag tag标签
 * @return {*} void
 */
const closeSelectedTag = (tag) => {}
</script>
<style scoped lang="scss"></style>
