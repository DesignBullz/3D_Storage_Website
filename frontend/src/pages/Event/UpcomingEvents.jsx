// import React, { useState } from "react";
// import {
//   AiOutlinePlusCircle,
//   AiFillCalendar,
//   AiOutlineCheckCircle,
// } from "react-icons/ai";
// import { FaCity, FaBuilding } from "react-icons/fa";
// import { MdEventAvailable } from "react-icons/md";
// import Sidebar from "./Sidebar";

// const UpcomingEvents = () => {
//   const [eventData, setEventData] = useState({
//     exhibitionName: "",
//     startDate: "",
//     endDate: "",
//     venue: "",
//     city: "",
//     directoryAvailable: "No",
//   });

//   const [clientInput, setClientInput] = useState("");
//   const [clients, setClients] = useState([]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEventData({
//       ...eventData,
//       [name]: value,
//     });
//   };

//   const handleAddClient = () => {
//     if (clientInput.trim() !== "") {
//       setClients([...clients, clientInput.trim()]);
//       setClientInput("");
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const eventDetails = {
//       ...eventData,
//       existingClients: clients,
//     };
//     console.log("Event Details Submitted:", eventDetails);
//     alert("Event details have been submitted successfully!");
//     setEventData({
//       exhibitionName: "",
//       startDate: "",
//       endDate: "",
//       venue: "",
//       city: "",
//       directoryAvailable: "No",
//     });
//     setClients([]);
//   };

//   return (
//     <div className="flex">
//       <Sidebar />

//       <div className="flex-1 bg-gray-50 min-h-screen p-6">
//         <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto space-y-8">
//           <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center">
//             <MdEventAvailable className="text-indigo-600 mr-2" />
//             Add Event Details
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-lg font-medium text-gray-700 flex items-center">
//                 <MdEventAvailable className="text-indigo-600 mr-2" />
//                 Exhibition Name
//               </label>
//               <input
//                 type="text"
//                 name="exhibitionName"
//                 value={eventData.exhibitionName}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter exhibition name"
//                 className="w-3/4 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-lg font-medium text-gray-700 flex items-center">
//                   <AiFillCalendar className="text-indigo-600 mr-2" />
//                   Start Date
//                 </label>
//                 <input
//                   type="date"
//                   name="startDate"
//                   value={eventData.startDate}
//                   onChange={handleChange}
//                   required
//                   className="w-3/4 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-lg font-medium text-gray-700 flex items-center">
//                   <AiFillCalendar className="text-indigo-600 mr-2" />
//                   End Date
//                 </label>
//                 <input
//                   type="date"
//                   name="endDate"
//                   value={eventData.endDate}
//                   onChange={handleChange}
//                   required
//                   className="w-3/4 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-lg font-medium text-gray-700 flex items-center">
//                 <FaBuilding className="text-indigo-600 mr-2" />
//                 Venue
//               </label>
//               <input
//                 type="text"
//                 name="venue"
//                 value={eventData.venue}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter venue"
//                 className="w-3/4 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//               />
//             </div>

//             <div>
//               <label className="block text-lg font-medium text-gray-700 flex items-center">
//                 <FaCity className="text-indigo-600 mr-2" />
//                 City
//               </label>
//               <input
//                 type="text"
//                 name="city"
//                 value={eventData.city}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter city"
//                 className="w-3/4 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//               />
//             </div>

//             <div>
//               <label className="block text-lg font-medium text-gray-700 flex items-center">
//                 <AiOutlineCheckCircle className="text-indigo-600 mr-2" />
//                 Directory Available
//               </label>
//               <select
//                 name="directoryAvailable"
//                 value={eventData.directoryAvailable}
//                 onChange={handleChange}
//                 required
//                 className="w-3/4 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//               >
//                 <option value="No">No</option>
//                 <option value="Yes">Yes</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-lg font-medium text-gray-700 flex items-center">
//                 <AiOutlinePlusCircle className="text-indigo-600 mr-2" />
//                 Add Existing Clients
//               </label>
//               <div className="flex items-center space-x-4">
//                 <input
//                   type="text"
//                   value={clientInput}
//                   onChange={(e) => setClientInput(e.target.value)}
//                   placeholder="Enter client name"
//                   className="w-3/4 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//                 <button
//                   type="button"
//                   onClick={handleAddClient}
//                   className="bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 >
//                   Add
//                 </button>
//               </div>
//               <ul className="mt-4 space-y-2">
//                 {clients.map((client, index) => (
//                   <li
//                     key={index}
//                     className="bg-gray-100 px-4 py-2 rounded-lg shadow-sm text-gray-800 font-medium"
//                   >
//                     {client}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <button
//               type="submit"
//               className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 font-semibold text-lg"
//             >
//               Submit Event
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpcomingEvents;

import React, { useState } from "react";
import axios from "axios"; // Import Axios
import {
  AiOutlinePlusCircle,
  AiFillCalendar,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import { FaCity, FaBuilding } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import Sidebar from "../sidebar/Sidebar";

const UpcomingEvents = () => {
  const [eventData, setEventData] = useState({
    exhibitionName: "",
    startDate: "",
    endDate: "",
    venue: "",
    city: "",
    directoryAvailable: "No",
  });

  const [clientInput, setClientInput] = useState("");
  const [clients, setClients] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  const handleAddClient = () => {
    if (clientInput.trim() !== "") {
      setClients([...clients, clientInput.trim()]);
      setClientInput("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add clients to event data
    const eventDetails = {
      ...eventData,
      existingClients: clients,
    };

    try {
      // Make POST request to API endpoint
      const response = await axios.post(
        "https://api.dbzmanager.com/add-event",
        eventDetails,
        {
          headers: {
            "Content-Type": "application/json", // Setting content type to JSON
          },
        }
      );

      // Handle successful response
      console.log("Event Details Submitted:", response.data);
      alert("Event details have been submitted successfully!");

      // Reset form data
      setEventData({
        exhibitionName: "",
        startDate: "",
        endDate: "",
        venue: "",
        city: "",
        directoryAvailable: "No",
      });
      setClients([]);
    } catch (error) {
      // Handle error
      console.error("Error submitting event details:", error);
      alert("Error submitting event details. Please try again.");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-50 min-h-screen p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl font-heading font-semibold text-gray-800 mb-6 flex items-center">
            <MdEventAvailable className="text-indigo-600 mr-2" />
            Add Event Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block  text-lg font-medium text-gray-700 flex items-center">
                <MdEventAvailable className="text-indigo-600 mr-2" />
                Exhibition Name
              </label>
              <input
                type="text"
                name="exhibitionName"
                value={eventData.exhibitionName}
                onChange={handleChange}
                required
                placeholder="Enter exhibition name"
                className="w-3/4 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-lg font-medium text-gray-700 flex items-center">
                  <AiFillCalendar className="text-indigo-600 mr-2" />
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={eventData.startDate}
                  onChange={handleChange}
                  required
                  className="w-3/4 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 flex items-center">
                  <AiFillCalendar className="text-indigo-600 mr-2" />
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={eventData.endDate}
                  onChange={handleChange}
                  required
                  className="w-3/4 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 flex items-center">
                <FaBuilding className="text-indigo-600 mr-2" />
                Venue
              </label>
              <input
                type="text"
                name="venue"
                value={eventData.venue}
                onChange={handleChange}
                required
                placeholder="Enter venue"
                className="w-3/4 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 flex items-center">
                <FaCity className="text-indigo-600 mr-2" />
                City
              </label>
              <input
                type="text"
                name="city"
                value={eventData.city}
                onChange={handleChange}
                required
                placeholder="Enter city"
                className="w-3/4 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 flex items-center">
                <AiOutlineCheckCircle className="text-indigo-600 mr-2" />
                Directory Available
              </label>
              <select
                name="directoryAvailable"
                value={eventData.directoryAvailable}
                onChange={handleChange}
                required
                className="w-3/4 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 flex items-center">
                <AiOutlinePlusCircle className="text-indigo-600 mr-2" />
                Add Existing Clients
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  value={clientInput}
                  onChange={(e) => setClientInput(e.target.value)}
                  placeholder="Enter client name"
                  className="w-3/4 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={handleAddClient}
                  className="bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Add
                </button>
              </div>
              <ul className="mt-4 space-y-2">
                {clients.map((client, index) => (
                  <li
                    key={index}
                    className="bg-gray-100 px-4 py-2 rounded-lg shadow-sm text-gray-800 font-medium"
                  >
                    {client}
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="submit"
              className="w-full font-heading py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 font-semibold text-lg"
            >
              Submit Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
