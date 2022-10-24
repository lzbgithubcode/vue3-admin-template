<template>
  <component :is="elSvnIcon" class="el-svg-icon"></component>
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps({
  elSvgName: {
    require: true,
    type: String,
  },
});
const elSvnIcon = computed(() => `i-ep-${props.elSvgName}`);
</script>