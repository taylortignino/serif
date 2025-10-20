export const getHistogramData = (
  rowData: { rate: number }[],
): {
  binCenters: number[]
  counts: number[]
  min: number | null
  max: number | null
} => {
  if (!rowData.length) {
    return { binCenters: [], counts: [], min: null, max: null }
  }

  const rates = rowData.map((r) => r.rate)
  const bins = 20
  const min = Math.min(...rates)
  const max = Math.max(...rates)

  // Handle identical rates (avoid division by zero)
  if (min === max) {
    const counts = Array(bins).fill(0)
    counts[bins - 1] = rates.length
    const binCenters = Array.from({ length: bins }, (_, i) => min + i)
    return { binCenters, counts, min, max }
  }

  const binWidth = (max - min) / bins
  const counts = Array(bins).fill(0)
  rates.forEach((rate) => {
    const index = Math.min(Math.floor((rate - min) / binWidth), bins - 1)
    counts[index] += 1
  })

  const binCenters = Array.from({ length: bins }, (_, i) => min + (i + 0.5) * binWidth)
  return { binCenters, counts, min, max }
}
