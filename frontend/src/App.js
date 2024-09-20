// React Imports
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

// Routing Imports
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Style Imports
import "./App.css";
import Dashboard from "./pages/Dashboard";
import { isAuthenticated } from "./utils/auth";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard with nested routes */}
          <Route
            path="/dashboard"
            element={
              isAuthenticated() ? (
                <Dashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
