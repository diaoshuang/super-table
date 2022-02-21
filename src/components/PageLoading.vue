<template>
  <div id="page-loading" class="page-loading"></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { ElLoading } from 'element-plus';
export default defineComponent({
  name: 'PageLoading',
  setup() {
    ElLoading.service({
      lock: true,
      text: '资源加载中...',
      background: 'rgba(0, 0, 0, 0.7)',
    });
  },
});
</script>
