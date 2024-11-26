import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header"; // Import the Header component

const EventDetails = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 25;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("https://api.dbzmanager.com/events");
        const data = response.data;

        if (Array.isArray(data.events)) {
          // Sort events by start date in ascending order
          const sortedEvents = data.events.sort((a, b) => {
            return new Date(a.start_date) - new Date(b.start_date);
          });
          setEvents(sortedEvents);
        } else {
          console.error("Expected an array, but got:", data.events);
          setEvents([]);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events.");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(date).toLocaleDateString("en-GB", options);
  };

  const formatExistingClients = (clients) => {
    if (clients) {
      return clients
        .split(",")
        .map((client, index) => <p key={index}>{client.trim()}</p>);
    }
    return null;
  };

  // Get current events for the current page
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const totalPages = Math.ceil(events.length / eventsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Header /> {/* Include the Header at the top */}
      <div className="flex justify-center p-6">
        <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-heading font-semibold text-gray-800 mb-6">
            Event Details
          </h2>
          {Array.isArray(events) && events.length > 0 ? (
            <>
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 font-heading text-left text-indigo-600">
                      Exhibition Name
                    </th>
                    <th className="px-4 py-2 text-left font-heading text-indigo-600">
                      Venue
                    </th>
                    <th className="px-4 py-2 font-heading text-left text-indigo-600">
                      City
                    </th>
                    <th className="px-4 py-2 font-heading text-left text-indigo-600">
                      Start Date
                    </th>
                    <th className="px-4 py-2 font-heading text-left text-indigo-600">
                      End Date
                    </th>
                    <th className="px-4 py-2 font-heading text-left text-indigo-600">
                      Directory Available
                    </th>
                    <th className="px-4 py-2 font-heading text-left text-indigo-600">
                      Existing Clients
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentEvents.map((event, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 font-heading py-2">
                        {event.exhibition_name}
                      </td>
                      <td className="px-4 font-heading py-2">{event.venue}</td>
                      <td className="px-4 font-heading py-2">{event.city}</td>
                      <td className="px-4 font-heading py-2">
                        {formatDate(event.start_date)}
                      </td>
                      <td className="px-4 font-heading py-2">
                        {formatDate(event.end_date)}
                      </td>
                      <td className="px-4 font-heading py-2">
                        {event.directory_available}
                      </td>
                      <td className="px-4 font-heading py-2">
                        {formatExistingClients(event.existing_clients)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={handlePrevPage}
                  className="px-6 py-3 text-white bg-indigo-600 rounded-lg disabled:bg-gray-300"
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                {/* Centered Page Number */}
                <span className="text-gray-700 ">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={handleNextPage}
                  className="px-6 py-3 text-white bg-indigo-600 rounded-lg disabled:bg-gray-300"
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <p>No events available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
