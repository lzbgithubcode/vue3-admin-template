<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue';
import { isExternal } from '@/utils/helper/ValidateHelper';

// 定义属性
const props = defineProps({
  to: {
    type: String,
    required: true,
  },
});

// 定义计算属性
const type = computed(() => {
  if (isExternal(props.to.value)) {
    return 'a';
  }
  return 'router-link';
});

// 定义方法
const linkProps = (url) => {
  if (isExternal(props.to.value)) {
    return {
      href: url,
      target: '_blank',
      rel: 'noopener',
    };
  } else {
    return {
      to: url,
    };
  }
};
</script>
<style scoped lang='scss'>
</style>