import React, { useState } from "react";
import { useTotalCost } from "../../contexts/TotalCostContext"; // Import context hook

function CalculatorPanel() {
  const { updateMultipleTotals, totalCosts } = useTotalCost();

  const [newRow, setNewRow] = useState({
    item: "", // The name of the new cost item
    rate: 0, // The rate for the new item
    sizeOrDays: 0, // Size or days depending on the page
  });

  const [page, setPage] = useState("transportation"); // Define the current page (can be switched to other pages)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRow((prevRow) => ({
      ...prevRow,
      [name]: value,
    }));
  };

  const handleAddRow = () => {
    // Update the state with new row
    const updatedCosts = { ...totalCosts };

    // Logic for adding a new row to a specific page (like transportation)
    if (page === "transportation") {
      updatedCosts.transportationCost.push({
        item: newRow.item,
        rate: newRow.rate,
        sizeOrDays: newRow.sizeOrDays,
      });
    } else if (page === "furniture") {
      updatedCosts.furnitureCost.push({
        item: newRow.item,
        rate: newRow.rate,
        sizeOrDays: newRow.sizeOrDays,
      });
    } else if (page === "material") {
      updatedCosts.materialCost.push({
        item: newRow.item,
        rate: newRow.rate,
        sizeOrDays: newRow.sizeOrDays,
      });
    } else if (page === "lighting") {
      updatedCosts.lightingAndElectricianCost.push({
        item: newRow.item,
        rate: newRow.rate,
        sizeOrDays: newRow.sizeOrDays,
      });
    } else if (page === "flooring") {
      updatedCosts.flooringCost.push({
        item: newRow.item,
        rate: newRow.rate,
        sizeOrDays: newRow.sizeOrDays,
      });
    } else if (page === "labour") {
      updatedCosts.labourCost.push({
        item: newRow.item,
        rate: newRow.rate,
        sizeOrDays: newRow.sizeOrDays,
      });
    }

    // Update multiple costs in the context at once
    updateMultipleTotals(updatedCosts);

    // Clear form inputs
    setNewRow({ item: "", rate: 0, sizeOrDays: 0 });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto font-roboto">
      <h1 className="text-4xl font-semibold mb-8 text-center text-blue-600">
        Admin Panel
      </h1>

      <div className="space-y-6">
        {/* Select page to add a row */}
        <div className="flex justify-between mb-4">
          <span>Choose Page:</span>
          <select
            value={page}
            onChange={(e) => setPage(e.target.value)}
            className="px-4 py-2 border rounded text-lg"
          >
            <option value="transportation">Transportation</option>
            <option value="furniture">Furniture</option>
            <option value="material">Material</option>
            <option value="lighting">Lighting</option>
            <option value="flooring">Flooring</option>
            <option value="labour">Labour</option>
            {/* Add other pages as necessary */}
          </select>
        </div>

        {/* Form to add a new row */}
        <div className="space-y-4">
          <input
            type="text"
            name="item"
            value={newRow.item}
            onChange={handleChange}
            placeholder="Item Name"
            className="w-full px-4 py-3 border rounded focus:outline-none text-lg"
          />
          <input
            type="number"
            name="rate"
            value={newRow.rate}
            onChange={handleChange}
            placeholder="Rate"
            className="w-full px-4 py-3 border rounded focus:outline-none text-lg"
          />
          <input
            type="number"
            name="sizeOrDays"
            value={newRow.sizeOrDays}
            onChange={handleChange}
            placeholder="Size or Days"
            className="w-full px-4 py-3 border rounded focus:outline-none text-lg"
          />

          <div className="flex justify-center mt-4">
            <button
              onClick={handleAddRow}
              className="bg-blue-500 text-white px-6 py-3 text-xl rounded hover:bg-blue-600"
            >
              Add Row
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalculatorPanel;
