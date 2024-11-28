// // src/App.jsx
// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Upload from "./pages/upload.jsx";
// import ViewFiles from "./pages/ViewFiles.jsx";
// import AdminPanel from "./pages/AdminPanel.jsx";
// import Login from "./pages/Login.jsx";
// import Signup from "./pages/Signup.jsx";
// import AdminLogin from "./pages/AdminLogin.jsx";
// import AdminDashboard from "./pages/AdminDashboard.jsx";
// import InquiryForm from "./pages/InquiryForm.jsx";
// import InquiriesPage from "./pages/InquiriesPage.jsx";
// import AddDirectory from "./pages/AddDirectory.jsx";
// import ViewDirectory from "./pages/ViewDirectory.jsx";
// import UpcomingEvents from "./pages/UpcomingEvents.jsx";
// import EventDetails from "./pages/EventDetails.jsx";
// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/view" element={<ViewFiles />} />
//         <Route path="/upload" element={<Upload />} />
//         <Route path="/admin" element={<AdminPanel />} />
//         <Route path="/adminlogin" element={<AdminLogin />} />

//         <Route path="/signup" element={<Signup />} />
//         <Route path="/dashboard" element={<AdminDashboard />} />
//         <Route path="/form" element={<InquiryForm />} />
//         <Route path="/inquiries" element={<InquiriesPage />} />
//         <Route path="/add-directory" element={<AddDirectory />} />
//         <Route path="/view-directory" element={<ViewDirectory />} />
//         <Route path="/events" element={<UpcomingEvents />} />
//         <Route path="/event" element={<EventDetails />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// // src/App.jsx
// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from "./pages/Home/Login";
// import ViewFiles from "./pages/upload/ViewFiles";
// import Upload from "./pages/upload/upload";
// import AdminPanel from "./pages/Admin/AdminPanel";
// import AdminLogin from "./pages/Home/AdminLogin";
// import Signup from "./pages/Home/Signup";
// import AdminDashboard from "./pages/Admin/AdminDashboard";
// import InquiryForm from "./pages/Inquiry/InquiryForm";
// import InquiriesPage from "./pages/Inquiry/InquiriesPage";
// import AddDirectory from "./pages/Directory/AddDirectory";
// import ViewDirectory from "./pages/Directory/ViewDirectory";
// import UpcomingEvents from "./pages/Event/UpcomingEvents";
// import EventDetails from "./pages/Event/EventDetails";
// import HomePage from "./pages/Home/HomePage";
// import HeaderInquiry from "./pages/Inquiry/HeaderInquiry";
// import HeaderDirectory from "./pages/Directory/HeaderDirectory";
// import WelcomePage from "./pages/Calculator/WelcomePage";
// import LabourAndSupervisorCharges from "./pages/Calculator/LabourAndSupervisorCharges";
// import LightingAndElectrician from "./pages/Calculator/LightingAndElectrician";
// import Flooring from "./pages/Calculator/Flooring";
// import Furniture from "./pages/Calculator/Furniture";
// import Transportation from "./pages/Calculator/Transportation";
// import MaterialCost from "./pages/Calculator/MaterialCost";
// import FinalCost from "./pages/Calculator/FinalCost";
// import CalculatorPanel from "./pages/Calculator/CalculatorPanel";
// import { TotalCostProvider } from "./contexts/TotalCostContext";

// function App() {
//   return (
//     <TotalCostProvider>
//       {" "}
//       {/* Wrap everything in TotalCostProvider */}
//       <Router>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/view" element={<ViewFiles />} />
//           <Route path="/upload" element={<Upload />} />
//           <Route path="/admin" element={<AdminPanel />} />
//           <Route path="/adminlogin" element={<AdminLogin />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/dashboard" element={<AdminDashboard />} />
//           <Route path="/form" element={<InquiryForm />} />
//           <Route path="/inquiries" element={<InquiriesPage />} />
//           <Route path="/add-directory" element={<AddDirectory />} />
//           <Route path="/view-directory" element={<ViewDirectory />} />
//           <Route path="/events" element={<UpcomingEvents />} />
//           <Route path="/event" element={<EventDetails />} />
//           <Route path="/home" element={<HomePage />} />
//           <Route path="/inquiries2" element={<HeaderInquiry />} />
//           <Route path="/directory" element={<HeaderDirectory />} />

