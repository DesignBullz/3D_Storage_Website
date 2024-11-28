// import React, { useState } from "react";
// import { FaUserAlt, FaLock } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import Header from "./Header.jsx";
// import Footer from "./Footer.jsx";
// import axios from "axios";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState(null);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("https://api.dbzmanager.com/login", {
//         email,
//         password,
//       });

//       if (response.data.token) {
//         // Store the token in localStorage or sessionStorage
//         localStorage.setItem("authToken", response.data.token);

//         // Navigate to the admin page or wherever you want to redirect after login
//         navigate("/view");
//       }
//     } catch (error) {
//       // Handle errors (invalid credentials, server issues, etc.)
//       if (error.response) {
//         setErrorMessage(error.response.data.error || "Something went wrong!");
//       } else {
//         setErrorMessage("Network error. Please try again later.");
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
//       <Header />
//       <main className="flex justify-center items-center flex-grow p-8">
//         <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl transform transition-all ">
//           <h2 className="text-2xl font-heading font-bold text-center text-gray-700 mb-6">
//             Login
//           </h2>

//           <form onSubmit={handleLogin}>
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-600 mb-2">
//                 Email
//               </label>
//               <div className="flex items-center border-b-2 border-gray-300 py-2">
//                 <FaUserAlt size={20} className="text-gray-500" />
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Enter your email"
//                   className="ml-2 w-full border-none focus:outline-none"
//                 />
//               </div>
//             </div>

//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-600 mb-2">
//                 Password
//               </label>
//               <div className="flex items-center border-b-2 border-gray-300 py-2">
//                 <FaLock size={20} className="text-gray-500" />
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Enter your password"
//                   className="ml-2 w-full border-none focus:outline-none"
//                 />
//               </div>
//             </div>

//             {errorMessage && (
//               <p className="text-red-600 text-center mb-4">{errorMessage}</p>
//             )}

//             <button
//               type="submit"
//               className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-md w-full hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
//             >
//               Login
//             </button>
//           </form>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import backgroundImage from "../assets/r.jpg"; // Adjust the path to your image
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://api.dbzmanager.com/login", {
        email,
        password,
      });

      if (response.data.token) {
        // Store the token in localStorage or sessionStorage
        localStorage.setItem("authToken", response.data.token);

        // Navigate to the admin page or wherever you want to redirect after login
        navigate("/view");
      }
    } catch (error) {
      // Handle errors (invalid credentials, server issues, etc.)
      if (error.response) {
        setErrorMessage(error.response.data.error || "Something went wrong!");
      } else {
        setErrorMessage("Network error. Please try again later.");
      }
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover", // Ensures the image fully covers the container
        backgroundPosition: "center", // Keeps the image centered
        backgroundRepeat: "no-repeat", // Prevents the background from repeating
        backgroundAttachment: "fixed", // Keeps the background fixed when scrolling
        height: "100vh", // Ensures the container takes up the full viewport height
      }}
    >
      <main className="flex justify-center items-center flex-grow p-8">
        <div
          className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl transform transition-all absolute"
          style={{
            right: "150px", // Adjust this value to control how much space to the left the form should have
            top: "50%",
            transform: "translateY(-50%)", // To vertically center the form
          }}
        >
          <h2 className="text-2xl font-heading font-bold text-center text-gray-700 mb-6">
            Login
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Email
              </label>
              <div className="flex items-center border-b-2 border-gray-300 py-2">
                <FaUserAlt size={20} className="text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="ml-2 w-full border-none focus:outline-none"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Password
              </label>
              <div className="flex items-center border-b-2 border-gray-300 py-2">
                <FaLock size={20} className="text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="ml-2 w-full border-none focus:outline-none"
                />
              </div>
            </div>

            {errorMessage && (
              <p className="text-red-600 text-center mb-4">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="bg-gradient-to-r from-red-500 to-black text-white px-6 py-2 rounded-md w-full hover:bg-gradient-to-r hover:from-yellow-300 hover:to-yellow-600 transition-all duration-300"
            >
              Login
            </button>
          </form>

          {/* Sign-up Link */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
