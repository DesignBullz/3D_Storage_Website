import React, { useEffect, useState } from "react";
import axios from "axios";

import "./style.css";
import Header from "../../components/Header";

const HeaderInquiry = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc"); // Sorting order: 'asc' or 'desc'

  // Fetch inquiries data from the API
  useEffect(() => {
    axios
      .get("https://api.dbzmanager.com/get-inquiries")
      .then((response) => {
        setInquiries(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching inquiries");
        setLoading(false);
      });
  }, []);

  const handleSortById = () => {
    const sortedInquiries = [...inquiries].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
    setInquiries(sortedInquiries);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleViewDetails = (inquiry) => {
    setSelectedInquiry(inquiry);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setSelectedInquiry(null);
    setShowDetails(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Header />
      <div className="flex">
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold text-center mb-6 font-heading">
            Inquiry Details
          </h1>
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gradient-to-r from-yellow-300 to-yellow-600 text-white">
                <th
                  className="p-4 cursor-pointer font-heading"
                  onClick={handleSortById}
                >
                  Inquiry ID
                  {sortOrder === "asc" ? " ▲" : " ▼"}
                </th>
                <th className="p-4 font-heading">Company Name</th>
                <th className="p-4 font-heading">Contact Person</th>
                <th className="p-4 font-heading">Event Name</th>
                <th className="p-4 font-heading">Venue City</th>
                <th className="p-4 font-heading">Event Date</th>
                <th className="p-4 font-heading">Submission Time</th>
                <th className="p-4 font-heading">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inquiry) => (
                <tr key={inquiry.id} className="bg-gray-100 hover:bg-indigo-50">
                  <td className="p-4">{inquiry.id}</td>
                  <td className="p-4">{inquiry.company_name}</td>
                  <td className="p-4">{inquiry.contact_person}</td>
                  <td className="p-4">{inquiry.event_name}</td>
                  <td className="p-4">{inquiry.venue_city}</td>
                  <td className="p-4">
                    {new Date(inquiry.event_date).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    {new Date(inquiry.submission_time).toLocaleString()}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleViewDetails(inquiry)}
                      className="bg-gradient-to-r from-red-500 to-black text-white px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-yellow-300 hover:to-yellow-600 transition-all duration-300"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showDetails && selectedInquiry && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg w-3/4 max-w-4xl shadow-lg overflow-y-auto">
                <h2 className="text-xl font-bold mb-4 text-center font-heading">
                  Inquiry Details: {selectedInquiry.company_name}
                </h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[80vh] overflow-y-auto">
                  {/* Company Name */}
                  <div>
                    <label className="block font-heading font-semibold">
                      Company Name:
                    </label>
                    <input
                      type="text"
                      value={selectedInquiry.company_name}
                      readOnly
                      className="border p-2 rounded w-full"
                    />
                  </div>

                  {/* Contact Person */}
                  <div>
                    <label className="block font-semibold font-heading">
                      Contact Person:
                    </label>
                    <input
                      type="text"
                      value={selectedInquiry.contact_person}
                      readOnly
                      className="border p-2 rounded w-full"
                    />
                  </div>

                  {/* Contact Email */}
                  <div>
                    <label className="block font-semibold font-heading">
                      Contact Email:
                    </label>
                    <input
                      type="email"
                      value={selectedInquiry.contact_email}
                      readOnly
                      className="border p-2 rounded w-full"
                    />
                  </div>

                  {/* Contact Number */}
                  <div>
                    <label className="block font-semibold font-heading">
                      Contact Number:
                    </label>
                    <input
                      type="text"
                      value={selectedInquiry.contact_number}
                      readOnly
                      className="border p-2 rounded w-full"
                    />
                  </div>

                  {/* Website */}
                  <div>
                    <label className="block font-semibold font-heading">
                      Website:
                    </label>
                    <input
                      type="text"
                      value={selectedInquiry.website}
                      readOnly
                      className="border p-2 rounded w-full"
                    />
                  </div>

                  {/* Event Name */}
                  <div>
                    <label className="block font-semibold font-heading">
                      Event Name:
                    </label>
                    <input
                      type="text"
                      value={selectedInquiry.event_name}
                      readOnly
                      className="border p-2 rounded w-full"
                    />
                  </div>

                  {/* Venue City */}
                  <div>
                    <label className="block font-semibold font-heading">
                      Venue City:
                    </label>
                    <input
                      type="text"
                      value={selectedInquiry.venue_city}
                      readOnly
                      className="border p-2 rounded w-full"
                    />
                  </div>

                  {/* Event Date */}
                  <div>
                    <label className="block font-semibold font-heading">
                      Event Date:
                    </label>
                    <input
                      type="date"
                      value={
                        new Date(selectedInquiry.event_date)
                          .toISOString()
                          .split("T")[0]
                      }
                      readOnly
                      className="border p-2 rounded w-full"
                    />
                  </div>

                  {/* Stall Size */}
                  <div>
                    <label className="block font-semibold font-heading">
                      Stall Size:
                    </label>
                    <input
                      type="text"
                      value={selectedInquiry.stall_size}
                      readOnly
                      className="border p-2 rounded w-full"
                    />
                  </div>

                  {/* Sides Open Stall */}
                  <div>
                    <label className="block font-semibold font-heading">
                      Sides Open Stall:
                    </label>
                    <input
                      type="text"
                      value={selectedInquiry.sides_open_stall}
                      readOnly
                      className="border p-2 rounded w-full"
                    />
                  </div>

                  {/* Floor Plan */}
                  <div className="col-span-2">
                    <label className="block font-semibold mb-2 font-heading">
                      Floor Plan:
                    </label>
                    <a
                      href={selectedInquiry.floorPlanDownloadLink}
                      download
                      className="px-4 py-2 bg-gradient-to-r from-red-500 to-black text-white rounded hover:bg-gradient-to-r hover:from-yellow-300 hover:to-yellow-600 transition-all duration-300"
                    >
                      Download Floor Plan
                    </a>
                  </div>

                  {/* Logo Files */}
                  <div className="col-span-2 mt-4">
                    <label className="block font-semibold mb-2 font-heading">
                      Logo Files:
                    </label>
                    <a
                      href={selectedInquiry.logoFileDownloadLink}
                      download
                      className="px-4 py-2 bg-gradient-to-r from-red-500 to-black text-white rounded hover:bg-gradient-to-r hover:from-yellow-300 hover:to-yellow-600 transition-all duration-300"
                    >
                      Download Logo
                    </a>
                  </div>
                  {/* Brand Color */}
                  <div>
                    <label className="block font-semibold font-heading">
                      Brand Color:
                    </label>
                    <input
                      type="text"
                      value={selectedInquiry.brand_color}
                      readOnly
                      className="border p-2 rounded w-full"
                    />
                  </div>

                  {/* Meeting Room Required */}
                  <div>
                    <label className="block font-semibold font-heading">
                      Meeting Room Required:
                    </label>
                    <input
                      type="text"
                      value={selectedInquiry.meeting_room_required}
                      readOnly
                      className="border p-2 rounded w-full"
                    />
                  </div>

                  {/* Store Room Required */}
                  <div>
                    <label className="block font-semibold font-heading">
                      Store Room Required:
                    </label>
                    <input
                      type="text"
                      value={selectedInquiry.store_room_required}
                      readOnly
                      className="border p-2 rounded w-full"
                    />
                  </div>

                  {/* TV/LED Wall Required */}
                  <div>
                    <label className="block font-semibold font-heading">
                      TV/LED Wall Required:
                    </label>
                    <input
                      type="text"
                      value={selectedInquiry.tv_led_wall_required}
                      readOnly
                      className="border p-2 rounded w-full"
                    />
                  </div>

                  {/* Product Display */}
                  <div>
                    <label className="block font-semibold font-heading">
                      Product Display:
                    </label>
                    <input
                      type="text"
                      value={selectedInquiry.product_display}
                      readOnly
                      className="border p-2 rounded w-full"
                    />
                  </div>

                  {/* Seating Requirements */}
                  <div className="col-span-2">
                    <label className="block font-semibold font-heading">
                      Seating Requirements:
                    </label>
                    <textarea
                      value={JSON.parse(selectedInquiry.seating_requirements)}
                      readOnly
                      className="border p-2 rounded w-full"
                    />
                  </div>

                  {/* Number of Products */}
                  <div>
                    <label className="block font-semibold font-heading">
                      Number of Products:
                    </label>
                    <input
                      type="text"
                      value={selectedInquiry.number_of_products}
                      readOnly
                      className="border p-2 rounded w-full"
                    />
                  </div>

                  {/* Size of Products */}
                  <div>
                    <label className="block font-semibold font-heading">
                      Size of Products:
                    </label>
                    <input
                      type="text"
                      value={selectedInquiry.size_of_products}
                      readOnly
                      className="border p-2 rounded w-full"
                    />
                  </div>

                  {/* Weight of Products */}
                  <div>
                    <label className="block font-semibold font-heading">
                      Weight of Products:
                    </label>
                    <input
                      type="text"
                      value={selectedInquiry.weight_of_products}
                      readOnly
                      className="border p-2 rounded w-full"
                    />
                  </div>

                  {/* Deadline */}
                  <div>
                    <label className="block font-semibold font-heading">
                      Deadline:
                    </label>
                    <input
                      type="date"
                      value={
                        new Date(selectedInquiry.deadline)
                          .toISOString()
                          .split("T")[0]
                      }
                      readOnly
                      className="border p-2 rounded w-full"
                    />
                  </div>

                  {/* Specific Information */}
                  <div className="col-span-2">
                    <label className="block font-semibold font-heading">
                      Specific Information:
                    </label>
                    <textarea
                      value={selectedInquiry.specific_information}
                      readOnly
                      className="border p-2 rounded w-full"
                    />
                  </div>

                  {/* Suggested Budget */}
                  <div>
                    <label className="block font-semibold font-heading">
                      Suggested Budget:
                    </label>
                    <input
                      type="text"
                      value={selectedInquiry.suggested_budget}
                      readOnly
                      className="border p-2 rounded w-full"
                    />
                  </div>

                  {/* Close Button */}
                  <div className="col-span-2 flex justify-end">
                    <button
                      onClick={handleCloseDetails}
                      className="mt-4 bg-gradient-to-r from-red-500 to-black text-white px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-yellow-300 hover:to-yellow-600 transition-all duration-300"
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderInquiry;
