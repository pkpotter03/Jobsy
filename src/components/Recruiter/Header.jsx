// src/components/Applicant/Header.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../../assets/icon.png";

const Header = ({ user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // clear cookies or tokens if needed
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow flex justify-between items-center px-6 py-4">
      <div className="flex flex-row justify-center items-center gap-2">
        <img src={icon} alt="Jobsy Logo" className="h-16 w-16" />
        <div className="text-5xl font-bold text-blue-600 pb-2">Jobsy</div>
      </div>

      <div className="flex flex-row justify-center items-center gap-4">
        <div className="text-xl font-semibold ">
          <button
            className="cursor-pointer px-3 py-2 bg-blue-600 text-white rounded "
            onClick={() => navigate("/recruiter/create-job")}
          >
            create job
          </button>
        </div>
        <div className="relative">
          <div
            className="w-10 h-10 rounded-full bg-blue-600 text-white text-2xl flex items-center justify-center font-bold cursor-pointer pb-1 m-0"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded border">
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate("/recruiter/dashboard")}
              >
                Dashboard
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate("/recruiter/profile")}
              >
                Profile
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500 "
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
