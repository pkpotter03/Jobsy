// src/pages/Applicant/ApplicantProfile.jsx
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Loader from "../../components/Loader";
import Header from "../../components/Applicant/Header";

const RecruiterProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch user from localStorage
  const fetchUser = async () => {
    try {
      setLoading(true);
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
      setName(storedUser.name);
      setEmail(storedUser.email);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);

      const res = await api.put("/users/profile-update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUser(res.data.user); // update local user
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setSuccess(res.data.message || "Profile updated successfully!");
      setEditMode(false);;
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) setError(err.response.data.message);
      else setError("Failed to update profile. Try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Loader size={80} message="Loading profile..." />;
  if (!user) return <p className="text-center mt-10">User not found.</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow mt-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Profile</h1>
          <button
            onClick={() => setEditMode(!editMode)}
            className={`px-4 py-2 ${
              editMode ? "bg-red-600" : "bg-blue-600"
            } text-white rounded ${
              editMode ? "hover:bg-red-700" : "hover:bg-blue-700"
            } transition cursor-pointer`}
          >
            {editMode ? "Cancel" : "Edit"}
          </button>
        </div>

        {success && <p className="text-green-600 mb-2">{success}</p>}
        {error && <p className="text-red-500 mb-2">{error}</p>}

        {!editMode ? (
          <>
            <div className="w-20 h-20 rounded-full bg-blue-600 text-white text-5xl flex items-center justify-center font-bold pb-2 mb-4 justify-self-center">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="mb-4">
              <h2 className="font-semibold">Full Name:</h2>
              <p className="text-gray-700">{user.name}</p>
            </div>

            <div className="mb-4">
              <h2 className="font-semibold">Email:</h2>
              <p className="text-gray-700">{user.email}</p>
            </div>
          </>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              disabled={updating}
              className={`w-full py-3 rounded cursor-pointer text-white font-semibold transition ${
                updating
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {updating ? "Updating..." : "Update Profile"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RecruiterProfile;
