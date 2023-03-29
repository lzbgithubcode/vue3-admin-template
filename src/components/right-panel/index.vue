<template>
  <div :class="{ show: show }" class="right-panel-wrapper">
    <div ref="rightPanel" class="m-right-panel-bg-mask" @click="onClickCloseBg" />
    <div class="m-right-panel">
      <div class="c-operation-bar">
        <div>项目配置</div>
        <div class="close-button" @click="show = !show">
          <i-ep-close />
        </div>
      </div>
      <div class="c-right-panel">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import emitter from '../../utils/emitter/emitter';

const show = ref(false);

// 点击背景
const onClickCloseBg = () => {
  show.value = false;
};

emitter.on('openPanel', () => {
  show.value = !show.value;
});
</script>
<style scoped lang="scss">
.right-panel-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  .m-right-panel-bg-mask {
    opacity: 0;
    width: 100%;
    height: 100%;
    transition: opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
    background: rgba(0, 0, 0, 0.2);
  }

  .m-right-panel {
    width: 100%;
    max-width: 315px;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.05);
    transform: translate(100%);
    opacity: 0;
    background: white;

    .c-operation-bar {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      border-bottom: 1px solid #f2f2f2;
      .close-button {
        cursor: pointer;
      }
    }

    .c-right-panel {
      padding: 10px;
    }
  }
}
.show {
  transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);

  opacity: 1;
  z-index: 200;

  .m-right-panel-bg-mask {
    opacity: 1;
    z-index: 300;
  }

  .m-right-panel {
    transform: translate(0);
    opacity: 1;
    z-index: 400;
  }
}
</style>
