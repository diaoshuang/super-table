<script lang="ts" setup name="MenuItem">
defineProps({
  menuItem: { type: Object, default: {} },
});
</script>
<template>
  <el-sub-menu v-if="menuItem.children?.length > 0" :index="menuItem.id">
    <template #title>
      <!-- <el-icon v-if="menuItem.icon"><component :is="menuItem.icon" /></el-icon> -->
      <span>{{ menuItem.name }}</span>
    </template>
    <MenuItem
      v-for="child of menuItem.children"
      :key="child.id"
      :menuItem="child"
    />
  </el-sub-menu>
  <el-menu-item @click="$emit('click')" v-else :index="menuItem.id">
    <!-- <el-icon v-if="menuItem.icon"><component :is="menuItem.icon" /></el-icon> -->
    <template #title>{{ menuItem.name }}</template>
  </el-menu-item>
</template>
