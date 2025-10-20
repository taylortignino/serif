import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import App from '../../App.vue'

// Mock child components so we don’t depend on their internals
vi.mock('../../components/RatesTable.vue', () => ({
  default: {
    name: 'RatesTable',
    template: '<div class="mock-table">Table</div>',
    props: ['rowData'],
  },
}))

vi.mock('../../components/RatesHistogram.vue', () => ({
  default: {
    name: 'RatesHistogram',
    template: '<div class="mock-histogram">Histogram</div>',
    props: ['distributions', 'rowData'],
  },
}))

describe('App.vue', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the table view by default', async () => {
    const wrapper = mount(App)

    // Wait for all reactivity & lifecycle hooks
    await flushPromises()

    // Should show table and not histogram
    expect(wrapper.find('.mock-table').exists()).toBe(true)
    expect(wrapper.find('.mock-histogram').exists()).toBe(false)

    // Active button styling should be applied to table button
    const tableButton = wrapper.findAll('button')[0]
    expect(tableButton.classes()).toContain('header-btn--active')
  })

  it('switches to histogram view when the button is clicked', async () => {
    const wrapper = mount(App)

    await flushPromises()

    // Click histogram button
    const histogramButton = wrapper.findAll('button')[1]
    await histogramButton.trigger('click')
    await flushPromises()

    // Should now show histogram, not table
    expect(wrapper.find('.mock-histogram').exists()).toBe(true)
    expect(wrapper.find('.mock-table').exists()).toBe(false)

    // Active button class updates
    expect(histogramButton.classes()).toContain('header-btn--active')
  })

  it('fetches and sets rowData and distributions correctly', async () => {
    const mockResponse = {
      '99203': {
        rates: [{ rate: 100 }, { rate: 200 }],
        distribution: { rate_min: 100, rate_max: 200 },
      },
    }

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      }),
    ) as unknown as typeof fetch

    const wrapper = mount(App)
    await flushPromises()

    // Verify fetch call was made
    expect(global.fetch).toHaveBeenCalledOnce()

    // Check that child components received correct props
    const tableComponent = wrapper.findComponent({ name: 'RatesTable' })
    expect(tableComponent.props('rowData')).toEqual(mockResponse['99203'].rates)

    // Switch to histogram view
    const histogramButton = wrapper.findAll('button')[1]
    await histogramButton.trigger('click')
    await flushPromises()

    const histogramComponent = wrapper.findComponent({ name: 'RatesHistogram' })
    expect(histogramComponent.props('distributions')).toEqual(mockResponse['99203'].distribution)
  })
})
