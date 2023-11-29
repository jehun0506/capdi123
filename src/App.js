import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports.js";
import Notifications from "./pages/Notifications";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/"></Link>
        </nav>
        <Routes>
          {" "}
          <Route path="/" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/notifications" element={<Notifications />} />{" "}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
