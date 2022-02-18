<template>
  <h2>明细({{ rowData.reportDate }})</h2>
  <ELTable
    :data="tableData"
    height="500"
    :headers="headers"
    :span-method="arraySpanMethod"
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
          label: '账户',
          prop: 'name',
          width: 200,
        },
        {
          label: '',
          prop: 'marketingGoal',
        },
        {
          label: '销售额',
          prop: 'totalOrder',
          width: 100,
        },
        {
          label: '花费',
          prop: 'totalCost',
          width: 100,
        },
        {
          label: '订单量',
          prop: 'totalOrderCount',
          width: 100,
        },
        {
          label: '资源成本',
          prop: 'resourceCost',
          width: 100,
        },
        {
          label: '客单价',
          prop: 'cup',
          width: 100,
        },
        {
          label: '投产比',
          prop: 'roi',
          width: 100,
        },
        {
          label: '展现量',
          prop: 'showCnt',
          width: 100,
        },
        {
          label: '点击量',
          prop: 'clickCnt',
          width: 100,
        },
        {
          label: '点击率',
          prop: 'clickThroughRate',
          width: 100,
        },
        {
          label: '订单转化率',
          prop: 'orderConversionRate',
          width: 120,
        },
        {
          label: '累计观看人数',
          prop: 'totalPlay',
          width: 120,
        },
        {
          label: '新增粉丝数',
          prop: 'dyFollow',
          width: 100,
        },
        {
          label: '加粉率',
          prop: 'powderAdditionRate',
          width: 100,
        },
        {
          label: '粉丝成本',
          prop: 'fanCost',
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
      const { data } = await apis.getSubTableData(params);
      const { content = [], totalElements = 0, pageNumber = 0 } = data;
      this.tableData = this.formatData(content);
      this.pageNumber = pageNumber + 1;
      this.totalCount = totalElements;
      this.strLocalFlag = 'api';
    },
    handleRowClick(row: any) {
      this.showDate = row.dateString;
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }: any) {
      if (rowIndex % 2 === 0 && columnIndex === 0) {
        return [2, 1];
      } else if (rowIndex % 2 === 1 && columnIndex === 0) {
        return [0, 0];
      }
    },
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
