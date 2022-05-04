<script lang="ts" setup>
import { computed, reactive, ref, toRefs, watch, watchEffect } from 'vue';
import Chart from '@/components/charts/Index.vue';
import SetData from '@/components/setData/Index.vue';
import { EChartsOption } from 'echarts';
import dayjs from 'dayjs';
import { DATA_HOME, DATE_FORMAT } from '@/constants/fields';
import apis from '@/apis';
type ShowItem = {
  label: string | number;
  value: string | number;
};
interface Props {
  conditions: {
    selectDate: string;
  };
}

// -------------------- 配置处理 -------------------------
const props = defineProps<Props>();

const { conditions } = toRefs(props);

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
  const field = [DATA_HOME.pay_order_amount, DATA_HOME.stat_cost];
  return {
    startTime,
    endTime,
    marketingGoal: 'NULL',
    type: 'date',
    field,
  };
});
const options = computed<EChartsOption>(() => {
  const series: any[] = [
    DATA_HOME.pay_order_amount.describe,
    DATA_HOME.stat_cost.describe,
  ].map((key) => ({
    name: key,
    type: 'bar',
    data: [],
    markLine: {
      data: [{ type: 'average', name: 'Avg' }],
    },
  }));
  return {
    title: {
      text: '平台整体数据情况',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: [DATA_HOME.pay_order_amount.describe, DATA_HOME.stat_cost.describe],
    },
    xAxis: { type: 'category' },
    yAxis: {},
    series,
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
  console.log(res);
  const op: EChartsOption = {
    ...options.value,
    xAxis,
    series,
  };
  chartOptions.value = op;
  loading.value = false;
};

watchEffect(() => {
  if (conditions.value.selectDate) {
    initOptionData();
  }
});
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
      v-if="chartOptions && !loading"
      class="chart-item"
      :is="Chart"
      :chartOptions="chartOptions"
    />
  </div>
</template>
<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  padding: 0;
  .header {
    background: #fff;
    height: 60px;
    padding-left: 20px;
  }
  .chart-content {
    flex: 1;
    margin: 30px;
    .filter-line + .filter-line {
      margin-top: 20px;
    }
    .data-line {
      background: #fff;
    }
    .first-chart {
      height: 500px;
    }
  }
}
</style>
