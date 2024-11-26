import React from "react";
import { FaHome, FaInfoCircle, FaCalendarAlt } from "react-icons/fa"; // Importing icons
import Logo from "../assets/d.svg";

function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-600 via-indigo-800 to-indigo-900 text-white p-5 shadow-lg">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center flex-col sm:flex-row">
        {/* Left: Logo and Title */}
        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
          <img src={Logo} alt="Logo" className="w-12 h-12 object-contain" />
          <div className="text-3xl font-heading font-bold">
            3D Model Storage
          </div>
        </div>

        {/* Right: Navigation Buttons */}
        <nav className="flex space-x-5 sm:space-x-8">
          {/* Home Button */}
          <button
            className="bg-white text-indigo-900 font-heading font-semibold px-6 py-2 rounded-full font-body font-medium hover:bg-indigo-700 hover:text-white transition-colors"
            onClick={() => alert("Navigating to Home...")}
          >
            <FaHome className="inline-block mr-2 text-lg" /> Home
          </button>

          {/* About Button */}
          <button
            className="bg-white text-indigo-900 font-heading font-semibold px-6 py-2 rounded-full font-body font-medium hover:bg-indigo-700 hover:text-white transition-colors"
            onClick={() => alert("Navigating to About...")}
          >
            <FaInfoCircle className="inline-block mr-2 text-lg" /> About
          </button>

          {/* Event Button */}
          <a
            href="/event" // Change this to the URL or route for your Event page
            className="bg-white font-heading font-semibold text-indigo-900 px-6 py-2 rounded-full font-body font-medium hover:bg-indigo-700 hover:text-white transition-colors"
          >
            <FaCalendarAlt className="inline-block mr-2 text-lg" /> Event
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
