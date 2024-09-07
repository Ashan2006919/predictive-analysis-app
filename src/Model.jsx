import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useResults } from "./ResultsContext";
import { transition1 } from "./transition.js";
import Lottie from "lottie-react";
import animationData from "./assets/warning_anime.json";
import animationData2 from "./assets/success_anime.json";
import animationData3 from "./assets/model_anime.json";
import animationData4 from "./assets/fileUpload_anime.json";
import Forms from "./Forms";
import SuccessModal from "./SuccessModal";
import WarningModal from "./WarningModal";

const Model = () => {
  const [file, setFile] = useState(null);
  const [algorithm, setAlgorithm] = useState("");
  const [columns, setColumns] = useState([]);
  const [columnValues, setColumnValues] = useState({});
  const [progress, setProgress] = useState(0);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const { setResults, setDataset } = useResults();
  const navigate = useNavigate();

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);

    if (uploadedFile) {
      const formData = new FormData();
      formData.append("file", uploadedFile);

      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/extract-columns",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.columns) {
          setColumns(response.data.columns);
        }

        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              return 100;
            }
            return prev + 10;
          });
        }, 500);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleColumnValueChange = (column, value) => {
    setColumnValues((prevValues) => ({
      ...prevValues,
      [column]: value,
    }));
  };

  const removeFile = () => {
    setFile(null);
    setProgress(0);
    setColumns([]);
    setColumnValues({});
    localStorage.removeItem("results"); // Clear local storage
  };

  const toggleSuccessModal = () => {
    setIsSuccessOpen(!isSuccessOpen);
  };

  const toggleWarningModal = () => {
    setIsWarningOpen(!isWarningOpen);
  };

  const handleAnalyzeClick = async () => {
    if (!file || !algorithm || Object.keys(columnValues).length === 0) {
      toggleWarningModal();
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("algorithm", algorithm);
    formData.append("column_values", JSON.stringify(columnValues));

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.prediction !== undefined) {
        const resultData = {
          accuracy: response.data.accuracy,
          dataset: response.data.dataset,
          prediction: response.data.prediction,
        };
        setDataset(resultData.dataset);
        setResults(resultData);
        localStorage.setItem("results", JSON.stringify(resultData)); // Save to local storage
        toggleSuccessModal();
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error during prediction:", error);
    }
  };
  const handleViewResults = () => {
    navigate("/results");
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-start w-screen mb-5">
        <div
          className="flex-shrink-0 w-full md:w-1/2 flex items-center justify-center lg:-my-3 sm:my-3"
          data-taos="fade-up"
          data-taos-offset="300"
          data-taos-duration="600"
          data-taos-delay="300"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={transition1}
            className="w-full max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain rounded-lg mb-4 lg:mt-5 sm:-mt-5"
          >
            <Lottie animationData={animationData3} className="drop-shadow-md" />
          </motion.div>
        </div>

        <div className="flex-1 md:w-1/2 mx-6 p-4 border border-gray-300 rounded-lg shadow-md md:mx-8 md:my-10 lg:mx-10 sm:mb-8 lg:mt-20 items-center">
          <div className="mb-4 w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col mt-1 items-center justify-center pb-5 w-full border border-gray-300 border-dashed rounded-2xl cursor-pointer bg-gray-50"
            >
              <div class="flex flex-col items-center justify-center">
                <Lottie
                  animationData={animationData4}
                  className="h-20 w-20 mb-2"
                />
                <h2 className="text-center text-gray-400 text-xs font-normal leading-4 mb-1">
                  Upload a CSV file, smaller than 15MB
                </h2>
                <h4 className="text-center text-gray-900 text-sm font-medium leading-snug">
                  Drag and Drop your file here or
                </h4>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>

          {file && (
            <div className="grid gap-1 mb-4 w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-xs leading-4 text-gray-400">
                  {progress}% done
                </span>
                <button
                  className="font-normal text-xs leading-4 text-indigo-600 hover:underline"
                  onClick={removeFile}
                >
                  Cancel
                </button>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div
                  className="bg-indigo-500 h-1 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <div className="block w-full">
            <label
              htmlFor="algorithm"
              className="block mb-2 ml-2 text-sm font-medium text-gray-900 w-full text-left"
            >
              Classification Algorithm:
            </label>
            <select
              id="algorithm"
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className="h-12 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2.5 px-4 focus:outline-none"
            >
              <option value="">Choose an Algorithm</option>
              <option value="LR">Logistic Regression</option>
              <option value="DT">Decision Trees</option>
              <option value="RF">Random Forest</option>
            </select>
          </div>

          {columns.length > 0 && (
            <div className="mt-4">
              {columns.map((column) => (
                <div key={column} className="mb-4">
                  <label
                    className="block mb-2 ml-2 text-sm font-medium text-gray-900"
                    htmlFor={`column-${column}`}
                  >
                    {column}:
                  </label>
                  <input
                    id={`column-${column}`}
                    type="text"
                    value={columnValues[column] || ""}
                    onChange={(e) =>
                      handleColumnValueChange(column, e.target.value)
                    }
                    className="h-12 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2.5 px-4 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-center mt-4">
            <motion.button
              type="button"
              className="relative py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-purple-600 shadow-lg text-white hover:bg-purple-500 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              aria-haspopup="dialog"
              aria-expanded={isSuccessOpen || isWarningOpen}
              aria-controls="hs-basic-modal"
              onClick={handleAnalyzeClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              Analyze
            </motion.button>
          </div>
        </div>
      </div>
      {/* Render modals */}
      <SuccessModal isOpen={isSuccessOpen} toggleModal={toggleSuccessModal} />
      <WarningModal isOpen={isWarningOpen} toggleModal={toggleWarningModal} />
    </>
  );
};

export default Model;
