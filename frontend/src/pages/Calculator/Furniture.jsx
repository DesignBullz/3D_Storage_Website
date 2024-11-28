import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTotalCost } from "../../contexts/TotalCostContext"; // Import context hook

function Furniture() {
  const furnitureItems = [
    { name: "Revolving Chair", rate: 650 },
    { name: "Fix Chair", rate: 500 },
    { name: "Bar Stool", rate: 500 },
    { name: "Glass Table", rate: 600 },
    { name: "Sofa Seats", rate: 1200 },
    { name: "Brochure Stand", rate: 500 },
  ];

  const loadFormData = () => {
    const savedData = localStorage.getItem("furnitureFormData");
    return savedData
      ? JSON.parse(savedData)
      : furnitureItems.map((item) => ({
          item: item.name,
          rate: item.rate,
          sizeOrDays: 1, // Fixed size to 1
          value: 0, // Starting custom value is 0
          totalCost: 0, // Initial total cost is 0
        }));
  };

  const [formData, setFormData] = useState(loadFormData);

  const { updateTotal } = useTotalCost(); // Use context to update the total

  const handleChange = (index, field, value) => {
    const newFormData = [...formData];
    newFormData[index][field] = parseFloat(value) || 0;

    // Update the total cost based on the entered values
    if (field === "value") {
      newFormData[index].totalCost =
        newFormData[index].sizeOrDays *
        newFormData[index].rate *
        newFormData[index].value;
    }

    setFormData(newFormData);
  };

  useEffect(() => {
    // Save form data to localStorage whenever it changes
    localStorage.setItem("furnitureFormData", JSON.stringify(formData));

    // Calculate the total furniture cost
    const furnitureTotal = formData.reduce(
      (sum, item) => sum + item.totalCost,
      0
    );

    // Update the total cost in the context
    updateTotal("furnitureCost", furnitureTotal);
  }, [formData, updateTotal]); // Dependencies on formData and updateTotal

  return (
    <div className="p-8 max-w-4xl mx-auto font-roboto">
      <h1 className="text-4xl font-semibold mb-8 text-center text-blue-600">
        Furniture
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr>
              <th className="p-6 border-b text-lg text-gray-800">Item</th>
              <th className="p-6 border-b text-lg text-gray-800">Value Type</th>
              <th className="p-6 border-b text-lg text-gray-800">
                Size (m) / Days
              </th>
              <th className="p-6 border-b text-lg text-gray-800">Value</th>
              <th className="p-6 border-b text-lg text-gray-800">Total</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-6 border-b text-lg">{row.item}</td>
                <td className="p-6 border-b text-center text-lg text-gray-700">
                  Quantity
                </td>
                <td className="p-6 border-b">
                  <input
                    type="number"
                    value={row.sizeOrDays}
                    readOnly
                    className="w-full px-4 py-3 border rounded focus:outline-none text-lg bg-gray-200"
                  />
                </td>
                <td className="p-6 border-b">
                  <input
                    type="number"
                    value={row.value}
                    onChange={(e) =>
                      handleChange(index, "value", e.target.value)
                    }
                    placeholder="Enter Value"
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
          to="/flooring"
          className="bg-gray-500 text-white px-6 py-3 text-xl rounded hover:bg-gray-600 mr-4"
        >
          Back: Flooring
        </Link>
        <Link
          to="/transportation"
          className="bg-blue-500 text-white px-6 py-3 text-xl rounded hover:bg-blue-600"
        >
          Next: Transportation
        </Link>
      </div>
    </div>
  );
}

export default Furniture;
