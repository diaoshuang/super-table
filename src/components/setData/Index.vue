<script lang="ts" setup name="SetData">
import { ref, toRefs, watch } from 'vue';
import apis from '@/apis';
import { EChartsOption } from 'echarts';
const loading = ref(true);
const errorMsg = ref('');
const chartOptions = ref<EChartsOption | null>(null);

interface Props {
  params: DataInfoParams;
  chart: any;
  keys?: string[];
  title?: string;
  options: any;
  selectDate?: string;
}
const props = defineProps<Props>();
const { params, chart, options, keys, title } = toRefs(props);

const getDimensions = () => {
  const keys = params.value?.field?.map((field) => field.describe) || [];
  return [...keys];
};
const setXAxisData = (data: (string | number)[][]) => {
  const xAxis = options.value.xAxis[0];
  xAxis.data = [];
  data.forEach((item) => {
    xAxis.data.push(item[0]);
  });
  return [xAxis];
};
const setSeriesData = (data: (string | number)[][]) => {
  const series: { data: (string | number)[] }[] = options.value.series;
  series.forEach((seriesItem) => {
    seriesItem.data = [];
  });
  data.forEach((item) => {
    series.forEach((seriesItem, index) => {
      seriesItem.data.push(item[index + 1]);
    });
  });
  return series;
};
const initOptionData = async () => {
  loading.value = true;
  // 获取数据列表
  if (!params.value) {
    loading.value = false;
    errorMsg.value = '请求参数有误！';
    return null;
  }
  const res = await apis.getDataInfo(params.value);
  if (!res || res.status !== 0) {
    loading.value = false;
    errorMsg.value = res.msg || '请求异常，请稍后再试！';
    return null;
  }
  const dimensions = keys || getDimensions();
  const xAxis = setXAxisData(res.data);
  const series = setSeriesData(res.data);
  console.log(res);
  const op: EChartsOption = {
    title: {
      text: props.title,
    },
    ...options.value,
    xAxis,
    series,
  };
  loading.value = false;
  console.log(op);
  chartOptions.value = op;
};

watch(
  () => params,
  () => {
    initOptionData();
  },
  { deep: true }
);
</script>
<template>
  <div class="chart-content" v-loading="loading">
    <el-result
      v-if="!loading && errorMsg"
      icon="error"
      title="出错啦～～"
      :sub-title="errorMsg"
    />
    <component
      v-if="chartOptions"
      class="chart-item"
      :is="chart"
      :loading="loading"
      :chartOptions="chartOptions"
    />
  </div>
</template>
<style lang="scss" scoped>
.chart-content {
  height: 200px;
  .chart-item {
    height: 100%;
    width: 100%;
  }
}
</style>
