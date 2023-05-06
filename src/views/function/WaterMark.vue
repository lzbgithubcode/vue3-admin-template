<script setup>
import { ref } from 'vue';
// import { useWaterMark } from '../../hooks/tool/useWaterMark';
// const { addWaterMark, clearWaterMark } = useWaterMark();

const color = ref('#409EFF');
const value = ref('测试文字');
</script>

<template>
  <el-card class="p-water-mark">
    <template #header>
      <div class="card-header">这个一个水印的页面</div>
    </template>
    <div>
      <div class="form-item">
        <span>请输入生成水印的文字</span>
        <el-input v-model="value" placeholder="请输入水印内容" clearable></el-input>
      </div>

      <div class="form-item">
        <span>请输入生成水印的颜色</span>
        <el-color-picker v-model="color" show-alpha />
      </div>
    </div>
  </el-card>
</template>
<style scoped lang="scss">
.p-water-mark {
  .form-item {
    display: flex;
    align-items: center;
    span {
      margin-right: 20px;
    }
    .el-input {
      width: 320px;
    }
  }
}
</style>
