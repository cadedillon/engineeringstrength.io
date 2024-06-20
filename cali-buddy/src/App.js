// React Imports
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Routing Imports
import Home from "./pages/Home";

// Style Imports
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
