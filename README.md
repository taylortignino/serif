# Serif Project

## Project Setup

```sh
npm install
```

## Compile and Hot-Reload for Development

```sh
npm run dev
```

## Type-Check, Compile and Minify for Production

```sh
npm run build
```

## Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

## Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Project Overview

This project fetches and displays rate data from the Serif API. The main functionality includes:

- **Table View:** Displays a tabular view of rate data for a specific code.
- **Histogram View:** Shows distributions of rates across percentiles (5th, 25th, 50th, 75th, 95th).

### Approach and Decisions

- **Data Fetching:** Used `fetch` with `async/await` in `onMounted` to retrieve rate data.
- **State Management:** Managed active tabs and fetched data using Vue `ref` and `computed`.
- **Component Design:**
  - `App.vue` for site header, data fetching and page view
  - `RatesTable.vue` for tabular data display
  - `RatesHistogram.vue` for histogram visualizations
- **Styling:** Scoped CSS was used with clear naming conventions for maintainability.

### Assumptions

- The API always returns data in the expected format.
- API keys are temporary and safe to use for demonstration purposes.
- Only one code (`99203`) is used for demonstration purposes.
- The dataset is small enough to fetch entirely on mount without pagination.

### Additional Insights

- Tables include relevant metrics such as rate values and distributions.
- Histograms provide a clear visual understanding of rate spread across percentiles.
- Components are designed to be reusable if additional codes or metrics need to be added.

## Future Improvements / Additional Work

If more time were available, the following enhancements could be implemented:

1. **Dynamic Code Selection:** Allow the user to select from multiple codes instead of hardcoding `99203`.
2. **Pagination or Lazy Loading:** Support larger datasets efficiently in the table view.
3. **Enhanced Histograms:** Include tooltips, colored ranges, or comparison with national averages.
4. **Filtering and Sorting:** Add filtering by rate ranges, distributions, or provider attributes.
5. **Error Handling & Loading States:** Better UX for API errors.
6. **Unit Test Coverage:** Add tests for edge cases and additional components.
7. **Export Options:** Allow CSV or PDF export of table and histogram data.
8. **Responsive Design:** Optimize the layout for mobile devices and smaller screens.
9. **Additional Metrics:** Incorporate additional statistics such as mean, median, and standard deviation in both table and histogram views.
10. **Site Header Enhancements:** Split into own component, add navigation, search, or user controls.
11. **Expanded Visualizations:** Add charts for trends, multi-code comparisons, or advanced statistical summaries.
12. **Env variables:** Move the API key and base URL to environment variables for security and deployment flexibility.
