<template>
  <div class="flex">
    <ag-grid-vue
      class="table"
      :column-defs="columnDefs"
      :row-data="props.rowData || []"
      animate-rows
    />
  </div>
</template>

<script setup lang="ts">
import { columnDefs } from '../constants/columns'
import { onMounted, ref, computed, defineProps } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'

const props = defineProps<{
  rowData: { rate: number }[]
}>()
</script>

<style scoped>
@import 'ag-grid-community/styles/ag-grid.css';
.flex {
  display: flex;
}
.table {
  width: 100%;
  height: 800px;
}
</style>
