export const lineChartDataTotalSpent = [
  {
    name: "Revenue",
    data: [5, 15, 25, 25, 30, 49, 45, 40, 30, 25], // Adjusted y-values for intersection
    color: "#c5a5e3",
  },
  {
    name: "Profit",
    data: [20, 20, 20, 30, 34, 39, 40, 45, 50, 55], // Use y-values only
    color: "#0b0b0a",
  },
];

export const lineChartOptionsTotalSpent = {
  legend: {
    show: false,
  },

  chart: {
    type: "line",

    toolbar: {
      show: false,
    },
  },

  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },

  tooltip: {
    style: {
      fontSize: "12px",
      fontFamily: undefined,
      backgroundColor: "#FEFDE3"
    },
  },
  grid: {
    show: false,
  },
  xaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      style: {
        colors: "#A3AED0",
        fontSize: "12px",
        fontWeight: "500",
      },
    },
    type: "text",
    range: undefined,
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
  },

  yaxis: {
    show: false,
  },
};
