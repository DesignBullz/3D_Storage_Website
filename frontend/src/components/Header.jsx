// import React from "react";
// import { FaCalendarAlt } from "react-icons/fa"; // Importing icons
// import { FaCalculator, FaAddressBook } from "react-icons/fa"; // Additional icons for Calculator and Directory
// import { FaCube, FaEnvelope } from "react-icons/fa"; // Icons for 3D Design and Inquiries
// import Logo from "../assets/d.svg";

// function Header() {
//   return (
//     <header
//       className="text-white p-5 shadow-lg"
//       style={{
//         background: "linear-gradient(45deg, #f44336, #000000)", // Gradient from red-500 to black
//       }}
//     >
//       <div className="max-w-screen-xl mx-auto flex justify-between items-center flex-col sm:flex-row">
//         {/* Left: Logo and Title */}
//         <div className="flex items-center space-x-3 mb-4 sm:mb-0">
//           <img src={Logo} alt="Logo" className="w-w-12 h-12 object-contain" />
//           <div className="text-3xl font-heading font-bold">
//             3D Model Storage
//           </div>
//         </div>

//         {/* Right: Navigation Buttons */}
//         <nav className="flex space-x-5 sm:space-x-8 ml-auto">
//           {/* 3D Design Button */}
//           <a
//             href="/view" // Change this to the URL or route for your Event page
//             className="bg-white font-heading font-semibold text-red-700 px-6 py-2 rounded-full "
//           >
//             <FaCube className="inline-block mr-2 text-lg" /> 3D Design
//           </a>

//           {/* Event Button */}
//           <a
//             href="/event" // Change this to the URL or route for your Event page
//             className="bg-white font-heading font-semibold text-red-700 px-6 py-2 rounded-full "
//           >
//             <FaCalendarAlt className="inline-block mr-2 text-lg" /> Event
//           </a>

//           {/* Inquiries Button */}
//           <a
//             href="/inquiries2" // Change this to the URL or route for your Event page
//             className="bg-white font-heading font-semibold text-red-700 px-6 py-2 rounded-full "
//           >
//             <FaEnvelope className="inline-block mr-2 text-lg" /> Inquiries
//           </a>

//           {/* Calculator Button */}
//           <a
//             href="/welcome" // Change this to the URL or route for your Event page
//             className="bg-white font-heading font-semibold text-red-700 px-6 py-2 rounded-full"
//           >
//             <FaCalculator className="inline-block mr-2 text-lg" />
//             Calculator
//           </a>

//           {/* Directory Button */}
//           <a
//             href="/directory" // Change this to the URL or route for your Event page
//             className="bg-white font-heading font-semibold text-red-700 px-6 py-2 rounded-full "
//           >
//             <FaAddressBook className="inline-block mr-2 text-lg" /> Directory
//           </a>
//         </nav>
//       </div>
//     </header>
//   );
// }

// export default Header;

import React from "react";
import { FaCalendarAlt } from "react-icons/fa"; // Importing icons
import { FaCalculator, FaAddressBook } from "react-icons/fa"; // Additional icons for Calculator and Directory
import { FaCube, FaEnvelope } from "react-icons/fa"; // Icons for 3D Design and Inquiries
import Logo from "../assets/d.svg";

function Header() {
  return (
    <header
      className="text-white p-5 shadow-lg"
      style={{
        background: "linear-gradient(45deg, #f44336, #000000)", // Gradient from red-500 to black
      }}
    >
      <div className="max-w-screen-xl mx-auto flex justify-between items-center flex-col sm:flex-row">
        {/* Left: Logo and Title */}
        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
          <img src={Logo} alt="Logo" className="w-12 h-12 object-contain" />
          <div className="text-3xl font-heading font-bold">
            3D Model Storage
          </div>
        </div>

        {/* Right: Navigation Buttons */}
        <nav className="flex flex-nowrap items-center justify-between space-x-3 sm:space-x-4 md:space-x-6 lg:space-x-8 overflow-x-auto">
          {/* 3D Design Button */}
          <a
            href="/view"
            className="flex items-center bg-white font-heading font-semibold text-red-700 px-4 py-2 rounded-full whitespace-nowrap"
          >
            <FaCube className="mr-2 text-lg" /> 3D Design
          </a>

          {/* Event Button */}
          <a
            href="/event"
            className="flex items-center bg-white font-heading font-semibold text-red-700 px-4 py-2 rounded-full whitespace-nowrap"
          >
            <FaCalendarAlt className="mr-2 text-lg" /> Event
          </a>

          {/* Inquiries Button */}
          <a
            href="/inquiries2"
            className="flex items-center bg-white font-heading font-semibold text-red-700 px-4 py-2 rounded-full whitespace-nowrap"
          >
            <FaEnvelope className="mr-2 text-lg" /> Inquiries
          </a>

          {/* Calculator Button */}
          <a
            href="/welcome"
            className="flex items-center bg-white font-heading font-semibold text-red-700 px-4 py-2 rounded-full whitespace-nowrap"
          >
            <FaCalculator className="mr-2 text-lg" /> Calculator
          </a>

          {/* Directory Button */}
          <a
            href="/directory"
            className="flex items-center bg-white font-heading font-semibold text-red-700 px-4 py-2 rounded-full whitespace-nowrap"
          >
            <FaAddressBook className="mr-2 text-lg" /> Directory
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
