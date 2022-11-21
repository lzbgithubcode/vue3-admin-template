<template>
  <div>
    <div>我是菜单menu2</div>
    <el-table ref="table" :data="dataList">
      <el-table-column prop="id" />
      <el-table-column prop="name" />
      <el-table-column prop="age" />
      <el-table-column prop="cardNo" />
      <el-table-column prop="phone" />
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const dataList = ref([])
for (let i = 0; i < 100; i++) {
  dataList.value.push({
    id: i,
    name: `小兵${i}`,
    age: i,
    cardNo: Math.random() * 1000000000000000,
    phone: Math.random() * 12345678912
  })
}
</script>
<style scoped lang="scss"></style>
