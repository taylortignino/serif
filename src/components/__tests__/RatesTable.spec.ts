import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import RatesTable from '../RatesTable.vue'

// Mock ag-grid-vue3 so it doesn’t load the real grid engine
vi.mock('ag-grid-vue3', () => ({
  AgGridVue: {
    name: 'AgGridVue',
    template: '<div class="mock-grid"><slot /></div>',
    props: ['columnDefs', 'rowData'],
  },
}))

describe('RatesTable.vue', () => {
  const rowData = [{ rate: 1.2 }, { rate: 2.5 }, { rate: 3.1 }]

  it('renders the AgGridVue component', () => {
    const wrapper = mount(RatesTable, {
      props: { rowData },
    })
    const grid = wrapper.findComponent({ name: 'AgGridVue' })
    expect(grid.exists()).toBe(true)
  })

  it('passes the correct rowData prop to AgGridVue', () => {
    const wrapper = mount(RatesTable, {
      props: { rowData },
    })
    const grid = wrapper.findComponent({ name: 'AgGridVue' })
    expect(grid.props('rowData')).toEqual(rowData)
  })

  it('renders with an empty array if no rowData is provided', () => {
    const wrapper = mount(RatesTable)
    const grid = wrapper.findComponent({ name: 'AgGridVue' })
    expect(grid.props('rowData')).toEqual([])
  })
})
