
<template>
  <!-- <router-link :to="{name: 'Example'}">Home</router-link>
  |
  <router-link :to="{name: 'Template2'}">T2</router-link>
  |
  <router-link :to="{name: 'Total'}">Total</router-link> -->
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
    const loading = ref(true);
    const changeLoading = (nV = false) => {
      loading.value = nV
    }
    provide('loading', readonly(loading));
    provide('changeLoading', changeLoading);
    return {
      loading,
    };
  },
});
</script>
<style>
html, body {
  height: 100%;
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

