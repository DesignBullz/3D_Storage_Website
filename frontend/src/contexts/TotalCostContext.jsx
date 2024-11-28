import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

// Create the context
const TotalCostContext = createContext();

export const useTotalCost = () => {
  return useContext(TotalCostContext);
};

export const TotalCostProvider = ({ children }) => {
  // Function to load the state from localStorage
  const loadTotalCostsFromLocalStorage = () => {
    const savedCosts = localStorage.getItem("totalCosts");
    return savedCosts
      ? JSON.parse(savedCosts)
      : {
          materialCost: 0,
          transportationCost: 0,
          furnitureCost: 0,
          flooringCost: 0,
          lightingAndElectricianCost: 0,
          labourCost: 0,
        };
  };

  // Initialize the total costs state, either from localStorage or default values
  const [totalCosts, setTotalCosts] = useState(loadTotalCostsFromLocalStorage);

  // Update localStorage whenever totalCosts changes
  useEffect(() => {
    localStorage.setItem("totalCosts", JSON.stringify(totalCosts));
  }, [totalCosts]);

  // Optimized updateTotal with useCallback to avoid unnecessary re-renders
  const updateTotal = useCallback((key, value) => {
    if (value >= 0) {
      setTotalCosts((prevCosts) => ({
        ...prevCosts,
        [key]: value,
      }));
    } else {
      console.error("Invalid cost value");
    }
  }, []);

  // Update multiple totals at once (optional feature)
  const updateMultipleTotals = (newCosts) => {
    setTotalCosts((prevCosts) => ({
      ...prevCosts,
      ...newCosts, // Merges multiple updates at once
    }));
  };

  // Function to reset all costs to zero
  const resetTotal = () => {
    setTotalCosts({
      materialCost: 0,
      transportationCost: 0,
      furnitureCost: 0,
      flooringCost: 0,
      lightingAndElectricianCost: 0,
      labourCost: 0,
    });
    // Optionally remove from localStorage as well
    localStorage.removeItem("totalCosts");
  };

  return (
    <TotalCostContext.Provider
      value={{ totalCosts, updateTotal, updateMultipleTotals, resetTotal }}
    >
      {children}
    </TotalCostContext.Provider>
  );
};
