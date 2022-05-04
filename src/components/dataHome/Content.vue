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
        <el-col :span="24">
          <FirstChart class="first-chart" :conditions="conditions" />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12"> 1</el-col>
        <el-col :span="12">2</el-col>
      </el-row>
    </slot>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import Filters from './Filter.vue';
import FirstChart from '@/components/dataCharts/FirstChart.vue';
import apis from '@/apis';

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
.data-line {
  background: #fff;
}
.data-line + .data-line {
  margin-top: 20px;
}
.first-chart {
  height: 500px;
}
</style>
