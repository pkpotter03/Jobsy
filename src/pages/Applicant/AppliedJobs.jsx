// src/pages/AppliedJobs.jsx
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Header from "../../components/Applicant/Header";
import AppliedJobCard from "../../components/Applicant/AppliedJobCard";

const AppliedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);

  const fetchAppliedJobs = async () => {
    try {
      const res = await api.get("/jobs/applied");
      // res.data.jobs already includes status
      setJobs(res.data.jobs || []);
    } catch (err) {
      console.error("Error fetching applied jobs:", err);
    }
  };

  const fetchUser = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  };


  useEffect(() => {
    fetchUser();
    fetchAppliedJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />

      <main className="max-w-6xl mx-auto p-6">
        <h2 className="text-xl font-bold mb-6">Applied Jobs</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.length > 0 ? (
            jobs.map((job) => <AppliedJobCard key={job._id} id={job.job._id} status={job.status} />)
          ) : (
            <p className="text-gray-500 col-span-full">
              You haven't applied for any jobs yet.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default AppliedJobs;
