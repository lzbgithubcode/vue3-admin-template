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

    <!-- 右键菜单 -->
    <transition name="el-zoom-in-top">
      <ul
        v-show="visible"
        :key="Math.random()"
        :style="getContextPaneStyle"
        class="context-menu-pane"
      >
        <div v-for="(menu, key) in rightPaneMenuList" :key="key" class="context-menu-row">
          <li v-if="menu.show" @click="selectedPaneMenu(key, menu)">{{ menu.text }}</li>
        </div>
      </ul>
    </transition>
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
  mouseSelectTag: {}, //菜单鼠标选择的tag
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
  contextPaneLeft,
  visible,
  showRefreshPaneMenu,
  showAllPaneMenu,
  rightPaneMenuList,
  getContextPaneStyle,
  resetHoverIndex,
  onMouseEnter,
  onMouseLeave
} = useTags();

const {
  dynamicAddTagView,
  dynamicDeleteTagView,
  refreshCurrentTagView,
  dynamicPatchDeleteTagView
} = useTagsOperation();
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
  () => visible.value,
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
  visible.value = false;
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
  const rect = proxy.$el.getBoundingClientRect();
  const left = rect.left;
  // 设置菜单的宽度
  const menuPaneWidth = 105;

  // 正常标签距离左侧的间距
  const normalLeftP = $event.clientX - left;

  // 最大的左侧间距
  const maxLeftP = rect.width - menuPaneWidth;

  // 结果左侧值
  if (normalLeftP > maxLeftP) {
    contextPaneLeft.value = maxLeftP;
  } else {
    contextPaneLeft.value = normalLeftP;
  }

  showAllPaneMenu();

  // 1. 如果是固定标签-只是刷新
  if (tag && tag.meta && tag.meta.affix) {
    showRefreshPaneMenu();
  }
  state.mouseSelectTag = tag;
  visible.value = true;
};

/**
 * @description: 选择菜单
 * @return {*}
 */
const selectedPaneMenu = (index) => {
  switch (index) {
    case 0: {
      // 刷新
      refreshCurrentTagView(state.mouseSelectTag);
      break;
    }
    case 1: {
      // 关闭当前的标签
      closeSelectedTag(state.mouseSelectTag);
      break;
    }
    case 2: {
      // 关闭其他标签
      closeOtherTag(state.mouseSelectTag);
      break;
    }
    case 3: {
      // 关闭所有标签
      closeAllTags(state.mouseSelectTag);
      break;
    }
  }
};

/**
 * @description: 关闭选择的标签
 * @param {*} tag tag标签
 * @return {*} void
 */
const closeSelectedTag = (tag) => {
  resetHoverIndex();
  dynamicDeleteTagView(tag, true);
};
/**
 * @description: 关闭其他标签
 * @param {*} tag tag标签
 * @return {*}
 */
const closeOtherTag = (tag) => {
  resetHoverIndex();
  dynamicPatchDeleteTagView(tag);
};
/**
 * @description: 关闭所有标签
 * @param {*} tag tag标签
 * @return {*}
 */
const closeAllTags = () => {
  resetHoverIndex();
  dynamicPatchDeleteTagView();
};
</script>
<style scoped lang="scss">
@import './tagsBar.scss';
</style>
