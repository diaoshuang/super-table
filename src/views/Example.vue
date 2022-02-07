<template>
  <ELTable :data="tableData" :headers="headers" :span-method="arraySpanMethod"/>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ELTable from '@/components/ELTable.vue'
export default defineComponent({
  name: 'Example',
  data() {
    return {
      headers: [
        {
          label: '日期',
          prop: 'date',
          width: '120'
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
          ]
        }
      ],
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
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
          return [2,1]
        }
      } else if (columnIndex === 2) {
        return [0,0]
      }
    },
  },
  components: {
    ELTable
  },
})
</script>
<style lang="scss" scoped>
</style>