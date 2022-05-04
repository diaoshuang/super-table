<template>
  <div class="show-area filters">
    <h4>筛选</h4>
    <el-date-picker
      v-model="selectDate"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions"
    >
    </el-date-picker>
  </div>
  <div class="show-area chart">
    <MyChart
      style="height: 200px"
      :loading="totalLoading"
      :chartOptions="chartOptions"
    />
  </div>
  <div class="show-area total-table">
    <h2>
      总表
      <el-button class="upload-button" @click="showUploadFile = !showUploadFile"
        >导入</el-button
      >
    </h2>
    <el-button type="text" @click="handleRefresh">刷新</el-button>
    <ELTable
      class="total-table"
      :data="tableData"
      @row-click="handleRowClick"
      :headers="headers"
    />
    <div class="show-right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNumber"
        :page-sizes="[10, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </div>
  </div>
  <div v-if="showRow" class="show-area sub-table">
    <SubTableWdt :key="(showRow as any).dateString" :rowData="showRow" />
  </div>
  <UploadFile v-model:show="showUploadFile" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { ElLoading } from 'element-plus';
import MyChart from '@/components/charts/Index.vue';
import ELTable from '@/components/canvas/ELTable.vue';
import SubTableWdt from '@/components/SubTableWdtShow.vue';
import UploadFile from '@/components/UploadFiles.vue';
import apis from '../apis';

export default defineComponent({
  name: 'TotalTable',
  components: {
    ELTable,
    SubTableWdt,
    MyChart,
    UploadFile,
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker: any) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '最近一个月',
            onClick(picker: any) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '最近三个月',
            onClick(picker: any) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            },
          },
        ],
      },
      selectDate: '',
      options: [
        {
          value: '销售总额',
          label: '销售总额',
        },
        {
          value: '总花费',
          label: '总花费',
        },
        {
          value: '总订单量',
          label: '总订单量',
        },
        {
          value: '资源成本',
          label: '资源成本',
        },
        {
          value: '客单价',
          label: '客单价',
        },
        {
          value: '投产比',
          label: '投产比',
        },
      ],
      chartShowItem: '销售总额',
      headers: [
        {
          label: '日期',
          children: [
            {
              label: '',
              prop: 'reportDate',
              className: 'hidden-cell',
              width: 150,
            },
            {
              label: '',
              prop: 'week',
              className: 'hidden-cell',
              width: 100,
            },
          ],
        },
        {
          label: '销售总额',
          prop: 'totalSales',
          minWidth: 100,
        },
        {
          label: '总花费',
          prop: 'totalExpenses',
          minWidth: 100,
        },
        {
          label: '总订单量',
          prop: 'orderQuantity',
          minWidth: 100,
        },
        {
          label: '资源成本',
          prop: 'conversionCost',
          minWidth: 100,
        },
        {
          label: '客单价',
          prop: 'customerPrice',
          minWidth: 100,
        },
        {
          label: '投产比',
          prop: 'proportionTotalInvestment',
          minWidth: 100,
        },
      ],
      keyValues: {
        销售总额: 'totalSales',
        总花费: 'totalExpenses',
        总订单量: 'orderQuantity',
        资源成本: 'conversionCost',
        客单价: 'customerPrice',
        投产比: 'proportionTotalInvestment',
      },
      tableData: [],
      strLocalFlag: 'localhost',
      pageNumber: 1,
      pageSize: 10,
      totalCount: 0,
      showRow: null,
      chartOptions: {},
      totalLoading: true,
      showUploadFile: false,
    };
  },
  created() {
    this.getTotalData();
  },
  methods: {
    handleRefresh() {
      this.getTotalData();
    },
    getDimensions() {
      const keys = Object.keys(this.keyValues);
      return ['date', ...keys];
    },
    getSource() {
      const arr: any[] = [];
      this.tableData.forEach((item: any) => {
        const obj: { [key: string]: string | number } = {
          date: item.reportDate,
        };
        Object.keys(this.keyValues).forEach((key: string) => {
          const value: string = (this as any).keyValues[key];
          obj[key] = item[value];
        });
        arr.push(obj);
      });
      return arr;
    },
    getShowChartOptions() {
      return {
        title: {
          text: this.chartShowItem,
        },
        xAxis: {
          type: 'category',
          data: [],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [],
            type: 'bar',
          },
        ],
      };
    },
    chartInit() {
      const dimensions: string[] = this.getDimensions();
      const source: any = this.getSource();
      const series = Object.keys(this.keyValues).map((key) => ({
        type: 'bar',
      }));
      this.chartOptions = {
        title: {
          text: '汇总数据',
        },
        legend: {},
        tooltip: {},
        dataset: {
          dimensions,
          source,
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series,
      };
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }: any) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          return [1, 2];
        } else if (columnIndex === 1) {
          return [0, 0];
        }
        if (columnIndex === 2) {
          return [2, 1];
        }
      } else if (columnIndex === 2) {
        return [0, 0];
      }
    },
    handleSizeChange(val: number) {
      this.pageSize = val;
      this.getTotalData();
    },
    handleCurrentChange(val: number) {
      this.pageNumber = val;
      this.getTotalData();
    },
    async getTotalData() {
      const params: TableDataParams = {
        page: this.pageNumber,
        perPage: this.pageSize,
      };
      this.totalLoading = true;
      const { data } = await apis.getWdtTableData(params);
      this.totalLoading = false;
      ElLoading.service().close();
      const { rows = [], count = 0 } = data.data;
      this.tableData = rows;
      this.chartInit();
      this.pageNumber = this.pageNumber;
      this.totalCount = count;
      this.strLocalFlag = 'api';
    },
    handleRowClick(row: any) {
      this.showRow = row;
    },
  },
});
</script>
<style lang="scss" scoped>
.show-area {
  background-color: #eee;
  border: 1px solid black;
  border-radius: 5px;
  margin: 10px 20px 20px;
  overflow: hidden;
  padding: 5px;
}
.upload-button {
  float: right;
}

.show-right {
  float: right;
  margin: 5px 0;

  &::after {
    content: '';
    display: table;
    clear: both;
  }
}
.sub-table {
  margin-bottom: 20px;
}
</style>
