import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Model", href: "/model" },
  { name: "Results", href: "/results" },
  { name: "Contact", href: "/contact" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Nav({ className }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className={`fixed w-full ${className}`}>
      <div className="relative flex h-16 items-center justify-between text-white">
        {/* Left: Logo */}
        <div className="bsolute inset-y-0 left-0 items-center sm:block hidden">
          <img
            alt="Ashan Niwantha"
            src="public/analysis_icon.png"
            className="h-12 w-auto ml-4"
          />
        </div>

        {/* Center: Navigation Links */}
        <div className="flex-1 flex items-center justify-center">
          {/* Desktop Navigation */}
          <div className="hidden sm:block shadow-md p-4 -mt-2 -ml-15 rounded-xl bg-white">
            <div className="flex space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    location.pathname === item.href
                      ? "bg-gray-900 text-white"
                      : "text-gray-800 hover:bg-gray-700 hover:text-white",
                    "rounded-full px-3 py-2 text-sm font-medium"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`fixed inset-0 text-white bg-black bg-opacity-70 transition-transform ${
              isOpen ? "translate-x-0" : "translate-x-full"
            } sm:hidden`}
          >
            <div className="flex flex-col items-center mt-16">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    location.pathname === item.href
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "rounded-full px-3 py-2 text-lg font-medium my-2"
                  )}
                  onClick={() => setIsOpen(false)} // Close menu on link click
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Try Out Button */}
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button
            className="bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-purple-500 mr-4 shadow-lg"
            onClick={() => navigate("/model")}
          >
            Try Out
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="absolute inset-y-0 left-0 -ml-2 -mt-2 flex items-center sm:hidden">
          <button
            className="relative inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-red-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white ml-4"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            ) : (
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
