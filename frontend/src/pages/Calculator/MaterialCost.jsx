import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTotalCost } from "../../contexts/TotalCostContext"; // Import context hook

function MaterialCost() {
  // Define the materials with their respective rates
  const materials = [
    { name: "Wood", rate: 800 },
    { name: "Glass", rate: 2000 },
    { name: "Branding", rate: 30000 },
  ];

  const { updateTotal } = useTotalCost(); // Get the total costs from context

  // Function to load data from localStorage or use default values
  const loadFormData = () => {
    const savedData = localStorage.getItem("materialFormData");
    return savedData
      ? JSON.parse(savedData)
      : materials.map((material) => ({
          material: material.name,
          sizeOrDays: 0, // Initial size (m) / days set to 0
          rateValue: 1, // Fixed value of 1
          rate: material.rate, // Rate from the materials list
          totalCost: 0, // Initial total cost set to 0
        }));
  };

  const [formData, setFormData] = useState(loadFormData);

  const handleChange = (index, field, value) => {
    const newFormData = [...formData];
    newFormData[index][field] = parseFloat(value) || 0;

    // Update total cost when the sizeOrDays changes
    if (field === "sizeOrDays") {
      const size = parseFloat(newFormData[index].sizeOrDays) || 0;
      newFormData[index].totalCost = newFormData[index].rate * size;

      // Update the total cost in the context for materialCost
      const totalMaterialCost = newFormData.reduce(
        (sum, item) => sum + item.totalCost,
        0
      );
      updateTotal("materialCost", totalMaterialCost); // Update context
    }

    setFormData(newFormData);
  };

  useEffect(() => {
    // Save form data to localStorage whenever it changes
    localStorage.setItem("materialFormData", JSON.stringify(formData));

    // Calculate the total cost for material cost
    const totalMaterialCost = formData.reduce(
      (sum, item) => sum + item.totalCost,
      0
    );
    updateTotal("materialCost", totalMaterialCost);
  }, [formData, updateTotal]); // Dependencies on formData and updateTotal

  return (
    <div className="p-8 max-w-4xl mx-auto font-roboto">
      <h1 className="text-4xl font-semibold mb-8 text-center text-blue-600">
        Material Cost
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr>
              <th className="p-6 border-b text-lg text-gray-800">Material</th>
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
                <td className="p-6 border-b text-lg">{row.material}</td>
                <td className="p-6 border-b text-center text-lg text-gray-700">
                  Stall Size
                </td>
                <td className="p-6 border-b text-lg font-semibold">
                  1 {/* Fixed Value */}
                </td>
                <td className="p-6 border-b">
                  <input
                    type="number"
                    value={row.sizeOrDays}
                    onChange={(e) =>
                      handleChange(index, "sizeOrDays", e.target.value)
                    }
                    placeholder="Enter Size"
                    className="w-full px-4 py-3 border rounded focus:outline-none text-lg"
                  />
                </td>
                <td className="p-6 border-b text-lg font-semibold">
                  ₹{row.totalCost.toFixed(2) || 0}{" "}
                  {/* Display the calculated total */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-12">
        <Link
          to="/transportation"
          className="bg-gray-500 text-white px-6 py-3 text-xl rounded hover:bg-gray-600 mr-4"
        >
          Back: Transportation
        </Link>
        <Link
          to="/final"
          className="bg-blue-500 text-white px-6 py-3 text-xl rounded hover:bg-blue-600"
        >
          Next: Final Cost
        </Link>
      </div>
    </div>
  );
}

export default MaterialCost;
