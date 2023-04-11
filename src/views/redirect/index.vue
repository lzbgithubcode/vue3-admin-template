<script setup>
import { unref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const { params, query } = unref(route);
const { path } = params;
const _path = Array.isArray(path) ? path.join('/') : path;
router.replace({ path: '/' + _path, query });
</script>
<template>
  <div />
</template>
