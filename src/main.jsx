import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import App from "./App.jsx";
import "./index.css";
import { ResultsProvider } from "./ResultsContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ResultsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ResultsProvider>
  </StrictMode>
);
