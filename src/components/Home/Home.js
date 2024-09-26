import React, { useState, useRef, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AdminNavbar from "./Navbar/AdminNavbar";
import Sidebar from "./Sidebar/Sidebar";
import Dashboard from "./Dashboard/Dashboard";
import ProductPage from "./Products/ProductPage";
import Brands from "./Brands/Brands";
import InventoryPage from "./Inventory/InventoryPage";
import Settings from "./Settings/Settings";
import Vendors from "./Vendors/Vendors";
import './styles.css'

const Home = ({ setIsLoggedIn }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="navbar-container">
        <AdminNavbar toggleSidebar={toggleSidebar} buttonRef={buttonRef} />
      </div>
      <div className="main-content flex">
        <Sidebar
          setIsLoggedIn={setIsLoggedIn}
          isSidebarOpen={isSidebarOpen}
          sidebarRef={sidebarRef}
        />
        <div className="content-container1 flex-grow lg:ml-64">
          <Routes>
            <Route path="/dash" element={<Dashboard />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="*" element={<Navigate to="/dash" />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Home;