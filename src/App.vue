
<template>
  <PageLoading v-if="loading" />
  <router-view></router-view>
</template>
<script lang="ts">
import { defineComponent, provide, readonly, ref } from 'vue';
import PageLoading from "@/components/PageLoading.vue";
export default defineComponent({
  name: 'Total',
  components: {
    PageLoading,
  },
  setup() {
    const loading = ref(false);
    const changeLoading = (nV = false) => {
      loading.value = nV
    }
    provide('loading', readonly(loading));
    provide('changeLoading', changeLoading);
    const handleTest = () => {
      console.log('href:', location.href)
    }
    return {
      loading,
      handleTest
    };
  },
});
</script>
<style>
html, body {
  min-height: 100%;
  width: 100%;
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
#app {
  overflow: hidden;
}
</style>

