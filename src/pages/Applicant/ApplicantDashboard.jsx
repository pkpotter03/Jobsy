// src/pages/ApplicantDashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Header from "../../components/Applicant/Header";
import JobCard from "../../components/Applicant/JobCard";

const ApplicantDashboard = () => {
  const [user, setUser] = useState(null); // fetch from local storage
  const [jobs, setJobs] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchExperience, setSearchExperience] = useState("");
  const [error, setError] = useState("");

  const fetchUser = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  };

  const fetchRelevantJobs = async () => {
    try {
      const res = await api.get("/jobs/relevant");
      setJobs(res.data.jobs || res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch relevant jobs.");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");

    // Restrict empty search
    if (!searchTitle && !searchLocation && !searchExperience) {
      setError("Please enter at least one search criteria.");
      return;
    }

    try {
      const query = new URLSearchParams();
      if (searchTitle) query.append("title", searchTitle);
      if (searchLocation) query.append("location", searchLocation);
      if (searchExperience) query.append("skills", searchExperience); // backend expects skills

      const res = await api.get(`/jobs/search?${query.toString()}`);
      setJobs(res.data.jobs || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch jobs. Please try again.");
    }
  };

  useEffect(() => {
    fetchUser();
    fetchRelevantJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />

      <main className="max-w-6xl mx-auto p-6">
        {/* Search Bar */}
        <form className="flex flex-wrap gap-2 mb-6" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Job Title (e.g. Developer)"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Location (e.g. pune)"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Experience (e.g. 2 years)"
            value={searchExperience}
            onChange={(e) => setSearchExperience(e.target.value)}
            className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold transition cursor-pointer"
          >
            Search
          </button>
        </form>

        {/* Error */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Job Listing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.length > 0 ? (
            jobs.map((job) => <JobCard key={job._id} job={job} />)
          ) : (
            <p className="text-gray-500 col-span-full">
              {error ? "" : "No jobs found."}
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ApplicantDashboard;
