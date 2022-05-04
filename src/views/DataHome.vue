<script lang="ts" setup>
import Sidebar from '@/components/sidebar/Index.vue';
import Header from '@/components/Header.vue';
import Content from '@/components/dataHome/Content.vue';
</script>
<template>
  <el-container class="data-home">
    <Sidebar class="sidebar" />
    <el-container>
      <el-header class="header"> <Header /> </el-header>
      <el-main class="content">
        <Content />
      </el-main>
    </el-container>
  </el-container>
</template>
<style lang="scss" scoped>
.data-home {
  background: #f7f7f8;
  .sidebar {
    background: #fff;
  }
  .header {
    background: #fff;
    height: 60px;
    padding: 0 10px;
  }
  .content {
    width: calc(100% - 60px);
    height: calc(100vh - 120px);
    overflow-y: auto;
    margin: 0 30px;
    padding: 30px 0;
  }
}
</style>
