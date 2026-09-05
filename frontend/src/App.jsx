import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ================= HOME =================
import Home from "./pages/Home/Home";

// ================= PUBLIC =================
import LandRecords from "./pages/LandRecords/LandRecords";
import Login from "./pages/Login/Login";

// ================= CITIZEN =================
import CitizenLogin from "./pages/CitizenLogin/CitizenLogin";

// ================= OFFICIAL =================
import OfficialLogin from "./pages/OfficialLogin/OfficialLogin";
import OfficialDashboard from "./pages/OfficialDashboard/OfficialDashboard";

// ================= ADMIN =================
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AdminLandRecords from "./pages/AdminLandRecords/AdminLandRecords";
import AddLandRecord from "./pages/AddLandRecord/AddLandRecord";
import AdminApplications from "./pages/AdminApplications/AdminApplications";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ================= HOME ================= */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* ================= PUBLIC ================= */}

        <Route
          path="/land-records"
          element={<LandRecords />}
        />

        <Route
          path="/login"
          element={<Login />}
        />


        {/* ================= CITIZEN ================= */}

        <Route
          path="/citizen-login"
          element={<CitizenLogin />}
        />


        {/* ================= OFFICIAL ================= */}

        <Route
          path="/official-login"
          element={<OfficialLogin />}
        />

        <Route
          path="/official-dashboard"
          element={<OfficialDashboard />}
        />


        {/* ================= ADMIN ================= */}

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin-land-records"
          element={<AdminLandRecords />}
        />

        <Route
          path="/admin-land-records/add"
          element={<AddLandRecord />}
        />

        <Route
          path="/admin-applications"
          element={<AdminApplications />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;