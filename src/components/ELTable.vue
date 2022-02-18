<template>
  <el-table :data="data" v-bind="$attrs" style="width: 100%">
    <slot>
      <ColumnItem v-for="(item, index) of headers" :key="index" v-bind="item"/>
    </slot>
  </el-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ColumnItem from './table/ColumnItem.vue'

export default defineComponent({
  name: 'ELTable',
  components: {
    ColumnItem
  },
  props: {
    data: {type: Array, default() { return []}},
    headers: {type: Array, default() { return []}}
  }
})
</script>
<style lang="scss" scoped>
::v-deep {
  th.hidden-cell {
    display: none;
  }
}
</style>
