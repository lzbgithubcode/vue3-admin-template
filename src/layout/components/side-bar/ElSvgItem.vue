<template>
  <el-icon class="el-svg-icon">
    <component :is="ElSvg[elSvgName]" />
  </el-icon>
</template>

<script setup>
import { defineProps } from 'vue';
import * as ElSvg from '@element-plus/icons-vue';
const props = defineProps({
  elSvgName: {
    require: true,
    default: '',
    type: String
  }
});
// eslint-disable-next-line vue/no-setup-props-destructure
const { elSvgName } = props;
</script>

<style scoped lang="scss">
.el-svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentcolor;
  overflow: hidden;
}
</style>
