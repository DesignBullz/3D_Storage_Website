// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   FaFileAlt,
//   FaCalendarAlt,
//   FaCalculator,
//   FaEnvelope,
//   FaFolderOpen, // New icon for Directory
// } from "react-icons/fa";
// import backgroundImage from "../../assets/e.jpeg"; // Adjust path as needed
// import logo from "../../assets/d.png"; // Adjust path to your logo

// const HomePage = () => {
//   // State to track the style of individual buttons
//   const [hoveredButton, setHoveredButton] = useState(null);

//   // Define button base style (non-hovered)
//   const buttonBaseStyle = {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "15px 30px",
//     background: "linear-gradient(45deg, #f44336, #000000)", // Gradient from red-500 to black
//     color: "#fff", // White text for contrast
//     borderRadius: "8px",
//     fontSize: "1.2rem",
//     fontWeight: "normal", // Set font weight to normal (not bold)
//     cursor: "pointer",
//     textDecoration: "none",
//     transition:
//       "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease", // Add transition for background color
//     textAlign: "center",
//     boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)", // Soft shadow for elevation
//   };

//   // Define button hover style
//   const buttonHoverStyle = {
//     background: "linear-gradient(45deg, #FFEB3B, #FF9800)", // Gradient from yellow-300 to yellow-600
//   };

//   return (
//     <div
//       style={{
//         backgroundImage: `url(${backgroundImage})`, // Use imported image
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         height: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         flexDirection: "column",
//         textAlign: "center",
//         color: "#F0F8FF", // Light blue text color for better contrast
//         textShadow: "1px 1px 8px rgba(0, 0, 0, 0.8)", // Glow for readability
//         padding: "20px",
//       }}
//     >
//       {/* Logo */}
//       <img
//         src={logo}
//         alt="3D Storage Logo"
//         style={{ maxWidth: "200px", marginBottom: "20px" }} // Style for the logo
//       />

//       {/* Page Title */}
//       <h1
//         className="font-heading font-bold"
//         style={{ fontSize: "3.5rem", marginBottom: "20px", fontWeight: "bold" }}
//       >
//         Welcome to 3D Storage Website
//       </h1>
//       <p
//         className="font-heading"
//         style={{ fontSize: "1.5rem", marginBottom: "50px", maxWidth: "600px" }}
//       >
//         Manage your designs, events, costs, and inquiries all in one place with
//         ease.
//       </p>

//       {/* Buttons */}
//       <div
//         style={{
//           display: "flex",
//           flexWrap: "wrap",
//           gap: "20px",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Link to="/view">
//           <button
//             className="font-heading"
//             style={{
//               ...buttonBaseStyle,
//               ...(hoveredButton === "view" ? buttonHoverStyle : {}),
//             }}
//             onMouseEnter={() => setHoveredButton("view")}
//             onMouseLeave={() => setHoveredButton(null)}
//           >
//             <FaFileAlt size={28} style={{ marginRight: "10px" }} />
//             3D Design Files
//           </button>
//         </Link>

//         <Link to="/event">
//           <button
//             className="font-heading"
//             style={{
//               ...buttonBaseStyle,
//               ...(hoveredButton === "event" ? buttonHoverStyle : {}),
//             }}
//             onMouseEnter={() => setHoveredButton("event")}
//             onMouseLeave={() => setHoveredButton(null)}
//           >
//             <FaCalendarAlt size={28} style={{ marginRight: "10px" }} />
//             Upcoming Events
//           </button>
//         </Link>

//         <Link to="/inquiries2">
//           <button
//             className="font-heading"
//             style={{
//               ...buttonBaseStyle,
//               ...(hoveredButton === "inquiries" ? buttonHoverStyle : {}),
//             }}
//             onMouseEnter={() => setHoveredButton("inquiries")}
//             onMouseLeave={() => setHoveredButton(null)}
//           >
//             <FaEnvelope size={28} style={{ marginRight: "10px" }} />
//             Business Inquiries
//           </button>
//         </Link>
//         <Link to="/directory">
//           <button
//             className="font-heading"
//             style={{
//               ...buttonBaseStyle,
//               ...(hoveredButton === "directory" ? buttonHoverStyle : {}),
//             }}
//             onMouseEnter={() => setHoveredButton("directory")}
//             onMouseLeave={() => setHoveredButton(null)}
//           >
//             <FaFolderOpen size={28} style={{ marginRight: "10px" }} />
//             Directory
//           </button>
//         </Link>

