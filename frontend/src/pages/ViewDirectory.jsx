import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import {
  FaFileAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaDownload,
} from "react-icons/fa";

const ViewDirectory = () => {
  const [directories, setDirectories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch directories from the backend API
    const fetchDirectories = async () => {
      try {
        const response = await axios.get(
          "https://api.dbzmanager.com/get-directories"
        );
        setDirectories(response.data.data); // Assuming data structure: { message: string, data: [] }
      } catch (err) {
        console.error("Error fetching directories:", err);
        setError("Failed to fetch directories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDirectories();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-10">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-heading font-extrabold text-gray-800 mb-6 flex items-center">
            <FaFileAlt className="mr-2 text-indigo-600" /> View Exhibition
            Directories
          </h1>

          {loading ? (
            <p className="text-center text-lg text-gray-500 font-heading flex items-center justify-center">
              <FaFileAlt className="mr-2 animate-spin" /> Loading...
            </p>
          ) : error ? (
            <p className="text-center text-lg text-red-500">{error}</p>
          ) : directories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {directories.map((directory) => (
                <div
                  key={directory.id}
                  className="p-6 bg-gray-100 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-200 transition duration-300"
                >
                  <h2 className="text-xl font-heading font-semibold text-gray-800 flex items-center mb-2">
                    <FaFileAlt className="mr-2 text-indigo-600" />{" "}
                    {directory.exhibition_name}
                  </h2>
                  <p className="text-gray-600 font-heading flex items-center">
                    <FaCalendarAlt className="mr-2 text-blue-500" /> Year:{" "}
                    {directory.year}
                  </p>
                  <p className="text-gray-600 font-heading flex items-center mt-1">
                    <FaMapMarkerAlt className="mr-2 text-red-500" /> Venue:{" "}
                    {directory.venue}
                  </p>
                  {directory.documentDownloadLink && (
                    <a
                      href={directory.documentDownloadLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center font-heading px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                    >
                      <FaDownload className="mr-2" /> Download Document
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center font-heading text-lg text-gray-500">
              No directories found.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ViewDirectory;
