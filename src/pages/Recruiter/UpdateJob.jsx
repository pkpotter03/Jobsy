// src/pages/UpdateJob.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import Header from "../../components/Recruiter/Header";

const UpdateJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    experienceRequired: "",
    location: "",
    Company: "",
    salary: "",
    skillsRequired: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch existing job data
  const fetchJob = async () => {
    try {
      const res = await api.get(`/jobs/${jobId}`);
      const job = res.data.job;
      setJobData({
        title: job.title || "",
        description: job.description || "",
        experienceRequired: job.experienceRequired || "",
        location: job.location || "",
        Company: job.Company || "",
        salary: job.salary || "",
        skillsRequired: job.skillsRequired.join(", ") || "",
      });
    } catch (err) {
      console.error("Error fetching job:", err);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [jobId]);

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put(`/jobs/update/${jobId}`, {
        ...jobData,
        skillsRequired: jobData.skillsRequired
          .split(",")
          .map((s) => s.trim()),
      });
      navigate("/recruiter/dashboard"); // Redirect to dashboard
    } catch (err) {
      console.error("Error updating job:", err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={JSON.parse(localStorage.getItem("user"))} />

      <main className="max-w-3xl mx-auto p-6">
        <h2 className="text-xl font-bold mb-6">Update Job</h2>

        <form
          className="flex flex-col gap-4 bg-white p-6 rounded shadow"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={jobData.title}
            onChange={handleChange}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            name="description"
            placeholder="Job Description"
            value={jobData.description}
            onChange={handleChange}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="experienceRequired"
            placeholder="Experience Required"
            value={jobData.experienceRequired}
            onChange={handleChange}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={jobData.location}
            onChange={handleChange}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="Company"
            placeholder="Company Name"
            value={jobData.Company}
            onChange={handleChange}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="salary"
            placeholder="Salary"
            value={jobData.salary}
            onChange={handleChange}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="skillsRequired"
            placeholder="Skills (comma separated)"
            value={jobData.skillsRequired}
            onChange={handleChange}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 text-white cursor-pointer rounded font-semibold transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Updating..." : "Update Job"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default UpdateJob;
