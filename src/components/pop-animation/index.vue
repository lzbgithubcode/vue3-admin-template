<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 100 }"
    :enter="{
      opacity: 1,
      y: 0,
      transition: {
        delay: delay
      }
    }"
  >
    <slot></slot>
  </div>
</template>
<script setup>
import { defineProps } from 'vue';
// 定义属性
defineProps({
  delay: {
    type: Number,
    default: 100
  }
});
</script>
