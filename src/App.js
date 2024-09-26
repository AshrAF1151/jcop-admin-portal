import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import Home from "./components/Home.js";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn ? "true" : "false");
  }, [isLoggedIn]);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route path="/*" element={<Home setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="*" element={<Navigate to="/product" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;