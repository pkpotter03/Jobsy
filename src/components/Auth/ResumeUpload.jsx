import React, { useState, useRef } from "react";

const ResumeUpload = ({ resume, setResume }) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleFiles = (files) => {
    if (files && files[0] && files[0].type === "application/pdf") {
      setResume(files[0]);
    } else {
      alert("Please upload a PDF file only.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-full flex flex-col items-center px-4 py-6 border-2 border-dashed rounded-lg cursor-pointer transition ${
          dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-100"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        {resume ? (
          <p className="text-gray-700 font-medium">{resume.name}</p>
        ) : (
          <>
            <svg
              className="w-10 h-10 mb-2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="text-gray-500 text-center">
              Drag & drop your resume here, or click to upload (PDF only)
            </span>
          </>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {resume && (
        <button
          type="button"
          className="mt-2 text-sm text-red-500 hover:underline"
          onClick={() => setResume(null)}
        >
          Remove file
        </button>
      )}
    </div>
  );
};

export default ResumeUpload;
