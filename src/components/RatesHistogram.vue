<template>
  <div class="rates-histogram">
    <div class="distribution-cards flex">
      <div v-for="card in distributionCardData" :key="card.label" class="distribution-card">
        <div class="distribution-card-header">{{ card.label }}</div>
        ${{ card.value }}
      </div>
    </div>
    <v-chart class="rates-histogram-chart" :option="histogramOptions" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, defineProps } from 'vue'
import VChart from 'vue-echarts'
import * as echarts from 'echarts'
import { getHistogramData } from '../helpers/histogram'
import type { Distribution } from '../constants/types'
const props = defineProps<{
  distributions: Distribution
  rowData: { rate: number }[]
}>()

const distributionCardData = computed(() => [
  { label: 'Minimum rate', value: props.distributions.rate_min },
  { label: '5th percentile', value: props.distributions['5th'] },
  { label: '25th percentile', value: props.distributions['25th'] },
  { label: '50th percentile', value: props.distributions['50th'] },
  { label: '75th percentile', value: props.distributions['75th'] },
  { label: '95th percentile', value: props.distributions['95th'] },
  { label: 'Maximum rate', value: props.distributions.rate_max },
])

// ---- Histogram ----
const histogramOptions = computed(() => {
  const { binCenters, counts, min, max } = getHistogramData(props.rowData)

  return {
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    xAxis: {
      type: 'value',
      name: 'Rate ($)',
      min: min ?? 0,
      max: max ?? 0,
      splitNumber: 10,
    },
    yAxis: { type: 'value', name: 'Counts' },
    series: [
      {
        name: 'Counts',
        type: 'bar',
        data: binCenters.map((x: number, i: number) => [x, counts[i]]),
        barWidth: '90%',
      },
    ],
  }
})
</script>

<style scoped>
.rates-histogram {
  display: flex;
}
.rates-histogram-chart {
  height: calc(100vh - var(--header-height));
  width: 100%;
  margin-left: 24px;
}
.distribution-cards {
  justify-content: space-between;
  flex-direction: column;
}
.distribution-card {
  background-color: var(--vt-c-gray-50);
  border: 1px solid var(--vt-c-gray-200);
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 16px;
  color: var(--vt-c-gray-100);
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
.distribution-card-header {
  font-weight: 600;
  margin-right: 8px;
}
</style>
