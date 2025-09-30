// src/pages/ApplicantsList.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import Header from "../../components/Recruiter/Header";

const ApplicantsList = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchApplicants = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/jobs/${jobId}/applicants`);
      setJob(res.data);
    } catch (err) {
      console.error("Error fetching applicants:", err);
    }
    setLoading(false);
  };

  const downloadShortlisted = async () => {
    try {
      const response = await api.get(
        `/jobs/${jobId}/shortlisted/export`, // replace with your backend URL
        {
          responseType: "blob", // important for file download
          withCredentials: true, // if your backend uses cookies for auth
        }
      );

      // Create a blob from the response
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Create a link and trigger download
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `shortlisted_${jobId}.xlsx`;
      link.click();
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  const handleStatusChange = async (applicantUserId, newStatus) => {
    try {
      await api.put(`/jobs/${jobId}/applicants/${applicantUserId}`, {
        status: newStatus,
      });
      // Update local state
      setJob((prev) => ({
        ...prev,
        applicants: prev.applicants.map((app) =>
          app.user._id === applicantUserId ? { ...app, status: newStatus } : app
        ),
      }));
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (!job) return <p className="text-center mt-6">No applicants found.</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={JSON.parse(localStorage.getItem("user"))} />

      <main className="max-w-6xl mx-auto p-6">
        <h2 className="text-xl font-bold mb-6">Applicants for "{job.title}"</h2>

        {job.applicants.length === 0 ? (
          <p className="text-gray-500">No applicants have applied yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {job.applicants.map((app) => (
              <div
                key={app.user._id}
                className="border rounded-lg p-4 shadow-sm hover:shadow-lg transition flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold">{app.user.name}</h3>
                  <p className="text-sm text-gray-600">{app.user.email}</p>
                  {app.user.skills && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {app.user.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                  {app.user.resume && (
                    <p className="mt-2">
                      <a
                        href={app.user.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View Resume
                      </a>
                    </p>
                  )}
                </div>

                <div className="mt-4">
                  <p
                    className={`mb-2 font-semibold ${
                      app.status === "applied"
                        ? "text-blue-600"
                        : app.status === "shortlisted"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    Status:{" "}
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </p>
                  <div className="flex gap-2">
                    {["applied", "shortlisted", "rejected"].map((status) => (
                      <button
                        key={status}
                        disabled={app.status === status}
                        onClick={() => handleStatusChange(app.user._id, status)}
                        className={`px-3 py-1 rounded text-white text-sm font-semibold transition ${
                          status === "applied"
                            ? "bg-blue-600 hover:bg-blue-700"
                            : status === "shortlisted"
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-red-600 hover:bg-red-700"
                        } ${
                          app.status === status
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {job.applicants.length > 0 && (
          <div className="mt-6">
            <button onClick={downloadShortlisted} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
              Download Shortlisted Applicants
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ApplicantsList;
