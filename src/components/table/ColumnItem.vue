<template>
  <el-table-column :prop="prop" v-bind="$attrs">
    <template v-slot="{row}">
      <template v-if="$slots.scope">
        <slot name="scope" :row="row"/>
      </template>
      <template v-else>
        {{row[prop]}}
      </template>
      <template v-if="children && children.length">
        <ColumnItem v-for="(item, index) of children" :key="index" v-bind="item" />
      </template>
    </template>
  </el-table-column>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ColumnItem',
  props: ['children', 'prop'],
})
</script>
