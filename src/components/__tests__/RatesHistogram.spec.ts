import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import RatesHistogram from '../RatesHistogram.vue'
import { nextTick } from 'vue'

// Mock getHistogramData
vi.mock('../../helpers/histogram', () => ({
  getHistogramData: vi.fn(() => ({
    binCenters: [1, 2, 3],
    counts: [5, 10, 15],
    min: 1,
    max: 3,
  })),
}))

describe('RatesHistogram.vue', () => {
  const distributions = {
    rate_min: 1,
    rate_max: 10,
    '5th': 2,
    '25th': 3,
    '50th': 5,
    '75th': 7,
    '95th': 9,
  }

  const rowData = [{ rate: 1 }, { rate: 2 }, { rate: 3 }, { rate: 4 }, { rate: 5 }]

  it('renders distribution cards with correct labels and values', () => {
    const wrapper = mount(RatesHistogram, {
      props: { distributions, rowData },
    })

    const cards = wrapper.findAll('.distribution-card')
    expect(cards.length).toBe(7)

    expect(cards[0].text()).toContain('Minimum rate')
    expect(cards[0].text()).toContain('$1')
    expect(cards[6].text()).toContain('Maximum rate')
    expect(cards[6].text()).toContain('$10')
  })

  it('calls getHistogramData with rowData', async () => {
    const { getHistogramData } = await import('../../helpers/histogram')
    const wrapper = mount(RatesHistogram, { props: { distributions, rowData } })
    await nextTick()
    expect(getHistogramData).toHaveBeenCalledWith(rowData)
  })

  it('renders a v-chart component', () => {
    const wrapper = mount(RatesHistogram, { props: { distributions, rowData } })
    const chart = wrapper.findComponent({ name: 'VChart' })
    expect(chart.exists()).toBe(true)
  })
})
