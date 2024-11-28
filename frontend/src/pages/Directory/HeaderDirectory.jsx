import React, { useEffect, useState } from "react";
import axios from "axios";

import { FaDownload, FaEye } from "react-icons/fa";

const HeaderDirectory = () => {
  const [directories, setDirectories] = useState([]);
  const [filteredDirectories, setFilteredDirectories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);

  useEffect(() => {
    // Fetch directories from the backend API
    const fetchDirectories = async () => {
      try {
        const response = await axios.get(
          "https://api.dbzmanager.com/get-directories"
        );
        setDirectories(response.data.data); // Assuming data structure: { message: string, data: [] }
        setFilteredDirectories(response.data.data); // Set filtered directories initially to all directories
      } catch (err) {
        console.error("Error fetching directories:", err);
        setError("Failed to fetch directories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDirectories();
  }, []);

  useEffect(() => {
    // Pagination logic when filteredDirectories or currentPage changes
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentDirectories = filteredDirectories.slice(
      indexOfFirst,
      indexOfLast
    );
    setDirectories(currentDirectories);
  }, [currentPage, filteredDirectories]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === "") {
      setFilteredDirectories(directories); // Reset to all directories if the search term is empty
    } else {
      const filtered = directories.filter(
        (directory) =>
          directory.exhibition_name.toLowerCase().includes(term) ||
          directory.year.toString().includes(term) ||
          directory.venue.toLowerCase().includes(term)
      );
      setFilteredDirectories(filtered);
      setCurrentPage(1); // Reset to page 1 after search
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredDirectories.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Component */}

      {/* Main Content */}
      <main className="flex-1 p-10">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-[95%] mx-auto space-y-8">
          <h1 className="text-3xl font-heading font-extrabold text-gray-800 mb-6">
            Exhibition Directories
          </h1>

          {/* Search Input */}
          <div className="mb-6">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search by Exhibition Name, Year, or Venue"
              className="w-full px-6 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {loading ? (
            <p className="text-center text-lg text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-center text-lg text-red-500">{error}</p>
          ) : filteredDirectories.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-100 border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="px-6 py-4 font-heading text-gray-800 w-[10%]">
                      Serial No.
                    </th>
                    <th className="px-6 py-4 font-heading text-gray-800 w-[25%]">
                      Exhibition Name
                    </th>
                    <th className="px-6 py-4 font-heading text-gray-800 w-[20%]">
                      Year
                    </th>
                    <th className="px-6 py-4 font-heading text-gray-800 w-[25%]">
                      Venue
                    </th>
                    <th className="px-6 py-4 font-heading text-gray-800 w-[20%]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {directories.map((directory, index) => (
                    <tr
                      key={directory.id}
                      className="hover:bg-gray-200 transition duration-200"
                    >
                      <td className="px-6 py-4">{directory.id}</td>
                      {/* Serial number */}
                      <td className="px-6 py-4">{directory.exhibition_name}</td>
                      <td className="px-6 py-4">{directory.year}</td>
                      <td className="px-6 py-4">{directory.venue}</td>
                      <td className="px-6 py-4 flex space-x-4">
                        {/* View Button */}
                        {directory.document_url && (
                          <a
                            href={directory.document_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-100 transition duration-300"
                          >
                            <FaEye className="mr-2" /> View
                          </a>
                        )}
                        {/* Download Button */}
                        {directory.documentDownloadLink && (
                          <a
                            href={directory.documentDownloadLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-100 transition duration-300"
                          >
                            <FaDownload className="mr-2" /> Download
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center font-heading text-lg text-gray-500">
              No directories found.
            </p>
          )}

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-6 py-3 text-white bg-indigo-600 rounded-lg disabled:bg-gray-300"
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of{" "}
              {Math.ceil(filteredDirectories.length / itemsPerPage)}
            </span>
            <button
              onClick={handleNextPage}
              disabled={
                currentPage ===
                Math.ceil(filteredDirectories.length / itemsPerPage)
              }
              className="px-6 py-3 text-white bg-indigo-600 rounded-lg disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HeaderDirectory;
