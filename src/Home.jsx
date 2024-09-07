import React from "react";
import { motion } from "framer-motion";
import { transition1 } from "./transition.js";
import Lottie from "lottie-react";
import animationData1 from "./assets/intro_anime.json";

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center text-center">
      <Lottie animationData={animationData1} className="lg:w-1/5 sm:w-1/3" />
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={transition1}
        className="relative"
      >
        <h1 className="drop-shadow-md text-7xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-500 mb-2">
          Predictive Model,
        </h1>
        <h2 className="drop-shadow-md pb-2 text-6xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-500 mb-5">
          By <span className="text-purple-600">Ashan</span>
        </h2>
        <p className="drop-shadow-md text-xl text-gray-800 mb-8">
          Innovative design solutions for technology firms and emerging
          businesses weary of the typical aesthetic methodology. Arriving
          shortly.
        </p>

        <div className="flex justify-center items-center mb-8">
          <input
            type="email"
            placeholder="name@email.com"
            className="shadow-md px-4 py-2 rounded-md text-gray-900 border-2 focus:outline-none focus:border-gray-400"
          />
          <button className="ml-4 px-6 py-2 text-white font-semibold bg-cyan-500 hover:bg-cyan-600 rounded-lg shadow-lg">
            Get notified
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default Home;