//           {/* Calculator routes */}
//           <Route path="/Welcome" element={<WelcomePage />} />
//           <Route path="/labour" element={<LabourAndSupervisorCharges />} />
//           <Route path="/lighting" element={<LightingAndElectrician />} />
//           <Route path="/flooring" element={<Flooring />} />
//           <Route path="/furniture" element={<Furniture />} />
//           <Route path="/transportation" element={<Transportation />} />
//           <Route path="/material" element={<MaterialCost />} />
//           <Route path="/final" element={<FinalCost />} />
//           <Route path="/calculator" element={<CalculatorPanel />} />
//         </Routes>
//       </Router>
//     </TotalCostProvider> // This ensures all pages can access the context
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Home/Login";
import ViewFiles from "./pages/upload/ViewFiles";
import Upload from "./pages/upload/upload";
import AdminPanel from "./pages/Admin/AdminPanel";
import AdminLogin from "./pages/Home/AdminLogin";
import Signup from "./pages/Home/Signup";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import InquiryForm from "./pages/Inquiry/InquiryForm";
import InquiriesPage from "./pages/Inquiry/InquiriesPage";
import AddDirectory from "./pages/Directory/AddDirectory";
import ViewDirectory from "./pages/Directory/ViewDirectory";
import UpcomingEvents from "./pages/Event/UpcomingEvents";
import EventDetails from "./pages/Event/EventDetails";
import HomePage from "./pages/Home/HomePage";
import HeaderInquiry from "./pages/Inquiry/HeaderInquiry";
import HeaderDirectory from "./pages/Directory/HeaderDirectory";
import WelcomePage from "./pages/Calculator/WelcomePage";
import LabourAndSupervisorCharges from "./pages/Calculator/LabourAndSupervisorCharges";
import LightingAndElectrician from "./pages/Calculator/LightingAndElectrician";
import Flooring from "./pages/Calculator/Flooring";
import Furniture from "./pages/Calculator/Furniture";
import Transportation from "./pages/Calculator/Transportation";
import MaterialCost from "./pages/Calculator/MaterialCost";
import FinalCost from "./pages/Calculator/FinalCost";
import CalculatorPanel from "./pages/Calculator/CalculatorPanel";
import { TotalCostProvider } from "./contexts/TotalCostContext";

function App() {
  return (
    <Router>
      <Routes>
        {/* Non-calculator routes */}
        <Route path="/" element={<Login />} />
        <Route path="/view" element={<ViewFiles />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/form" element={<InquiryForm />} />
        <Route path="/inquiries" element={<InquiriesPage />} />
        <Route path="/add-directory" element={<AddDirectory />} />
        <Route path="/view-directory" element={<ViewDirectory />} />
        <Route path="/events" element={<UpcomingEvents />} />
        <Route path="/event" element={<EventDetails />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/inquiries2" element={<HeaderInquiry />} />
        <Route path="/directory" element={<HeaderDirectory />} />

        {/* Calculator routes wrapped in TotalCostProvider */}
        <Route
          path="/Welcome"
          element={
            <TotalCostProvider>
              <WelcomePage />
            </TotalCostProvider>
          }
        />
        <Route
          path="/labour"
          element={
            <TotalCostProvider>
              <LabourAndSupervisorCharges />
            </TotalCostProvider>
          }
        />
        <Route
          path="/lighting"
          element={
            <TotalCostProvider>
              <LightingAndElectrician />
            </TotalCostProvider>
          }
        />
        <Route
          path="/flooring"
          element={
            <TotalCostProvider>
              <Flooring />
            </TotalCostProvider>
          }
        />
        <Route
          path="/furniture"
          element={
            <TotalCostProvider>
              <Furniture />
            </TotalCostProvider>
          }
        />
        <Route
          path="/transportation"
          element={
            <TotalCostProvider>
              <Transportation />
            </TotalCostProvider>
          }
        />
        <Route
          path="/material"
          element={
            <TotalCostProvider>
              <MaterialCost />
            </TotalCostProvider>
          }
        />
        <Route
          path="/final"
          element={
            <TotalCostProvider>
              <FinalCost />
            </TotalCostProvider>
          }
        />
        <Route
          path="/calculator"
          element={
            <TotalCostProvider>
              <CalculatorPanel />
            </TotalCostProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
