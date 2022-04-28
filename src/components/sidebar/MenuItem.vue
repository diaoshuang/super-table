<script lang="ts" setup name="MenuItem">
defineProps({
  menuItem: { type: Object, default: {} },
});
</script>
<template>
  <el-sub-menu
    @click="$emit('click')"
    v-if="menuItem?.children?.length > 0"
    :index="menuItem.id"
  >
    <template #title>
      <el-icon v-if="menuItem.icon"><component :is="menuItem.icon" /></el-icon>
      <span>{{ menuItem.title }}</span>
    </template>
    <MenuItem
      v-for="(child, index) of menuItem.children"
      :key="index"
      :menuItem="child"
    />
  </el-sub-menu>
  <el-menu-item @click="$emit('click')" v-else :index="menuItem.id">
    <el-icon v-if="menuItem.icon"><component :is="menuItem.icon" /></el-icon>
    <template #title>{{ menuItem.title }}</template>
  </el-menu-item>
</template>
