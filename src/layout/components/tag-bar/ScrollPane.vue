<template>
  <el-scrollbar class="tag-scroll-bar" ref="scrollBar" :noresize="true" @scroll="monitorScrollChange">
      <slot />
  </el-scrollbar>
</template>

<script setup>
import { ref } from "vue";

// tag间距
 const tagAndTagSpacing = 10;
 

/**
 * @description: 监听滚动事件
 */
const monitorScrollChange = ()=>{

}

</script>
<style scoped lang='scss'>
</style>