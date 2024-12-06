// components/RadarChart.jsx
import { Chart as ChartJS, Legend, LineElement, PointElement, RadialLinearScale, Tooltip } from 'chart.js';
import React from 'react';
import { Radar } from 'react-chartjs-2';

// Register chart.js components
ChartJS.register(RadialLinearScale, Tooltip, Legend, PointElement, LineElement);

const data = {
  labels: ['Stress', 'Happiness', 'Focus', 'Energy', 'Calmness'],
  datasets: [
    {
      label: 'Mental State',
      data: [70, 85, 60, 90, 75], // Example values for each mental state
      backgroundColor: 'rgba(38, 194, 129, 0.2)',  // Light green background
      borderColor: 'rgba(38, 194, 129, 1)',        // Green border
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  scales: {
    r: {
      min: 0,
      max: 100,
      angleLines: {
        display: false,
      },
      suggestedMin: 0,
      suggestedMax: 100,
    },
  },
};

const RadarChart = () => {
  return <Radar data={data} options={options} />;
};

export default RadarChart;
