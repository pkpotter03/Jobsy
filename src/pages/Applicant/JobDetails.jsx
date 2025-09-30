// src/pages/Applicant/JobDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import Loader from "../../components/Loader";
import Header from "../../components/Applicant/Header";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applyLoading, setApplyLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch job details
  const fetchJob = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/jobs/${id}`);
      setJob(res.data.job || res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch job details.");
    } finally {
      setLoading(false);
    }
  };

  // Apply for job
  const handleApply = async () => {
    try {
      setApplyLoading(true);
      setError("");
      setSuccess("");

      const res = await api.post(`/jobs/${id}/apply`);
      setSuccess(res.data.message || "Applied successfully!");
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to apply. Please try again.");
      }
    } finally {
      setApplyLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  if (loading) return <Loader size={80} message="Loading job details..." />;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!job) return <p className="text-center mt-10">Job not found.</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={JSON.parse(localStorage.getItem("user"))} />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-6">
        <h1 className="text-4xl font-bold mb-2">{job.title}</h1>
        <p className="text-xl text-gray-600 mb-2">{job.Company}</p>
        <p className="text-lg text-gray-500 mb-2">Location: {job.location}</p>
        {job.experienceRequired && (
          <p className="text-lg text-gray-500 mb-2">
            Experience Required: {job.experienceRequired}
          </p>
        )}
        {job.salary && (
          <p className="text-lg text-gray-500 mb-2">Salary: {job.salary}</p>
        )}
        {job.skillsRequired && job.skillsRequired.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold mb-3 text-xl">Required Skills:</h3>
            <div className="flex flex-wrap gap-2">
              {job.skillsRequired.map((skill, index) => (
                <span
                  key={index}
                  className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        {job.description && (
          <div className="mb-4">
            <h3 className="font-semibold mb-3 text-xl">Job Description:</h3>
            <p className="text-gray-700 text-lg">{job.description}</p>
          </div>
        )}

        {/* Feedback Messages */}
        {success && <p className="text-green-600 mb-2">{success}</p>}
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <div className="mt-4">
          <button
            onClick={handleApply}
            disabled={applyLoading}
            className={`px-4 py-2 text-white rounded font-semibold transition ${
              applyLoading || success
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } cursor-pointer`}
          >
            {applyLoading ? "Applying..." : "Apply Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
