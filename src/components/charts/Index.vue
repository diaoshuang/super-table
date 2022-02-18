<template>
  <div class="chart-bar" ref="myChart" />
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import * as echarts from 'echarts';

export default defineComponent({
  name: 'echart-bar',
  props: {
    chartOptions: {
      type: Object,
      required: true,
    },
    id:{
      type:String,
    }
  },
  setup(props, { slots }) {
    let myChart = ref(null)

    onMounted(() => {
      initChart();
    })

    const initChart = () => {
      const showChart = echarts.init((myChart as any).value);
      showChart.setOption(props.chartOptions);
    };
    return { myChart };
  },
})
</script>
<style lang="scss" scoped>
.chart-bar{}
</style>