import React from "react";
import { useResults } from "./ResultsContext";
import Chart1 from "./Chart1";
import Lottie from "lottie-react";
import animationData1 from "./assets/analytics_anime.json";

const Results = () => {
  const { results, dataset } = useResults();
  const accuracy = results?.accuracy;
  const prediction = results?.prediction;

  if (!dataset || dataset.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="p-4 ml-3">
      <div className="flex items-center justify-center">
        <Lottie
          animationData={animationData1}
          className="lg:w-1/5 sm:w-1/3 -ml-10"
        />
        <h1 className="text-5xl font-bold mb-10 ml-10 text-sky-400 drop-shadow-md underline">
          Analysis Results
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-lg bg-white shadow-lg rounded-lg p-4">
          <strong>Model Accuracy:</strong>{" "}
          {accuracy !== null ? accuracy : "No result available"}
        </div>
        <div className="text-lg bg-white shadow-lg rounded-lg p-4">
          <strong>Prediction:</strong>{" "}
          {prediction !== null ? prediction : "No prediction available"}
        </div>
        <div className="text-lg bg-white shadow-lg rounded-lg p-4">
          <strong>Prediction:</strong>{" "}
          {prediction !== null ? prediction : "No prediction available"}
        </div>
      </div>
      <div className="flex mt-4">
        {/* Chart Section */}
        <div className="w-2/3 bg-white shadow-lg rounded-lg p-4">
          <Chart1 />
        </div>

        {/* Table Section */}
        <div className="w-1/3 h-96 overflow-auto bg-white shadow-lg rounded-lg ml-4 p-4">
          <div className="min-w-full inline-block align-middle">
            <table className="min-w-full divide-y divide-neutral-700">
              <thead>
                <tr>
                  {Object.keys(dataset[0]).map((key) => (
                    <th
                      scope="col"
                      key={key}
                      className="px-6 py-3 text-start text-xs uppercase text-neutral-900 font-semibold"
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900">
                {dataset.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    {Object.entries(row).map(([key, value], colIndex) => (
                      <td
                        key={colIndex}
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-center"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
