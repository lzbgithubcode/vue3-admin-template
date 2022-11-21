<template>
  <el-icon class="el-svg-icon">
    <component :is="ElSvg[elSvgName]" />
  </el-icon>
</template>

<script setup>
import * as ElSvg from '@element-plus/icons-vue'
const props = defineProps({
  elSvgName: {
    require: true,
    type: String
  }
})
const { elSvgName } = props
</script>

<style scoped lang="scss">
.el-svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
