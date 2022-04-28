<template>
  <PageLoading v-if="loading" />
  <router-view></router-view>
</template>
<script setup name="Total" lang="ts">
import { provide, readonly, ref } from 'vue';
import PageLoading from '@/components/PageLoading.vue';

const loading = ref(false);
const changeLoading = (nV = false) => {
  loading.value = nV;
};
provide('loading', readonly(loading));
provide('changeLoading', changeLoading);
const handleTest = () => {
  console.log('href:', location.href);
};
</script>
<style>
html,
body {
  box-sizing: content-box;
  font-family: 'PingFang SC';
  font-size: 16px;
  height: 100%;
  overflow: scroll;
  width: 100%;
  scroll-behavior: smooth;
  margin: 0;
  padding: 0;
}
h1,
h2,
h3,
h4 {
  margin: 0;
  padding: 0;
}
</style>
