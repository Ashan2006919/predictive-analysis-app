import React from "react";

const Forms = ({
  isSuccessOpen,
  toggleSuccessModal,
  isWarningOpen,
  toggleWarningModal,
}) => {
  return (
    <>
      {isSuccessOpen && (
        <div
          id="hs-success-modal"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black bg-opacity-50"
          role="dialog"
          tabIndex="-1"
          aria-labelledby="hs-success-modal-label"
        >
          <div className="sm:max-w-lg sm:w-full m-3 sm:mx-auto">
            <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
              <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                <h3
                  id="hs-success-modal-label"
                  className="font-bold text-gray-800 dark:text-white"
                >
                  Analyzing...
                </h3>
                <button
                  type="button"
                  className="h-8 w-8 inline-flex justify-center items-center rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                  aria-label="Close"
                  onClick={toggleSuccessModal}
                >
                  <span className="sr-only">Close</span>
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
                <p className="text-gray-800 dark:text-neutral-400">
                  Analysis is complete. Please check the results in the Results
                  section.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {isWarningOpen && (
        <div
          id="hs-warning-modal"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black bg-opacity-50"
          role="dialog"
          tabIndex="-1"
          aria-labelledby="hs-warning-modal-label"
        >
          <div className="sm:max-w-lg sm:w-full m-3 sm:mx-auto">
            <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
              <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                <h3
                  id="hs-warning-modal-label"
                  className="font-bold text-gray-800 dark:text-white"
                >
                  Missing Information
                </h3>
                <button
                  type="button"
                  className="h-8 w-8 inline-flex justify-center items-center rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                  aria-label="Close"
                  onClick={toggleWarningModal}
                >
                  <span className="sr-only">Close</span>
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
                <p className="text-gray-800 dark:text-neutral-400">
                  Please ensure that all fields are filled out and a file is
                  uploaded.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Forms;
