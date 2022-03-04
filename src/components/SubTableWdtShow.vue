<template>
  <h2>明细({{ rowData.reportDate }})</h2>
  <ELTable
    :data="tableData"
    height="500"
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
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ELTable from '@/components/ELTable.vue';
import apis from '../apis';

interface RowData {
  id: number;
  dateString: string;
  date: string;
  week: string;
  totalOrder: number;
  totalCost: number;
  totalOrderCount: number;
  resourceCost: number;
  cup: number;
  roi: number;
}

export default defineComponent({
  name: 'SubTable',
  components: {
    ELTable,
  },
  props: {
    rowData: { type: Object, required: true },
  },
  data() {
    return {
      headers: [
        {
          label: '平台',
          prop: 'platform',
          width: 200,
        },
        {
          label: '总销售额',
          prop: 'totalSales',
          width: 100,
        },
        {
          label: '总花销',
          prop: 'totalExpenses',
          width: 100,
        },
        {
          label: '总投产比',
          prop: 'proportionTotalInvestment',
          width: 100,
        },
        {
          label: '浏览量',
          prop: 'views',
          width: 100,
        },
        {
          label: '访客数',
          prop: 'numberVisitors',
          width: 100,
        },
        {
          label: '订单量',
          prop: 'customerPrice',
          width: 100,
        },
        {
          label: '客单价',
          prop: 'customerPrice',
          width: 100,
        },
        {
          label: '转化率',
          prop: 'conversionRate',
          width: 100,
        },
        {
          label: '转化成本',
          prop: 'conversionCost',
          width: 100,
        },
        {
          label: '站内花费',
          prop: 'stationExpenses',
          width: 100,
        },
        {
          label: '站内成交金额',
          prop: 'transactionStation',
          width: 110,
        },
        {
          label: '站内投产比',
          prop: 'productionRatio',
          width: 100,
        },
        {
          label: '复购金额',
          prop: 'repurchaseAmount',
          width: 100,
        },
        {
          label: '复购占比',
          prop: 'purchaseReadiness',
          width: 100,
        },
        {
          label: '站外花费',
          prop: 'offStationExpenses',
          width: 100,
        },
        {
          label: '站外成交额',
          prop: 'offSiteTurnover',
          width: 100,
        },
        {
          label: '站外投占比',
          prop: 'offInvestment',
          width: 100,
        },
      ],
      tableData: [],
      strLocalFlag: 'localhost',
      pageNumber: 1,
      pageSize: 10,
      totalCount: 0,
      showDate: '',
      dateString: '',
    };
  },
  created() {
    this.dateString = (this.rowData as RowData).dateString;
    this.getTotalData();
  },
  methods: {
    handleSizeChange(val: number) {
      this.pageSize = val;
      this.getTotalData();
    },
    handleCurrentChange(val: number) {
      this.pageNumber = val;
      this.getTotalData();
    },
    formatData(data: any[]): any {
      var arr: any[] = [];
      data.forEach((item) => {
        const name = item.kqShop.name || '';
        const list = item.list.map((l: {}) => ({ name, ...l }));
        arr = arr.concat(list);
      });
      return arr;
    },
    async getTotalData() {
      const params = {
        pageNumber: this.pageNumber - 1,
        pageSize: this.pageSize,
        dateString: this.dateString,
      };
      const { data } = await apis.getWdtSubTableData(params);
      const { list = [], totalElements = 0, pageNumber = 0 } = data.data;
      this.tableData = list; // this.formatData(list);
      this.pageNumber = pageNumber + 1;
      this.totalCount = totalElements;
      this.strLocalFlag = 'api';
    },
    handleRowClick(row: any) {
      this.showDate = row.dateString;
    },
    // arraySpanMethod({ row, column, rowIndex, columnIndex }: any) {
    //   if (rowIndex % 2 === 0 && columnIndex === 0) {
    //     return [2, 1];
    //   } else if (rowIndex % 2 === 1 && columnIndex === 0) {
    //     return [0, 0];
    //   }
    // },
  },
});
</script>
<style lang="scss" scoped>
.show-right {
  float: right;
  margin: 5px 0;

  &::after {
    content: '';
    display: table;
    clear: both;
  }
}
</style>
