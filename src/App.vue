<template>
  <div>
    <header class="flex">
      <div class="header-brand">
        <span class="header-brand-icon header-icon material-symbols-outlined">
          bigtop_updates
        </span>
        Tignal
      </div>
      <div class="header-btns">
        <button
          :class="['header-btn', { 'header-btn--active': tableIsActive }]"
          @click="setActiveTab('table')"
        >
          <span class="header-icon material-symbols-outlined">table</span>Table
        </button>
        <button
          :class="['header-btn', { 'header-btn--active': histogramIsActive }]"
          @click="setActiveTab('histogram')"
        >
          <span class="header-icon material-symbols-outlined">bar_chart_4_bars</span>
          Histogram
        </button>
      </div>
    </header>
    <div class="divider" />
    <main>
      <rates-table v-if="tableIsActive" :row-data="rowData" />
      <rates-histogram
        v-else-if="histogramIsActive"
        :distributions="distributions"
        :row-data="rowData"
      />
    </main>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import type { Distribution } from './constants/types'
import RatesTable from './components/RatesTable.vue'
import RatesHistogram from './components/RatesHistogram.vue'

const CODE = '99203'
const isLoaded = ref(false)
const rowData = ref([])
const distributions = ref<Distribution>({
  rate_min: 0,
  rate_max: 0,
  '5th': 0,
  '25th': 0,
  '50th': 0,
  '75th': 0,
  '95th': 0,
})
const activeTab = ref('table')

const tableIsActive = computed(() => activeTab.value === 'table')
const histogramIsActive = computed(() => activeTab.value === 'histogram')

const setActiveTab = (tab: string) => {
  activeTab.value = tab
}
onMounted(async () => {
  try {
    const response = await fetch(
      `https://neuron.serifhealth.com/api/rates/v1?network_template_ids=07c56f6b-82cd-44a4-af42-d570b6ae89c6&limit=1000&codes=${CODE}`,
      {
        headers: {
          'X-API-KEY': 'r/yBejUsc2RSzEDhzfQ3sBfP+x5HpjlWabscuYPWHZdijYCim3w9B3s0dLoL3j0A',
          Accept: 'application/json',
        },
      },
    )
    const data = await response.json()
    rowData.value = data[CODE]?.rates || []
    distributions.value = data[CODE]?.distribution || {}
    isLoaded.value = true
    console.log('Rates set:', rowData.value)
    console.log('Distribution set:', distributions.value)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})
</script>

<style scoped>
.header-brand,
.header-brand-icon {
  font-size: 3.75rem;
}
.header-brand {
  font-family: 'Merriweather';
  color: var(--color-header-text);
  font-weight: 700;
  display: flex;
  align-items: center;
}
.header-icon {
  color: var(--vt-c-yellow);
  padding-right: 0.5rem;
}
.header-btns {
  display: flex;
  align-items: center;
  margin-left: 1rem;
}
.header-btn {
  display: flex;
  align-items: center;
  font-size: 1rem;
  cursor: pointer;
  color: var(--color-header-text);
  font-weight: 600;
  margin-right: 1rem;
  border-radius: 24px;
  padding: 2px 8px;
  border: solid 1px var(--vt-c-gray-100);
}
.header-btn--active {
  background-color: var(--vt-c-yellow-200);
}
.divider {
  height: 1px;
  background-color: var(--vt-c-gray-100);
  opacity: 0.1;
  margin: 1rem 0;
}
</style>
