// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Upload from "./pages/upload.jsx";
import ViewFiles from "./pages/ViewFiles.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import InquiryForm from "./pages/InquiryForm.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/view" element={<ViewFiles />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/adminlogin" element={<AdminLogin />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/form" element={<InquiryForm />} />
      </Routes>
    </Router>
  );
}

export default App;
