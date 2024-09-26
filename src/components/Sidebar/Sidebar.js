import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faTags,
  faBox,
  faWarehouse,
  faCog,
  faSignOutAlt,
  faUsers,
  faFileInvoice,
} from "@fortawesome/free-solid-svg-icons";
import '../styles.css'

const Sidebar = ({ setIsLoggedIn, isSidebarOpen, sidebarRef }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav
      ref={sidebarRef}
      className={`bg-gray-800 text-white w-40 h-screen fixed flex flex-col sidebar-container ${isSidebarOpen ? 'open' : ''}`}
    >
      <div className="flex flex-col flex-grow pt-2 px-6">
        <ul className="flex flex-col">
          <li className={`nav-item ${location.pathname === "/dash" ? "bg-gray-700" : ""}`}>
            <Link to="/dash" className="flex items-center p-3 rounded hover:bg-gray-700 transition">
              <FontAwesomeIcon icon={faChartBar} className="mr-2" />
              <span className="ml-2">Dashboard</span>
            </Link>
          </li>
          <li className={`nav-item ${location.pathname === "/brands" ? "bg-gray-700" : ""}`}>
            <Link className="flex items-center p-3 rounded hover:bg-gray-700 transition">
              <FontAwesomeIcon icon={faTags} className="mr-2" />
              <span className="ml-2">Brands</span>
            </Link>
          </li>
          <li className={`nav-item ${location.pathname === "/product" ? "bg-gray-700" : ""}`}>
            <Link to="/product" className="flex items-center p-3 rounded hover:bg-gray-700 transition">
              <FontAwesomeIcon icon={faBox} className="mr-2" />
              <span className="ml-2">Product</span>
            </Link>
          </li>
          <li className={`nav-item ${location.pathname === "/inventory" ? "bg-gray-700" : ""}`}>
            <Link className="flex items-center p-3 rounded hover:bg-gray-700 transition">
              <FontAwesomeIcon icon={faWarehouse} className="mr-2" />
              <span className="ml-2">Inventory</span>
            </Link>
          </li>
          <li className={`nav-item ${location.pathname === "/vendors" ? "bg-gray-700" : ""}`}>
            <Link className="flex items-center p-3 rounded hover:bg-gray-700 transition">
              <FontAwesomeIcon icon={faUsers} className="mr-2" />
              <span className="ml-2">Vendors</span>
            </Link>
          </li>
          <li className={`nav-item ${location.pathname === "/invoices" ? "bg-gray-700" : ""}`}>
            <Link to="/invoices" className="flex items-center p-3 rounded hover:bg-gray-700 transition">
              <FontAwesomeIcon icon={faFileInvoice} className="mr-2" />
              <span className="ml-2">Invoices</span>
            </Link>
          </li>
        </ul>
        <ul className="flex flex-col space-y-2 mt-auto mb-16">
          <li className={`nav-item ${location.pathname === "/settings" ? "bg-gray-700" : ""}`}>
            <Link className="flex items-center p-3 rounded hover:bg-gray-700 transition">
              <FontAwesomeIcon icon={faCog} className="mr-2" />
              <span className="ml-2">Settings</span>
            </Link>
          </li>
          <li className={`nav-item ${location.pathname === "/" ? "bg-gray-700" : ""}`}>
            <Link to="/login" className="flex items-center p-3 rounded hover:bg-gray-700 transition" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              <span className="ml-2">Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;