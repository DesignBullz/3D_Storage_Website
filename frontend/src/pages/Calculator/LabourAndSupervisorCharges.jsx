import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTotalCost } from "../../contexts/TotalCostContext"; // Import context hook

function LabourAndSupervisorCharges() {
  const roles = [
    "Carpenter",
    "Painter",
    "Labour - Loading/Unloading",
    "Electrician",
    "Supervisor",
  ];

  // Define rates for each role
  const rates = {
    Carpenter: 1500,
    Painter: 1000,
    "Labour - Loading/Unloading": 800,
    Electrician: 650,
    Supervisor: 650, // Supervisor rate is fixed at 650
  };

  // Function to load data from localStorage or use default values
  const loadFormData = () => {
    const savedData = localStorage.getItem("labourFormData");
    return savedData
      ? JSON.parse(savedData)
      : roles.map((role) => ({
          role,
          sizeOrDays: 0, // Initialize with 0
          rateValue: rates[role], // Use the rate from the rates object
          totalValue: 0, // Start with total value as 0
        }));
  };

  // Initialize state with localStorage data or default values
  const [formData, setFormData] = useState(loadFormData);

  const { updateTotal } = useTotalCost(); // Use context to update the total

  const handleChange = (index, field, value) => {
    const newFormData = [...formData];

    // Ensure that sizeOrDays is a valid positive number
    const sizeOrDays = Math.max(0, parseFloat(value) || 0); // Ensures non-negative value
    newFormData[index][field] = sizeOrDays;

    // Calculate the total value based on the sizeOrDays and rateValue for each role
    newFormData[index].totalValue = sizeOrDays * newFormData[index].rateValue;

    setFormData(newFormData);
  };

  useEffect(() => {
    // Save form data to localStorage whenever it changes
    localStorage.setItem("labourFormData", JSON.stringify(formData));

    // Calculate the total charges for all roles
    const totalLabourCharges = formData.reduce(
      (sum, item) => sum + item.totalValue,
      0
    );

    // Update the total cost in context
    updateTotal("labourCost", totalLabourCharges);
  }, [formData, updateTotal]); // Dependencies on formData and updateTotal

  return (
    <div className="p-8 max-w-4xl mx-auto font-roboto">
      <h1 className="text-4xl font-semibold mb-8 text-center text-blue-600">
        Labour and Supervisor Charges
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr>
              <th className="p-6 border-b text-lg text-gray-800">Role</th>
              <th className="p-6 border-b text-lg text-gray-800">Value Type</th>
              <th className="p-6 border-b text-lg text-gray-800">Value</th>
              <th className="p-6 border-b text-lg text-gray-800">
                Size (m) / Days
              </th>
              <th className="p-6 border-b text-lg text-gray-800">Total</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-6 border-b text-lg">{row.role}</td>
                <td className="p-6 border-b text-center text-lg text-gray-700">
                  {row.role === "Electrician" || row.role === "Supervisor"
                    ? "Event Days"
                    : "Stall Size"}
                </td>
                {/* Fixed value of 1 for each role */}
                <td className="p-6 border-b text-lg text-center font-semibold">
                  1
                </td>
                <td className="p-6 border-b">
                  <input
                    type="number"
                    value={row.sizeOrDays}
                    onChange={(e) =>
                      handleChange(index, "sizeOrDays", e.target.value)
                    }
                    placeholder="Enter Size/Days"
                    className="w-full px-4 py-3 border rounded focus:outline-none text-lg"
                  />
                </td>
                {/* Display the total value for each role */}
                <td className="p-6 border-b text-lg font-semibold">
                  ₹{row.totalValue.toFixed(2) || 0}{" "}
                  {/* If totalValue is empty, show 0 */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Button to navigate to next page */}
      <div className="flex justify-center mt-12">
        <Link
          to="/lighting"
          className="bg-blue-500 text-white px-6 py-3 text-xl rounded hover:bg-blue-600"
        >
          Next: Lighting & Electrician
        </Link>
      </div>
    </div>
  );
}

export default LabourAndSupervisorCharges;
