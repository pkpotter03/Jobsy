// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Loader from "../../components/Loader";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LoginPage = () => {
  const [role, setRole] = useState("applicant"); // toggle between applicant/recruiter
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Send role along with email & password
      const res = await api.post("/auth/login", { email, password, role });

      // Cookies now have accessToken & refreshToken
      const userRole = res.data.user.role;

      // Redirect based on backend role
      if (userRole === "applicant") navigate("/applicant/dashboard");
      else if (userRole === "recruiter") navigate("/recruiter/dashboard");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Login failed. Please check your network or try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 z-10">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Login
        </h2>

        {/* Role Toggle */}
        <div className="flex justify-center mb-6 border rounded overflow-hidden">
          <button
            className={`flex-1 py-2 font-semibold ${
              role === "applicant"
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600"
            }`}
            onClick={() => setRole("applicant")}
          >
            Applicant
          </button>
          <button
            className={`flex-1 py-2 font-semibold ${
              role === "recruiter"
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600"
            }`}
            onClick={() => setRole("recruiter")}
          >
            Recruiter
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            autocomplete="on"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autocomplete="on"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {loading && <Loader size={80} message="Logging in..." />}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 font-semibold transition"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
