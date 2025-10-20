import { vi } from "vitest";
// ✅ Mock vue-echarts globally before anything imports it
vi.mock("vue-echarts", () => ({
  default: {
    name: "v-chart",
    render: () => null,
  },
}));

// Optionally mock echarts itself too if your component imports it
vi.mock("echarts", () => ({}));
