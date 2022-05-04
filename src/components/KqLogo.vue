<template>
  <div class="logo" :class="size">
    <slot name="logo-icon">
      <img class="logo-icon" :src="logoIcon" />
    </slot>
    <div class="logo-title" v-show="!collapse" :style="`color: ${color}`">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
  </div>
</template>
<script setup lang="ts" name="Logo">
import logoIcon from '@/assets/logo.png';

const props = defineProps({
  title: { type: String, default: '鲲麒数仓' },
  color: { type: String, default: '#ffffff' },
  size: { type: String, default: 'normal' },
  collapse: { type: Boolean, default: false },
});
</script>
<style lang="scss" scoped>
.logo {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  max-width: 200px;
  height: 35px;
  line-height: 1;
  text-align: center;
  &.small {
    font-size: 14px;
  }
  &.normal {
    font-size: 18px;
  }
  &.big {
    font-size: 20px;
  }
  .logo-icon {
    width: 35px;
    height: 35px;
  }
  .logo-title {
    margin: 0 0 0 14px;
    max-width: 165px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 35px;
    line-height: 35px;
  }
}
</style>
