<template>
  <h1>{{strLocalFlag}}</h1>
  <ELTable
    :data="tableData"
    :headers="headers"
    :span-method="arraySpanMethod"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ELTable from '@/components/ELTable.vue';
import apis from '../apis';

export default defineComponent({
  name: 'Example',
  components: {
    ELTable,
  },
  data() {
    return {
      headers: [
          {
            label: '日期',
            prop: 'date',
            width: '120',
          },
          {
            label: '配送信息',
            children: [
              {
                label: '姓名',
                prop: 'name',
              },
              {
                label: '地址',
                prop: '',
                children: [
                  {
                    label: '省份',
                    prop: 'province',
                  },
                  {
                    label: '市区',
                    prop: 'city',
                  },
                  {
                    label: '地址',
                    prop: 'address',
                  },
                  {
                    label: '邮编',
                    prop: 'zip',
                  },
                ],
              },
            ],
          },
          {
            label: '订单信息',
          }
        ],
      tableData: [
          {
            date: '2016-05-03',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
          },
          {
            date: '2016-05-08',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
          },
          {
            date: '2016-05-06',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
          },
          {
            date: '2016-05-07',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
          },
        ],
      strLocalFlag: 'localhost',
    };
  },
  async created() {
    // mock请求
    const {data} = await apis.getTableHeader();
    if (data.code === 0) {
      this.headers = data.data
      this.strLocalFlag = 'mock'
    }
    const {data: tableData} = await apis.getTableData();
    if (tableData.code === 0) {
      this.tableData = tableData.data
    }
  },
  methods: {
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
  },
});
</script>
<style lang="scss" scoped></style>
