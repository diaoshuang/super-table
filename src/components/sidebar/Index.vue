<script lang="ts" setup name="Sidebar">
import { computed, ref, onMounted } from 'vue';
import Logo from '@/components/KqLogo.vue';
import MenuItem from './MenuItem.vue';
import fold from '@/statics/icons/fold.png';
import unfold from '@/statics/icons/unfold.png';
import { useStore } from '@/stores/sidebar';
import { is } from '@babel/types';

const sidebarStore = useStore();
const menuList = computed(() => {
  return sidebarStore.menuList;
});
const isCollapse = computed({
  get() {
    return sidebarStore.collapsed;
  },
  set(nVal: boolean) {
    sidebarStore.collapsed = nVal;
  },
});
const handleCollapse = () => {
  isCollapse.value = !isCollapse.value;
};
const handleItemClick = (item: sidebarItem) => {
  sidebarStore.setActiveSidebar(item);
  console.log('handleItemClick', item);
};
onMounted(() => {
  sidebarStore.initSidebar();
});
</script>
<template>
  <el-aside class="sidebar" :class="[isCollapse ? 'collapse' : '']">
    <Logo class="logo" :collapse="isCollapse" color="#3a3959" />
    <div class="menu-list">
      <el-menu class="menu" :collapse="isCollapse">
        <MenuItem
          class="menu-item"
          v-for="item of menuList"
          @click="handleItemClick(item)"
          :menuItem="item"
          :key="item.id"
        />
      </el-menu>
    </div>
    <el-button type="text" @click="handleCollapse" class="collapse-btn">
      <img class="collapse-icon" :src="isCollapse ? unfold : fold" />
      <template v-if="!isCollapse">收起</template>
    </el-button>
  </el-aside>
</template>
<style lang="scss" scoped>
.sidebar {
  box-shadow: 0px 10px 60px rgba(226, 236, 249, 0.5);
  display: flex;
  flex-direction: column;
  height: 100vh;
  text-align: center;
  width: 200px;
  &.collapse {
    width: 60px;
  }
}
.logo {
  border-bottom: 1px solid #edf3fa;
  height: 60px;
  line-height: 60px;
  margin: 0 auto;
  text-align: center;
  width: 100%;
}
.menu-list {
  flex: 1;
  overflow: hidden;
  overflow-y: auto;
  .menu {
    border: none;
    color: #9197b3;
  }
}

.collapse-btn {
  margin: 10px auto;
  text-align: center;
  width: 100%;
  .collapse-icon {
    width: 20px;
  }
}
</style>
