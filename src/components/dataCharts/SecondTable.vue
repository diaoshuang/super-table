<script lang="ts" setup>
import { computed, reactive, ref, toRefs, watch, watchEffect } from 'vue';
import ELTable from '@/components/canvas/ELTable.vue';
import dayjs from 'dayjs';
import { DATA_HOME, DATE_FORMAT } from '@/constants/fields';
import apis from '@/apis';
interface Props {
  conditions: {
    selectDate: string;
  };
}

// -------------------- 配置处理 -------------------------
const headers = ref([
  {
    label: '店铺名称',
    prop: 'shopId',
    'show-overflow-tooltip': true,
    minWidth: 200,
  },
  {
    label: '消耗',
    prop: 'statCost',
    minWidth: 120,
  },
  {
    label: '千次展示费用',
    prop: 'cpmPlatform',
    minWidth: 120,
  },
  {
    label: '点击数',
    prop: 'clickCnt',
    minWidth: 120,
  },
  {
    label: '点击率',
    prop: 'ctr',
    minWidth: 120,
  },
  {
    label: '成交订单量',
    prop: 'payOrderCount',
    minWidth: 120,
  },
  {
    label: '成交订单额',
    prop: 'payOrderAmount',
    minWidth: 120,
  },
  {
    label: '成交率',
    prop: 'turnoverRate',
    minWidth: 120,
  },
  {
    label: '下单成交金额',
    prop: 'createOrderAmount',
    minWidth: 120,
  },
]);
const tableData = ref<Array<TableDataItem>>([]);

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
  return {
    startTime,
    endTime,
  };
});

// -------------------- 数据处理 -------------------------
const loading = ref(true);
const errorMsg = ref('');

const initData = async () => {
  loading.value = true;
  // 获取数据列表
  if (!dataParams.value) {
    loading.value = false;
    errorMsg.value = '请求参数有误！';
    return null;
  }
  const res = await apis.getAdTop10Data(dataParams.value);
  if (!res || res.status !== 0) {
    loading.value = false;
    errorMsg.value = res.msg || '请求异常，请稍后再试！';
    return null;
  }
  console.log(res.data);
  // formatTableData(res.data)
  tableData.value = res.data;
  loading.value = false;
};

watchEffect(() => {
  if (conditions.value.selectDate) {
    initData();
  }
});

// -------------------------- 操作 --------------------------
const handleRowClick = (row: TableDataItem) => {
  console.log(row);
};
</script>
<template>
  <div class="chart-table" v-loading="loading">
    <h3 class="title">广告账户情况 Top10</h3>
    <ELTable
      class="total-table"
      :data="tableData"
      @row-click="handleRowClick"
      :headers="headers"
    />
  </div>
</template>
<style lang="scss" scoped>
.chart-table {
  background: #fff;
  padding: 30px;
  .title {
    margin-bottom: 20px;
  }
}
</style>
