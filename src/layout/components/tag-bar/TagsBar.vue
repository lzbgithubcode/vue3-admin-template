<template>
  <div class="tag-bar-wrapper">
    <!-- 左侧箭头 -->
    <div class="tag-bar-icon left-arrow">
      <i-ep-DArrowLeft />
    </div>

    <scroll-pane ref="scrollPane" class="scroll-container">
      <router-link
        v-for="tag in visitedViews"
        :key="tag.path"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        class="tag-bar-item"
        @click.middle="isAffix(tag) ? '' : closeSelectedTag(tag)"
        @contextmenu.prevent="openMenuPane(tag, $event)"
      />
    </scroll-pane>

    <!-- 右侧箭头 -->
    <div class="tag-bar-icon right-arrow">
      <i-ep-DArrowRight />
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, reactive, watch, ref, onMounted } from 'vue';
import ScrollPane from './ScrollPane.vue';
import { useTags } from '../../hooks/useTags';

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
const { visitedViews, $route, allRoutes, dynamicAddTagView, filterAffixTags } = useTags();

// ============================================life-cycle==================================================//
onMounted(() => {
  initTags();
});

// ============================================watch==================================================//
watch(
  () => $route.path,
  () => {
    console.log('监听路由变化', $route);
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
};
/**
 * @description: 是否是固定标签
 * @param {*} tag tag标签
 * @return {*} 是否是固定标签
 */
const isAffix = (tag) => tag.meta && tag.meta.affix;
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
  console.log(tag);
};
</script>
<style scoped lang="scss">
.tag-bar-wrapper {
  height: $tagsBarHeight;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  position: relative;
  display: flex;
  align-items: center;

  // 滚动内容
  .scroll-container {
    flex: 1;
  }

  // 图标
  .tag-bar-icon {
    box-sizing: border-box;
    height: calc(#{$tagsBarHeight} - 1px);
    line-height: calc(#{$tagsBarHeight} - 1px);
    background: #fff;
    box-sizing: border-box;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;

    &.left-arrow:hover {
      cursor: w-resize;
      box-shadow: 5px 0 5px -6px #ccc;
    }
    &.right-arrow:hover {
      box-shadow: -5px 0 5px -6px #ccc;
      cursor: e-resize;
    }
  }
}
</style>