//         <Link to="/welcome">
//           <button
//             className="font-heading"
//             style={{
//               ...buttonBaseStyle,
//               ...(hoveredButton === "welcome" ? buttonHoverStyle : {}),
//             }}
//             onMouseEnter={() => setHoveredButton("welcome")}
//             onMouseLeave={() => setHoveredButton(null)}
//           >
//             <FaCalculator size={28} style={{ marginRight: "10px" }} />
//             Cost Calculation
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default HomePage;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFileAlt,
  FaCalendarAlt,
  FaCalculator,
  FaEnvelope,
  FaFolderOpen, // New icon for Directory
} from "react-icons/fa";
import backgroundImage from "../../assets/a.jpg"; // Adjust path as needed

const HomePage = () => {
  // State to track the style of individual buttons
  const [hoveredButton, setHoveredButton] = useState(null);

  // Define button base style (non-hovered)
  const buttonBaseStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "15px 30px",
    background: "linear-gradient(45deg, #f44336, #000000)", // Gradient from red-500 to black
    color: "#fff", // White text for contrast
    borderRadius: "8px",
    fontSize: "1.2rem",
    fontWeight: "normal", // Set font weight to normal (not bold)
    cursor: "pointer",
    textDecoration: "none",
    transition:
      "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease", // Add transition for background color
    textAlign: "center",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)", // Soft shadow for elevation
  };

  // Define button hover style
  const buttonHoverStyle = {
    background: "linear-gradient(45deg, #FFEB3B, #FF9800)", // Gradient from yellow-300 to yellow-600
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`, // Use imported image
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        color: "#F0F8FF", // Light blue text color for better contrast
        textShadow: "1px 1px 8px rgba(0, 0, 0, 0.8)", // Glow for readability
        padding: "20px",
      }}
    >
      {/* Logo */}
      {/* <img
        src={logo}
        alt="3D Storage Logo"
        style={{ maxWidth: "200px", marginBottom: "20px" }} // Style for the logo
      /> */}

      {/* Page Title */}
      {/* <h1
        className="font-heading font-bold"
        style={{ fontSize: "3.5rem", marginBottom: "20px", fontWeight: "bold" }}
      >
        Welcome to 3D Storage Website
      </h1>
      <p
        className="font-heading"
        style={{ fontSize: "1.5rem", marginBottom: "50px", maxWidth: "600px" }}
      >
        Manage your designs, events, costs, and inquiries all in one place with
        ease.
      </p> */}

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "600px",
        }}
      >
        <Link to="/view">
          <button
            className="font-heading"
            style={{
              ...buttonBaseStyle,
              ...(hoveredButton === "view" ? buttonHoverStyle : {}),
            }}
            onMouseEnter={() => setHoveredButton("view")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <FaFileAlt size={28} style={{ marginRight: "10px" }} />
            3D Design Files
          </button>
        </Link>

        <Link to="/event">
          <button
            className="font-heading"
            style={{
              ...buttonBaseStyle,
              ...(hoveredButton === "event" ? buttonHoverStyle : {}),
            }}
            onMouseEnter={() => setHoveredButton("event")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <FaCalendarAlt size={28} style={{ marginRight: "10px" }} />
            Upcoming Events
          </button>
        </Link>

        <Link to="/inquiries2">
          <button
            className="font-heading"
            style={{
              ...buttonBaseStyle,
              ...(hoveredButton === "inquiries" ? buttonHoverStyle : {}),
            }}
            onMouseEnter={() => setHoveredButton("inquiries")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <FaEnvelope size={28} style={{ marginRight: "10px" }} />
            Business Inquiries
          </button>
        </Link>
        <Link to="/directory">
          <button
            className="font-heading"
            style={{
              ...buttonBaseStyle,
              ...(hoveredButton === "directory" ? buttonHoverStyle : {}),
            }}
            onMouseEnter={() => setHoveredButton("directory")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <FaFolderOpen size={28} style={{ marginRight: "10px" }} />
            Directory
          </button>
        </Link>

        <Link to="/welcome">
          <button
            className="font-heading"
            style={{
              ...buttonBaseStyle,
              ...(hoveredButton === "welcome" ? buttonHoverStyle : {}),
            }}
            onMouseEnter={() => setHoveredButton("welcome")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <FaCalculator size={28} style={{ marginRight: "10px" }} />
            Cost Calculation
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
