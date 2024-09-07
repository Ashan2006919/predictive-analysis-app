import React from "react";
import Lottie from "lottie-react";
import animationData2 from "./assets/success_anime.json";
import { useNavigate } from "react-router-dom";

const SuccessModal = ({ isOpen, toggleModal }) => {
  const navigate = useNavigate();

  const handleViewResults = () => {
    navigate("/results");
    toggleModal();
  };

  if (!isOpen) return null;

  return (
    <div
      id="hs-success-modal"
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      tabIndex="-1"
      aria-labelledby="hs-success-modal-label"
      onClick={toggleModal}
    >
      <div className="sm:max-w-lg sm:w-full m-3 sm:mx-auto">
        <div
          className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
            <div className="flex justify-between">
              <h3
                id="hs-success-modal-label"
                className="font-bold text-gray-800 flex items-center"
              >
                <Lottie animationData={animationData2} className="w-14 h-14" />
                Analysis Complete
              </h3>
            </div>
            <button
              type="button"
              className="h-8 w-8 inline-flex justify-center items-center rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200"
              aria-label="Close"
              onClick={toggleModal}
            >
              <svg
                className="shrink-0 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>
          <div className="p-4 overflow-y-auto text-center">
            <p className="text-gray-800">
              Results have been successfully analyzed.
            </p>
          </div>
          <div className="flex justify-end p-4">
            <button
              className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={handleViewResults}
            >
              View Results
            </button>
            <button
              className="py-2 px-4 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 ml-2"
              onClick={toggleModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
