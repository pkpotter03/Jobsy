import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const JobCardRecruiter = ({ job, onDelete }) => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      await api.delete(`/jobs/delete/${job._id}`);
      if (onDelete) onDelete(job._id);
      setShowConfirm(false);
      navigate("/recruiter/dashboard");
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job");
    }
  };

  return (
    <>
      {/* Job Card */}
      <div className="border rounded-lg p-4 shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 relative">
        <h3 className="text-lg font-bold">{job.title}</h3>
        <p className="text-sm text-gray-600">{job.Company}</p>
        <p className="text-sm text-gray-500">{job.location}</p>
        {job.experienceRequired && (
          <p className="text-sm text-gray-500 mt-1">
            Experience: {job.experienceRequired}
          </p>
        )}
        {job.skillsRequired && (
          <div className="flex flex-wrap gap-2 mt-2">
            {job.skillsRequired.map((skill, index) => (
              <span
                key={index}
                className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => navigate(`/recruiter/applicants/${job._id}`)}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer"
          >
            Applicants
          </button>
          <button
            onClick={() => navigate(`/recruiter/update/${job._id}`)}
            className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 cursor-pointer"
          >
            Update
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-700 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Delete Modal Portal */}
      {showConfirm && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={() => setShowConfirm(false)}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Modal box */}
          <div
            className="bg-white p-6 rounded-lg shadow-lg z-50 w-80 relative"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
          >
            <h2 className="text-lg font-semibold">Are you sure?</h2>
            <p className="text-sm text-gray-600 mt-2">
              Do you really want to delete this job? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-700 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobCardRecruiter;
