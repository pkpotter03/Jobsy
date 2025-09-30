import { useState, useEffect} from "react";
import api from "../../services/api";

const AppliedJobCard = ({ id, status }) => {
    const [job, setJob] = useState({});
    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await api.get(`/jobs/${id}`);
                setJob(res.data.job || res.data);
            } catch (err) {
                console.error("Error fetching job details:", err);
                setJob({});
            }
        };
        fetchJob();
    }, [id]);

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
      <div>
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

        {/* Status */}
        {status && (
          <p
            className={`mt-3 text-sm font-semibold ${
              status.toLowerCase() === "applied"
                ? "text-blue-600"
                : status.toLowerCase() === "shortlisted"
                ? "text-green-600"
                : status.toLowerCase() === "rejected"
                ? "text-red-600"
                : "text-gray-600"
            }`}
          >
            Status: {status.charAt(0).toUpperCase() + status.slice(1)}
          </p>
        )}
      </div>

      {/* View Job Button */}
      <div className="mt-4">
        <a
          href={`/applicant/jobs/${job._id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold transition cursor-pointer"
        >
          View Job
        </a>
      </div>
    </div>
  );
};

export default AppliedJobCard;
