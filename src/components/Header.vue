<script lang="ts" setup>
import { ref } from 'vue';
import { FullScreen, Search, Setting } from '@element-plus/icons-vue';
import UserIcon from '@/components/account/UserIcon.vue';
const query = ref('');
</script>
<template>
  <div class="header">
    <div class="search">
      <el-input
        v-model="query"
        @input="$emit('search', query)"
        class="search-input"
        placeholder="搜索"
        :prefix-icon="Search"
      />
    </div>
    <div class="controls">
      <el-button class="control-btn" :icon="FullScreen" />
      <el-button class="control-btn" :icon="Setting" />
      <UserIcon class="control-btn" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  line-height: 1;
  padding: 0 30px;
  width: 100%;
  min-width: 400px;

  .search {
    width: 40vw;
    min-width: 200px;
    .search-input {
      :deep(input) {
        box-shadow: none;
      }
    }
  }
  .controls {
    display: inline-flex;
    .control-btn {
      margin-left: 0;
      border: none;
    }
  }
}
</style>
