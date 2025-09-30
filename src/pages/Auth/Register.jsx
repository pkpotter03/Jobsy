// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Loader from "../../components/Loader";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import ResumeUpload from "../../components/Auth/ResumeUpload";

const RegisterPage = () => {
  const [role, setRole] = useState("applicant"); // applicant or recruiter
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [skills, setSkills] = useState(""); // comma-separated for applicant
  const [resume, setResume] = useState(null); // file upload
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Password match validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);
      if (role === "applicant") {
        formData.append("skills", skills);
        if (resume) formData.append("resume", resume);
      }

      const res = await api.post("/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const userRole = res.data.user.role;
      if (userRole === "applicant") navigate("/applicant/dashboard");
      else if (userRole === "recruiter") navigate("/recruiter/dashboard");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError(
          "Registration failed. Please check your network or try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600">
      {loading && <Loader size={80} message="Registering..." />}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 z-10">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Register
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

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
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

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </div>
          </div>

          {/* Skills & Resume (only for applicant) */}
          {role === "applicant" && (
            <>
              <input
                type="text"
                placeholder="Skills (comma separated)"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ResumeUpload resume={resume} setResume={setResume} />
            </>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 font-semibold transition"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
