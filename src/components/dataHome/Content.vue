<template>
  <div v-loading="totalLoading">
    <slot name="filters">
      <Filters>
        <!-- <div class="shop-list filter-line">
          <el-select
            v-if="userShops.length > 1"
            v-model="selectShop"
            style="width: 300px"
            size="large"
          >
            <el-option
              v-for="item in userShops"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <h2 v-else-if="userShops.length === 1">
            {{ userShops[0].label || userShops[0].value }}
          </h2>
        </div> -->
        <div class="date-select filter-line">
          <el-radio-group v-model="selectDate" size="large">
            <el-radio-button
              v-for="item of dateList"
              :key="item.value"
              :label="item.value"
              >{{ item.label }}</el-radio-button
            >
          </el-radio-group>
        </div>
      </Filters>
    </slot>
    <slot name="canvas">
      <el-row class="data-line">
        <el-col class="data-area" :span="24">
          <FirstChart class="first-chart" :conditions="conditions" />
        </el-col>
      </el-row>
      <el-row class="data-line">
        <el-col class="data-area" :span="24">
          <SecondTable class="first-chart" :conditions="conditions" />
        </el-col>
      </el-row>
      <el-row class="data-line" :gutter="20">
        <el-col class="data-area" :span="12">
          <TotalSingleChart
            class="small-chart"
            title="账户总消耗/总收入情况"
            :keys="totalCostPay"
            :conditions="conditions"
          />
        </el-col>
        <el-col class="data-area" :span="12">
          <TotalSingleChart
            title="账户订单金额/订单转化率情况"
            :keys="order"
            :customOptions="customOptions"
            class="small-chart"
            :conditions="conditions"
          />
        </el-col>
      </el-row>
      <el-row class="data-line" :gutter="20">
        <el-col class="data-area" :span="12">
          <TotalSingleChart
            class="small-chart"
            title="账户成交金额/订单成交率情况"
            :keys="deal"
            :customOptions="customOptions"
            :conditions="conditions"
          />
        </el-col>
        <el-col class="data-area" :span="12">
          <TotalSingleChart
            title="账户展示数/点击率情况"
            :keys="showClick"
            :customOptions="customOptions"
            class="small-chart"
            :conditions="conditions"
          />
        </el-col>
      </el-row>
    </slot>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref, reactive } from 'vue';
import Filters from './Filter.vue';
import TotalSingleChart from '@/components/dataCharts/TotalSingleChart.vue';
import FirstChart from '@/components/dataCharts/FirstChart.vue';
import SecondTable from '@/components/dataCharts/SecondTable.vue';
import { DATA_HOME } from '@/constants/fields';
import apis from '@/apis';
import { EChartsOption } from 'echarts';

const totalCostPay = ref([DATA_HOME.stat_cost2, DATA_HOME.pay_order_amount2]);
const order = ref([
  DATA_HOME.create_order_amount,
  {
    ...DATA_HOME.convert_rate,
    chartType: 'line',
    yAxisIndex: 1,
  },
]);
const customOptions = ref<EChartsOption & any>({
  yAxis: [
    {
      type: 'value',
      name: DATA_HOME.create_order_amount.describe,
    },
    {
      type: 'value',
      name: DATA_HOME.convert_rate.describe,
      axisLabel: {
        formatter: '{value} %',
      },
    },
  ],
});

const deal = ref([
  DATA_HOME.pay_order_amount3,
  {
    ...DATA_HOME.pay_order_rate,
    chartType: 'line',
    yAxisIndex: 1,
  },
]);
const showClick = ref([
  DATA_HOME.show_cnt,
  {
    ...DATA_HOME.ctr,
    chartType: 'line',
    yAxisIndex: 1,
  },
]);

type ShowItem = {
  label: string | number;
  value: string | number;
};
const DATE_FORMAT = 'YYYYMMDD';

const totalLoading = ref(true);
const userShops = ref<ShowItem[]>([]);
const selectShop = ref<string>('');
const conditions = computed(() => {
  return {
    selectDate: selectDate.value,
  };
});
// const dataParams = ref<DataInfoParams | null>(null);
// value格式固定：xxx,ttt
// xxx : 偏移数值
// ttt : 偏移单位（d - 天，w - 周，M - 月，Q - 季， y - 年）
const dateList = ref<ShowItem[]>([
  {
    label: '近7天',
    value: '7,d',
  },
  {
    label: '近1月',
    value: '1,M',
  },
  {
    label: '近3月',
    value: '3,M',
  },
  {
    label: '近半年',
    value: '6,M',
  },
  {
    label: '近1年',
    value: '1,y',
  },
]);
const selectDate = ref('');
const initUserShopList = async () => {
  // 获取用户商铺列表
  const res = await apis.getUserShopList();
  if (res && res.data) {
    userShops.value = (res.data || []).map((item) => ({
      value: item.shopId,
      label: item.shopName || item.shopId,
    }));
    selectShop.value = (userShops.value[0]?.value || '') + '';
  }
};

onMounted(async () => {
  selectDate.value = dateList.value[0].value + '';
  totalLoading.value = false;
});
</script>
<style lang="scss" scoped>
.filter-line + .filter-line {
  margin-top: 20px;
}
.data-line + .data-line {
  margin-top: 20px;
}
.first-chart {
  height: 500px;
}
.small-chart {
  background: #fff;
  margin: 0;
  height: 350px;
}
</style>
