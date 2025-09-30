// src/pages/RecruiterDashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Header from "../../components/Recruiter/Header";
import JobCardRecruiter from "../../components/Recruiter/JobCardRecruiter";

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs/jobslist"); 
      setJobs(res.data.jobs || []);
    } catch (err) {
      console.error("Error fetching recruiter jobs:", err);
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />

      <main className="max-w-6xl mx-auto p-6">
        <h2 className="text-xl font-bold mb-6">Your Posted Jobs</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.length > 0 ? (
            jobs.map((job) => <JobCardRecruiter key={job._id} job={job} />)
          ) : (
            <p className="text-gray-500 col-span-full">
              You haven't posted any jobs yet.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default RecruiterDashboard;
