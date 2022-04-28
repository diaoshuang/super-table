<template>
  <div>
    <div class="logo" :class="size">
      <slot name="logo-icon">
        <img class="logo-icon" :src="logoIcon" />
      </slot>
      <div class="logo-title" :style="`color: ${color}`">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import logoIcon from '@/assets/logo.png';

const props = defineProps({
  title: { type: String, default: '鲲麒数仓' },
  color: { type: String, default: '#ffffff' },
  size: { type: String, default: 'normal' },
});
</script>
<style lang="scss" scoped>
.logo {
  display: flex;
  flex-direction: row;
  max-width: 200px;
  height: 35px;
  line-height: 35px;
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
    flex: 1;
    margin: 0 0 0 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 35px;
    line-height: 35px;
  }
}
</style>
