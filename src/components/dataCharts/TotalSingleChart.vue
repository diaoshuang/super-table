<script lang="ts" setup>
import { computed, ref, toRefs, watchEffect } from 'vue';
import Chart from '@/components/charts/Index.vue';
import { EChartsOption } from 'echarts';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants/fields';
import apis from '@/apis';
interface Props {
  conditions: {
    selectDate: string;
  };
  keys: ChartField[];
  title?: string;
  customOptions?: EChartsOption;
}

// -------------------- 配置处理 -------------------------
const props = defineProps<Props>();

const { conditions, keys, title, customOptions } = toRefs(props);

const dataParams = computed(() => {
  if (!conditions.value.selectDate) {
    return null;
  }
  const yestoday = dayjs().subtract(1, 'd');
  const endTime = yestoday.format(DATE_FORMAT);
  const deviationValue = conditions.value.selectDate.split(',');
  const startTime = dayjs()
    .subtract(Number(deviationValue[0]), deviationValue[1])
    .format(DATE_FORMAT);
  const field = keys.value;
  return {
    startTime,
    endTime,
    marketingGoal: 'NULL',
    type: 'date',
    field,
  };
});
const options = computed<EChartsOption>(() => {
  const series: any[] = keys.value.map((key) => ({
    name: key.describe,
    type: key.chartType || 'bar',
    yAxisIndex: key.yAxisIndex || 0,
    data: [],
  }));
  return {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: keys.value.map((key) => key.describe),
    },
    xAxis: { type: 'category' },
    yAxis: {},
    series,
    ...(customOptions?.value || {}),
  };
});

// -------------------- 数据处理 -------------------------
const loading = ref(true);
const errorMsg = ref('');
const chartOptions = ref<EChartsOption | null>(null);

const setXAxisData = (data: (string | number)[][]) => {
  const xAxis = options.value.xAxis;
  if (Array.isArray(xAxis)) {
    xAxis.forEach((xItem: any, index) => {
      xItem.data = [];
      data.forEach((item) => {
        (xAxis as any).data.push(item[index]);
      });
    });
    return;
  }
  (xAxis as any).data = [];
  data.forEach((item) => {
    (xAxis as any).data.push(item[0]);
  });
  return xAxis;
};

const setSeriesData = (data: (string | number)[][]) => {
  const series = options.value.series;
  const xAxis = options.value.xAxis;
  if (!series) return;
  let flag = 1;
  if (Array.isArray(xAxis)) {
    flag = xAxis.length;
  }
  if (!Array.isArray(series)) {
    series.data = [];
    data.forEach((item) => {
      (series.data as Array<string | number>).push(item[flag] || '');
    });
    return;
  }
  series.forEach((seriesItem) => {
    seriesItem.data = [] as Array<string | number>;
  });
  data.forEach((item) => {
    series.forEach((seriesItem, index) => {
      (seriesItem.data as Array<string | number>).push(item[index + flag]);
    });
  });
  return series;
};

const initOptionData = async () => {
  loading.value = true;
  // 获取数据列表
  if (!dataParams.value) {
    loading.value = false;
    errorMsg.value = '请求参数有误！';
    return null;
  }
  const res = await apis.getDataInfo(dataParams.value);
  if (!res || res.status !== 0) {
    loading.value = false;
    errorMsg.value = res.msg || '请求异常，请稍后再试！';
    return null;
  }
  const xAxis = setXAxisData(res.data);
  const series = setSeriesData(res.data);
  const op: EChartsOption = {
    ...options.value,
    xAxis,
    series,
  };
  if (res.data.length > 40) {
    op.dataZoom = [
      {
        show: true,
        start: 0,
        end: 100,
      },
    ];
  }
  chartOptions.value = op;
  loading.value = false;
};

watchEffect(() => {
  if (conditions.value.selectDate && keys.value) {
    initOptionData();
  }
});
</script>
<template>
  <div class="chart-content" v-loading="loading">
    <h3 v-if="title">{{ title }}</h3>
    <el-result
      v-if="!loading && errorMsg"
      icon="error"
      title="出错啦～～"
      :sub-title="errorMsg"
    />
    <component
      v-if="chartOptions && !loading"
      class="chart-item"
      :is="Chart"
      :chartOptions="chartOptions"
    />
  </div>
</template>
<style lang="scss" scoped>
.chart-content {
  background: #fff;
  padding: 30px;
}
</style>
