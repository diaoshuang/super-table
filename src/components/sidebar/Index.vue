<script lang="ts" setup name="Sidebar">
import { ref } from 'vue';
import Logo from '@/components/KqLogo.vue';
import MenuItem from 'MenuItem.vue';
import fold from '@/statics/icons/fold.png';
import unfold from '@/statics/icons/unfold.png';
defineProps({
  menuList: { type: Array, default: [] },
});
const isCollapse = ref(false);
const handleCollapse = () => {};
</script>
<template>
  <div class="sidebar" :class="[isCollapse ? 'collapse' : '']">
    <Logo class="logo" :collapse="isCollapse" />
    <MenuItem
      class="menu-list"
      :collapse="isCollapse"
      v-for="(item, index) of menuList"
      :key="index"
    />
    <el-button type="text" @click="handleCollapse" class="collapse-btn">
      <img :src="isCollapse ? unfold : fold" />
      <template v-if="!isCollapse">收起</template>
    </el-button>
  </div>
</template>
<style lang="scss" scoped></style>
