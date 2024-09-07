import React from "react";
import { useResults } from "./ResultsContext";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

function Chart1() {
  const { results, dataset } = useResults();

  if (!dataset || dataset.length === 0) {
    return <div>No data available to generate the chart</div>;
  }

  // Extract keys dynamically
  const keys = Object.keys(dataset[0]);
  const labels = dataset.map((_, index) => `Record ${index + 1}`);

  // Generate datasets dynamically
  const dataSets = keys.map((key, idx) => ({
    label: key,
    data: dataset.map((item) => item[key]),
    borderColor: `rgba(${(idx * 100) % 255}, ${(idx * 50) % 255}, ${
      200 - ((idx * 30) % 200)
    }, 1)`,
    borderWidth: 2,
    fill: false,
  }));

  const data = {
    labels: labels,
    datasets: dataSets,
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={data} options={options} />
    </div>
  );
}

export default Chart1;
