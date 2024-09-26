import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("https://apis.joonbeauty.com:550/adminLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        console.log("Token:", result.token);
        localStorage.setItem("authToken", result.token);
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
        setTimeout(() => {
          navigate("/product");
        }, 100);
      } else {
        setError(result.message || "Login failed, please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 p-3 lg:p-0">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Admin Login</h2>
        <form className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="username" className="text-gray-700 mb-1">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded-lg p-2 h-10 text-sm"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-700 mb-1">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded-lg p-2 h-10 text-sm"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm mb-4">
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={handleLogin}
            className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg h-10 w-full text-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;