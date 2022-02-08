<template>
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
      headers: [],
      tableData: [],
    };
  },
  async created() {
    // mock请求
    const {data} = await apis.getTableHeader();
    if (data.code === 0) {
      this.headers = data.data
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
