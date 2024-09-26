import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const AdminNavbar = ({ toggleSidebar, buttonRef }) => {
  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      window.deferredPrompt = event;
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const installPWA = () => {
    if (window.deferredPrompt) {
      window.deferredPrompt.prompt();
      window.deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          localStorage.setItem("installpreference", "installed");
        } else {
          localStorage.setItem("installpreference", "false");
        }
        window.deferredPrompt = null;
      });
    }
  };

  return (
    <nav className="bg-gray-800 px-6 py-4 flex items-center justify-between shadow-md">
      <Link className="text-white lg:text-2xl font-semibold" to="/dash">
        Admin Portal
      </Link>
      <div className="flex items-center space-x-4">
        <button
          className="text-white bg-teal-400 px-3 py-2 lg:px-3 lg:py-2 lg:text-sm rounded-md text-xs sm:text-sm hover:bg-blue-500"
          onClick={installPWA}
        >
          {/* <FontAwesomeIcon icon={faDownload} className="mr-2" /> */}
          Install App
        </button>
        <span className="text-white">Admin</span>
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <FontAwesomeIcon icon={faUser} className="text-gray-800 text-lg" />
        </div>
        <button ref={buttonRef} onClick={toggleSidebar} className="text-white lg:hidden">
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;