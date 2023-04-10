<template>
  <div class="tag-bar-wrapper">
    <!-- 左侧箭头 -->
    <div class="tag-bar-icon left-arrow">
      <i-ep-DArrowLeft />
    </div>

    <scroll-pane ref="scrollPane" class="scroll-container">
      <div
        v-for="(tag, index) in visitedViews"
        :key="index"
        :class="['tag-bar-item', linkIsActiveClass(tag), isAffixClass(tag)]"
        @click.middle="isAffix(tag) ? '' : closeSelectedTag(tag)"
        @contextmenu.prevent="openMenuPane(tag, $event)"
        @mouseenter.prevent="onMouseEnter(index)"
        @mouseleave.prevent="onMouseLeave(index)"
      >
        <router-link :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }">
          <span> {{ tag.title }}</span>
        </router-link>

        <span
          v-if="closeIsActive(tag, index)"
          class="tag-item-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        >
          <i-ep-Close />
        </span>

        <div
          :ref="'schedule' + index"
          :class="['tag-item-schedule', scheduleIsActiveClass(tag)]"
        ></div>
      </div>
    </scroll-pane>

    <!-- 右侧箭头 -->
    <div class="tag-bar-icon right-arrow">
      <i-ep-DArrowRight />
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, reactive, watch, onMounted } from 'vue';
import ScrollPane from './ScrollPane.vue';
import { useTags } from '../../hooks/useTags';
import { useTagsOperation } from '../../hooks/useTagsOperation';
import { isAffix, filterAffixTags } from '../../utils/TagHelper.js';

const { proxy } = getCurrentInstance();

// ============================================定义属性==================================================//
const state = reactive({
  visible: false,
  top: 0,
  left: 0,
  selectedTag: {},
  currTag: {},
  affixTags: []
});
const {
  visitedViews,
  $route,
  allRoutes,
  linkIsActiveClass,
  scheduleIsActiveClass,
  isAffixClass,
  closeIsActive,
  resetHoverIndex,
  onMouseEnter,
  onMouseLeave
} = useTags();

const { dynamicAddTagView, dynamicDeleteTagView } = useTagsOperation();
console.log('获取到的-visitedViews', visitedViews);

// ============================================life-cycle==================================================//
onMounted(() => {
  initTags();
});

// ============================================watch==================================================//
watch(
  () => $route.path,
  () => {
    dynamicAddTagView($route);
  }
);

watch(
  () => state.visible,
  (val) => {
    if (val) {
      document.addEventListener('click', closeVisibleMenuPane);
    } else {
      document.removeEventListener('click', closeVisibleMenuPane);
    }
  }
);

// ============================================methods==================================================//

/**
 * 初始化tags
 */
const initTags = () => {
  state.affixTags = filterAffixTags(allRoutes);
  for (const tag of state.affixTags) {
    dynamicAddTagView(tag);
  }
};

/**
 * @description: 关闭选择的菜单面板
 * @param {*} event 事件
 * @return {*}  无返回
 */
const closeVisibleMenuPane = (event) => {
  const { classList } = event.target;
  if (classList.contains('tag-bar-icon') || classList.contains('el-icon-setting')) {
    return false;
  }
  state.visible = false;
  return false;
};

/**
 * @description: 打开菜单面板
 * @param {*} tag  标签
 * @param {*} event 事件
 * @return {*} void
 */
const openMenuPane = (tag, $event) => {
  // 左边距
  const offsetLeft = proxy.$el.getBoundingClientRect().left;
  console.log(offsetLeft, tag, $event);
};

/**
 * @description: 关闭选择的标签
 * @param {*} tag tag标签
 * @return {*} void
 */
const closeSelectedTag = (tag) => {
  resetHoverIndex();
  dynamicDeleteTagView(tag);
};
</script>
<style scoped lang="scss">
@import './tagsBar.scss';
</style>
