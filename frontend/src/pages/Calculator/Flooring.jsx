import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTotalCost } from "../../contexts/TotalCostContext"; // Import the context hook

function Flooring() {
  const flooringTypes = [
    { name: "Normal Carpet", rate: 150 },
    { name: "PVC Flooring", rate: 450 },
    { name: "Wooden Flooring", rate: 850 },
    { name: "Grass-Artificial", rate: 2000 },
  ];

  const loadFormData = () => {
    const savedData = localStorage.getItem("flooringFormData");
    return savedData
      ? JSON.parse(savedData)
      : [
          {
            type: "4th Raised Platform",
            sizeOrDays: 0,
            value: 1,
            totalCost: 0,
          },
          { type: "", sizeOrDays: 0, value: 1, totalCost: 0 },
        ]; // Default data if nothing in localStorage
  };

  const [formData, setFormData] = useState(loadFormData);

  const { updateTotal } = useTotalCost(); // Use context to update the total

  const handleChange = (index, field, value) => {
    const newFormData = [...formData];
    newFormData[index][field] = value;

    if (field === "sizeOrDays" || field === "type") {
      const sizeOrDays = parseFloat(newFormData[index].sizeOrDays) || 0;
      const rate =
        index === 0
          ? 275
          : flooringTypes.find(
              (floor) => floor.name === newFormData[index].type
            )?.rate || 0;

      newFormData[index].totalCost = rate * sizeOrDays;
    }

    setFormData(newFormData);
  };

  useEffect(() => {
    // Save form data to localStorage whenever it changes
    localStorage.setItem("flooringFormData", JSON.stringify(formData));

    // Calculate the total cost for flooring
    const flooringTotal = formData.reduce(
      (sum, item) => sum + item.totalCost,
      0
    );

    // Update the total cost in the context
    updateTotal("flooringCost", flooringTotal);
  }, [formData, updateTotal]); // Dependencies on formData and updateTotal

  return (
    <div className="p-8 max-w-4xl mx-auto font-roboto">
      <h1 className="text-4xl font-semibold mb-8 text-center text-blue-600">
        Flooring
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr>
              <th className="p-6 border-b text-lg text-gray-800">
                Flooring Type
              </th>
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
                <td className="p-6 border-b text-lg">
                  {index === 0 ? (
                    "4th Raised Platform"
                  ) : (
                    <select
                      value={row.type}
                      onChange={(e) =>
                        handleChange(index, "type", e.target.value)
                      }
                      className="w-full px-4 py-3 border rounded focus:outline-none text-lg"
                    >
                      <option value="">Select Floor Type</option>
                      {flooringTypes.map((flooring, idx) => (
                        <option key={idx} value={flooring.name}>
                          {flooring.name}
                        </option>
                      ))}
                    </select>
                  )}
                </td>
                <td className="p-6 border-b text-center text-lg text-gray-700">
                  {index === 0 ? "Stall Size" : "Floor Type"}
                </td>
                <td className="p-6 border-b">{1}</td>
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
                <td className="p-6 border-b text-lg font-semibold">
                  {row.totalCost}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-12">
        <Link
          to="/lighting"
          className="bg-gray-500 text-white px-6 py-3 text-xl rounded hover:bg-gray-600 mr-4"
        >
          Back: Lighting & Electrician
        </Link>
        <Link
          to="/furniture"
          className="bg-blue-500 text-white px-6 py-3 text-xl rounded hover:bg-blue-600"
        >
          Next: Furniture
        </Link>
      </div>
    </div>
  );
}

export default Flooring;
