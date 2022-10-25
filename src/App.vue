<template>
  <router-view />
</template>
<script setup>
import { useAppStore } from './store/modules/app';
import defaultSettings from './settings.js';

const appStore = useAppStore();
appStore.actionChangeSettings(defaultSettings);
</script>

<style></style>




