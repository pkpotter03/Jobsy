import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const CreateJob = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    experienceRequired: "",
    location: "",
    Company: "",
    salary: "",
    skillsRequired: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        ...form,
        skillsRequired: form.skillsRequired
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill.length > 0),
      };

      await api.post("/jobs/create", payload);
      navigate("/recruiter/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Error creating job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white shadow rounded-lg w-full max-w-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Create a New Job
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            required
          />
          <textarea
            name="description"
            placeholder="Job Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            rows="4"
            required
          />
          <input
            type="text"
            name="experienceRequired"
            placeholder="Experience Required (e.g. 2-3 years)"
            value={form.experienceRequired}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            required
          />
          <input
            type="text"
            name="Company"
            placeholder="Company Name"
            value={form.Company}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            required
          />
          <input
            type="text"
            name="salary"
            placeholder="Salary (e.g. ₹6-8 LPA)"
            value={form.salary}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            required
          />
          <input
            type="text"
            name="skillsRequired"
            placeholder="Skills Required (comma-separated, e.g. React, Node.js)"
            value={form.skillsRequired}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Creating..." : "Create Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
