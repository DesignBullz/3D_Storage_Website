// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   FaTachometerAlt,
//   FaImage,
//   FaUpload,
//   FaCog,
//   FaFileAlt,
//   FaClipboardList,
//   FaFolder,
//   FaUserPlus, // Icon for "Create User"
// } from "react-icons/fa"; // Importing icons from React Icons

// const Sidebar = () => {
//   const [isExpoOpen, setIsExpoOpen] = useState(false);

//   const toggleExpoDropdown = () => {
//     setIsExpoOpen(!isExpoOpen);
//   };

//   return (
//     <div className="bg-gradient-to-r from-indigo-600 via-indigo-800 to-indigo-900 w-64 min-h-screen p-6 text-white shadow-lg">
//       <div className="flex flex-col items-center mb-8">
//         {/* Avatar section */}
//         <img
//           src="https://www.w3schools.com/w3images/avatar2.png" // Replace with your admin avatar image
//           alt="Admin Avatar"
//           className="w-20 h-20 rounded-full border-4 border-pink-400 mb-4"
//         />
//         <h2 className="font-heading text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-500">
//           Admin Panel
//         </h2>
//       </div>
//       <div className="flex flex-col space-y-6">
//         <Link
//           to="/dashboard"
//           className="flex items-center space-x-3 hover:bg-indigo-600 p-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105"
//         >
//           <FaTachometerAlt size={20} />
//           <span className="text-lg  font-body">Dashboard</span>
//         </Link>
//         <Link
//           to="/admin"
//           className="flex items-center space-x-3 hover:bg-indigo-600 p-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105"
//         >
//           <FaImage size={20} />
//           <span className="text-lg font-body">Manage Designs</span>
//         </Link>
//         <Link
//           to="/upload"
//           className="flex items-center space-x-3 hover:bg-indigo-600 p-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105"
//         >
//           <FaUpload size={20} />
//           <span className="text-lg font-body">Upload Design</span>
//         </Link>
//         <Link
//           to="/signup"
//           className="flex items-center space-x-3 hover:bg-indigo-600 p-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105"
//         >
//           <FaUserPlus size={20} />
//           <span className="text-lg font-body">Create User</span>
//         </Link>
//         <Link
//           to="/inquiries"
//           className="flex items-center space-x-3 hover:bg-indigo-600 p-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105"
//         >
//           <FaClipboardList size={20} />
//           <span className="text-lg font-body">Inquiry Details</span>
//         </Link>

//         <div className="relative">
//           <button
//             onClick={toggleExpoDropdown}
//             className="flex items-center space-x-3 hover:bg-indigo-600 p-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 w-full"
//           >
//             <FaFolder size={20} />
//             <span className="text-lg font-body">Expo Directory</span>
//           </button>
//           {isExpoOpen && (
//             <div className="absolute left-0 w-full mt-2 bg-indigo-700 rounded-lg shadow-lg">
//               <Link
//                 to="/add-directory"
//                 className="block text-white hover:bg-indigo-600 p-3 rounded-lg transition-all duration-300 font-body"
//               >
//                 Add Directory
//               </Link>
//               <Link
//                 to="/view-directory"
//                 className="block text-white hover:bg-indigo-600 p-3 rounded-lg transition-all duration-300 font-body"
//               >
//                 View Directory
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="absolute bottom-6 left-6 text-sm">
//         <p className="text-gray-300 font-heading">© 2024 Design Bullz</p>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaImage,
  FaUpload,
  FaCog,
  FaFileAlt,
  FaClipboardList,
  FaFolder,
  FaUserPlus, // Icon for "Create User"
  FaCalendarAlt, // Icon for "Upcoming Events"
} from "react-icons/fa"; // Importing icons from React Icons

const Sidebar = () => {
  const [isExpoOpen, setIsExpoOpen] = useState(false);

  const toggleExpoDropdown = () => {
    setIsExpoOpen(!isExpoOpen);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 via-indigo-800 to-indigo-900 w-64 min-h-screen p-6 text-white shadow-lg">
      <div className="flex flex-col items-center mb-8">
        {/* Avatar section */}
        <img
          src="https://www.w3schools.com/w3images/avatar2.png" // Replace with your admin avatar image
          alt="Admin Avatar"
          className="w-20 h-20 rounded-full border-4 border-pink-400 mb-4"
        />
        <h2 className="font-heading text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-500">
          Admin Panel
        </h2>
      </div>
      <div className="flex flex-col space-y-6">
        <Link
          to="/dashboard"
          className="flex items-center space-x-3 hover:bg-indigo-600 p-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <FaTachometerAlt size={20} />
          <span className="text-lg font-body">Dashboard</span>
        </Link>
        <Link
          to="/admin"
          className="flex items-center space-x-3 hover:bg-indigo-600 p-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <FaImage size={20} />
          <span className="text-lg font-body">Manage Designs</span>
        </Link>
        <Link
          to="/upload"
          className="flex items-center space-x-3 hover:bg-indigo-600 p-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <FaUpload size={20} />
          <span className="text-lg font-body">Upload Design</span>
        </Link>
        <Link
          to="/signup"
          className="flex items-center space-x-3 hover:bg-indigo-600 p-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <FaUserPlus size={20} />
          <span className="text-lg font-body">Create User</span>
        </Link>
        <Link
          to="/inquiries"
          className="flex items-center space-x-3 hover:bg-indigo-600 p-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <FaClipboardList size={20} />
          <span className="text-lg font-body">Inquiry Details</span>
        </Link>

        {/* Upcoming Events Section */}
        <Link
          to="/events"
          className="flex items-center space-x-3 hover:bg-indigo-600 p-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <FaCalendarAlt size={20} />
          <span className="text-lg font-body">Upcoming Events</span>
        </Link>

        {/* Expo Directory Section */}
        <div className="relative">
          <button
            onClick={toggleExpoDropdown}
            className="flex items-center space-x-3 hover:bg-indigo-600 p-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 w-full"
          >
            <FaFolder size={20} />
            <span className="text-lg font-body">Expo Directory</span>
          </button>
          {isExpoOpen && (
            <div className="absolute left-0 w-full mt-2 bg-indigo-700 rounded-lg shadow-lg">
              <Link
                to="/add-directory"
                className="block text-white hover:bg-indigo-600 p-3 rounded-lg transition-all duration-300 font-body"
              >
                Add Directory
              </Link>
              <Link
                to="/view-directory"
                className="block text-white hover:bg-indigo-600 p-3 rounded-lg transition-all duration-300 font-body"
              >
                View Directory
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-6 left-6 text-sm">
        <p className="text-gray-300 font-heading">© 2024 Design Bullz</p>
      </div>
    </div>
  );
};

export default Sidebar;
