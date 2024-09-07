import React, { createContext, useState, useContext, useEffect } from "react";

const ResultsContext = createContext();

export const ResultsProvider = ({ children }) => {
  const [results, setResults] = useState(null);
  const [dataset, setDataset] = useState(null);

  useEffect(() => {
    // Retrieve from local storage
    const storedResults = localStorage.getItem("results");
    if (storedResults) {
      const parsedResults = JSON.parse(storedResults);
      setResults(parsedResults);
      setDataset(parsedResults.dataset);
    }
  }, []);

  return (
    <ResultsContext.Provider
      value={{ results, setResults, dataset, setDataset }}
    >
      {children}
    </ResultsContext.Provider>
  );
};

export const useResults = () => useContext(ResultsContext);
