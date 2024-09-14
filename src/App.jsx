import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Model from "./Model";
import Results from "./Results";
import Contact from "./Contact";
import Nav from "./Nav";
import { ResultsProvider } from "./ResultsContext";

function App() {
  return (
    <div className="relative min-h-screen">
      {/* Fixed background across the entire site */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
      {/* Navigation */}
      <Nav className="z-10 bg-transparent" />{" "}
      {/* Ensure nav is above other content */}
      <main className="pt-16">
        {" "}
        {/* Add padding-top to ensure content is not hidden behind the nav */}
        <ResultsProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/model" element={<Model />} />
            <Route path="/results" element={<Results />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </ResultsProvider>
      </main>
    </div>
  );
}

export default App;
