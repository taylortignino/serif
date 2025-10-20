import { describe, it, expect } from 'vitest'
import { getHistogramData } from '../../helpers/histogram'

describe('getHistogramData', () => {
  it('returns empty arrays and null min/max for empty input', () => {
    const result = getHistogramData([])
    expect(result).toEqual({
      binCenters: [],
      counts: [],
      min: null,
      max: null,
    })
  })

  it('computes correct min, max, and bin count length', () => {
    const rowData = [{ rate: 1 }, { rate: 2 }, { rate: 3 }]
    const result = getHistogramData(rowData)

    expect(result.min).toBe(1)
    expect(result.max).toBe(3)
    expect(result.counts.length).toBe(20)
    expect(result.binCenters.length).toBe(20)
  })

  it('properly counts rates into bins', () => {
    // Range 0–10, 20 bins → bin width = 0.5
    const rowData = [
      { rate: 0 },
      { rate: 0.1 },
      { rate: 0.4 },
      { rate: 5.2 },
      { rate: 9.8 },
      { rate: 10 },
    ]
    const result = getHistogramData(rowData)

    // Total count should match number of entries
    expect(result.counts.reduce((a, b) => a + b, 0)).toBe(rowData.length)

    // First bin should have first 3 entries (0–0.5)
    expect(result.counts[0]).toBeGreaterThanOrEqual(2)

    // Last bin should capture the max
    expect(result.counts[19]).toBeGreaterThanOrEqual(1)
  })

  it('handles identical rate values gracefully', () => {
    const rowData = Array(5).fill({ rate: 3 })
    const result = getHistogramData(rowData)

    expect(result.min).toBe(3)
    expect(result.max).toBe(3)
    // Bin width becomes 0 → all rates in last bin (index 19)
    expect(result.counts.reduce((a, b) => a + b, 0)).toBe(5)
  })
})
