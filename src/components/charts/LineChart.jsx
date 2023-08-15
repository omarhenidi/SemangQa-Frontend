import React from "react";
import Chart from "react-apexcharts";
import './style.css'
const LineChart = (props) => {
  const { options } = props;

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];

  // Create two series with intersecting points
  const seriesWithIntersection = [
    {
      name: 'Series A',
      data: [5, 15, 25, 25, 30, 49, 45, 40, 30, 25], // Adjusted y-values for intersection
    },
    {
      name: 'Series B',
      data: [20, 20, 20, 30, 34, 39, 40, 45, 50, 55], // Use y-values only
    },
  ];

  const customColors = ['#c5a5e3', '#0b0b0a']; // Colors for Series A and Series B

  const updatedOptions = {
    ...options,
    xaxis: {
      categories: months,
      labels: {
        style: {
          fontSize: '12px',
        },
      },
    },
    stroke: {
      show: true,
      curve: 'smooth',
    }
    ,chart: {
      background: '#FEFDE3', // Set background color for the chart
    },
    colors: customColors, // Set the custom colors for the series

  };

  return (
    <Chart
      options={updatedOptions}
      type="line"
      width="100%"
      height="100%"
      series={seriesWithIntersection}
    />
  );
};

export default LineChart;
