<script lang="ts" setup>
import { Avatar } from '@element-plus/icons-vue';
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';

const userStores = useUserStore();
const userName = computed(() => userStores.name);
const userIcon = computed(() => userStores.icon);
</script>
<template>
  <el-tooltip
    :disabled="!userName"
    :content="userName"
    placement="bottom"
    effect="light"
  >
    <img class="user-icon" :src="userIcon" v-if="userIcon" />
    <Avatar class="user-icon" v-else />
  </el-tooltip>
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
