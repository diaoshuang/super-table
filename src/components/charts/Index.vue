<template>
  <div class="chart-bar" ref="myChart" />
</template>
<script lang="ts" setup>
import { ref, reactive, watchEffect, nextTick } from 'vue';
import * as echarts from 'echarts';

const props = defineProps<{
  chartOptions: echarts.EChartsOption;
}>();
const myOptions = reactive(props.chartOptions);
const myChart = ref(null);

watchEffect(async () => {
  await nextTick();
  const showChart = echarts.init((myChart as any).value);
  showChart.setOption(myOptions);
});
</script>
<style lang="scss" scoped>
.chart-bar {
  height: 100%;
}
</style>
