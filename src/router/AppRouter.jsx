import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "../pages/Landing/LandingPage";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ProtectedRoute from "../pages/Auth/ProtectedRoute";

import ApplicantDashboard from "../pages/Applicant/ApplicantDashboard";
import JobDetails from "../pages/Applicant/JobDetails";
import AppliedJobs from "../pages/Applicant/AppliedJobs";
import ApplicantProfile from "../pages/Applicant/ApplicantProfile";

import RecruiterDashboard from "../pages/Recruiter/RecruiterDashboard";
import CreateJob from "../pages/Recruiter/CreateJob";
import UpdateJob from "../pages/Recruiter/UpdateJob";
import ApplicantsList from "../pages/Recruiter/ApplicantsList";
import RecruiterProfile from "../pages/Recruiter/RecruiterProfile";

const AppRouter = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Applicant Routes */}
          <Route
            path="/applicant/*"
            element={
              <ProtectedRoute allowedRoles={["applicant"]}>
                <Routes>
                  <Route path="dashboard" element={<ApplicantDashboard />} />
                  <Route path="jobs/:id" element={<JobDetails />} />
                  <Route path="applied" element={<AppliedJobs />} />
                  <Route path="profile" element={<ApplicantProfile />} />
                </Routes>
              </ProtectedRoute>
            }
          />

          {/* Recruiter Routes */}
          <Route
            path="/recruiter/*"
            element={
              <ProtectedRoute allowedRoles={["recruiter"]}>
                <Routes>
                  <Route path="dashboard" element={<RecruiterDashboard />} />
                  <Route path="create-job" element={<CreateJob />} />
                  <Route path="update/:jobId" element={<UpdateJob />} />
                  <Route
                    path="applicants/:jobId"
                    element={<ApplicantsList />}
                  />
                  <Route path="profile" element={<RecruiterProfile />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
};
export default AppRouter;
