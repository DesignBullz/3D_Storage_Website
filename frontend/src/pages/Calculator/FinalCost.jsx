import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import { useTotalCost } from "../../contexts/TotalCostContext"; // Import context hook
import { jsPDF } from "jspdf"; // Import jsPDF

function FinalCost() {
  const { totalCosts, resetTotal } = useTotalCost(); // Get total costs from context
  const navigate = useNavigate(); // Use useNavigate for navigation

  // Load total costs from localStorage on component mount
  const loadTotalCosts = () => {
    const savedCosts = localStorage.getItem("totalCosts");
    return savedCosts ? JSON.parse(savedCosts) : totalCosts; // Fallback to context if not found
  };

  const [costs, setCosts] = useState(loadTotalCosts);

  useEffect(() => {
    // Update localStorage whenever the costs change
    localStorage.setItem("totalCosts", JSON.stringify(costs));
  }, [costs]); // Dependency on costs

  const {
    materialCost = 0,
    transportationCost = 0,
    furnitureCost = 0,
    flooringCost = 0,
    lightingAndElectricianCost = 0,
    labourCost = 0,
  } = costs; // Destructure the totalCosts object

  const totalAmount =
    materialCost +
    transportationCost +
    furnitureCost +
    flooringCost +
    lightingAndElectricianCost +
    labourCost;

  // Function to download the total cost as a PDF
  const downloadTotalCostAsPDF = () => {
    const doc = new jsPDF();

    // Set title and formatting
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(0, 102, 204); // Set color for the heading (blue)
    doc.text("Final Cost Summary", 14, 20);

    // Set normal text to use 'times' font, which supports the ₹ symbol
    doc.setFont("times", "normal"); // Use 'times' font
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Reset text color to black for other content

    const lineHeight = 10; // Line height for better spacing
    let yPos = 40; // Initial position for text content

    // Add content with details of the costs, using Unicode for ₹
    doc.text(`Material Cost: \u20B9${materialCost.toFixed(2)}`, 14, yPos);
    yPos += lineHeight;

    doc.text(
      `Transportation Cost: \u20B9${transportationCost.toFixed(2)}`,
      14,
      yPos
    );
    yPos += lineHeight;

    doc.text(`Furniture Cost: \u20B9${furnitureCost.toFixed(2)}`, 14, yPos);
    yPos += lineHeight;

    doc.text(`Flooring Cost: \u20B9${flooringCost.toFixed(2)}`, 14, yPos);
    yPos += lineHeight;

    doc.text(
      `Lighting Cost: \u20B9${lightingAndElectricianCost.toFixed(2)}`,
      14,
      yPos
    );
    yPos += lineHeight;

    doc.text(`Labour Cost: \u20B9${labourCost.toFixed(2)}`, 14, yPos);
    yPos += lineHeight;

    doc.setFont("times", "bold"); // Set font to bold for the total amount
    doc.text(`Total Amount: \u20B9${totalAmount.toFixed(2)}`, 14, yPos);

    // Save the document with the name "TotalCost.pdf"
    doc.save("TotalCost.pdf");
  };

  // Function to reset all data
  const handleReset = () => {
    // Clear all saved data in localStorage
    localStorage.removeItem("totalCosts");
    localStorage.removeItem("transportationFormData");
    localStorage.removeItem("materialFormData");
    localStorage.removeItem("lightingFormData");
    localStorage.removeItem("furnitureFormData");
    localStorage.removeItem("flooringFormData");
    localStorage.removeItem("labourFormData");

    // Reset context state (if any context is used for total costs)
    resetTotal(); // Assuming resetTotal clears the context in your TotalCostContext

    // Navigate to the starting page (Home)
    navigate("/welcome"); // Use navigate() to programmatically navigate to the homepage
  };

  return (
    <div className="p-8 max-w-4xl mx-auto font-roboto">
      <h1 className="text-4xl font-semibold mb-8 text-center text-blue-600">
        Final Cost
      </h1>

      <div className="space-y-6">
        <div className="flex justify-between text-lg">
          <span>Material Cost:</span>
          <span>₹{materialCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg">
          <span>Transportation Cost:</span>
          <span>₹{transportationCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg">
          <span>Furniture Cost:</span>
          <span>₹{furnitureCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg">
          <span>Flooring Cost:</span>
          <span>₹{flooringCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg">
          <span>Lighting Cost:</span>
          <span>₹{lightingAndElectricianCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg">
          <span>Labour Cost:</span>
          <span>₹{labourCost.toFixed(2)}</span>
        </div>

        <div className="flex justify-between font-bold text-xl">
          <span>Total Amount:</span>
          <span>₹{totalAmount.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <button
          onClick={handleReset}
          className="bg-red-500 text-white px-6 py-3 text-xl rounded hover:bg-red-600"
        >
          RESET
        </button>
      </div>

      {/* Download Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={downloadTotalCostAsPDF}
          className="bg-green-500 text-white px-6 py-3 text-xl rounded hover:bg-green-600"
        >
          Download Total Cost as PDF
        </button>
      </div>
    </div>
  );
}

export default FinalCost;
