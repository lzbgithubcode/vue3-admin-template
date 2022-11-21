<template>
  <div v-if="!item.hidden" class="side-bar-item">
    <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow">
      <Link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{ 'submenu-title-noDropdown': !isNest }">
          <Item :meta="onlyOneChild.meta || item.meta" />
        </el-menu-item>
      </Link>
    </template>

    <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)" popper-class="side-bar-popper" popper-append-to-body>
      <template #title>
        <Item v-if="item.meta" :meta="item.meta" />
      </template>
      <SideBarItem v-for="child in item.children" :key="child.path" :is-nest="true" :item="child" :base-path="resolvePath(child.path)" class="nest-menu" />
    </el-sub-menu>
  </div>
</template>

<script setup>
import { isExternalURL } from '@/utils/helper/ValidateHelper'
import { ExternalLinkRouterWhiteList } from '@/utils/constants/EnumConstants.js'
import { ref } from 'vue'
import Link from './Link.vue'
import Item from './Item'
import path from 'path'

// 属性定义
const props = defineProps({
  // 路由对象
  item: {
    type: Object,
    required: true
  },
  isNest: {
    type: Boolean,
    default: false
  },
  basePath: {
    type: String,
    default: ''
  }
})

// =====================================定义方法====================================
// 是否是有一个子集
const onlyOneChild = ref(null)
const hasOneShowingChild = (children = [], parent) => {
  const showingChildren = children.filter((item) => {
    if (item.hidden) {
      return false
    }
    // 只有一个子菜单时
    onlyOneChild.value = item
    return true
  })

  // 只有一个子菜单时，显示这个子菜单，不显示父级
  if (showingChildren.length === 1) {
    return true
  }

  // 子路由为空时，显示父菜单
  if (showingChildren.length === 0) {
    onlyOneChild.value = {
      ...parent,
      path: '',
      noShowingChildren: true
    }
    return true
  }

  return false
}

/**
 * 路径判断
 */
const resolvePath = (routePath) => {
  if (isExternalURL(routePath)) {
    return routePath
  }

  if (isExternalURL(props.basePath)) {
    return props.basePath
  }

  // 路由白名单
  const constantsList = ExternalLinkRouterWhiteList
  if (constantsList.indexOf(routePath) !== -1) {
    const result = window.location.origin + routePath
    return result
  }
  return path.resolve(props.basePath, routePath)
}
</script>
<style scoped lang="scss"></style>
