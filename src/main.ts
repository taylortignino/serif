// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'

// AG Grid
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-theme-alpine.css'

// ECharts
import ECharts from 'vue-echarts'
// Core
import * as echarts from 'echarts/core'
// Charts
import { BarChart } from 'echarts/charts'
// Components
import { TooltipComponent, GridComponent } from 'echarts/components'
// Renderer
import { CanvasRenderer } from 'echarts/renderers'

// Register required ECharts modules
echarts.use([BarChart, TooltipComponent, GridComponent, CanvasRenderer])

// Register components
const app = createApp(App)
app.component('v-chart', ECharts)

// AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule])

app.mount('#app')
