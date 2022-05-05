<script lang="ts" setup>
import { Avatar } from '@element-plus/icons-vue';
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';
import { removeStorage } from '@/util/storage';
import router from '@/router';

const userStores = useUserStore();
const userName = computed(() => userStores.name);
const userIcon = computed(() => userStores.icon);
const handleLogout = () => {
  removeStorage('_token');
  router.replace({ path: '/login' });
};
</script>
<template>
  <el-dropdown ref="userSetList">
    <img class="user-icon" :src="userIcon" v-if="userIcon" />
    <Avatar class="user-icon" v-else />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>{{ userName }}</el-dropdown-item>
        <el-dropdown-item divided>修改资料</el-dropdown-item>
        <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<style lang="scss" scoped>
.user-icon {
  cursor: pointer;
  display: inline-block;
  width: 22px;
  height: 22px;
  padding: 5px;
  margin-left: 5px;
  &:hover {
    background: #ecf5ff;
    color: #409eff;
  }
}
</style>
