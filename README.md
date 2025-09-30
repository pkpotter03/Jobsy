# Jobsy Frontend

**Jobsy** is the frontend React application for the Jobsy platform, a job portal that allows users to register, apply for jobs, and manage job postings. It works with the **Jobsy-Backend** API. The frontend is built with **React.js**, **Vite**, **Tailwind CSS**, and supports modern web development practices like protected routes and API integration.

---

## Table of Contents
- [Folder Structure](#folder-structure)
- [Features](#features)
- [Installation](#installation)
- [Pages & Components](#pages--components)
- [API Integration](#api-integration)
- [Routing](#routing)
- [Deployment](#deployment)
- [License](#license)

---

## Folder Structure
```bash
Jobsy/
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── public/
│   └── favicon.png
├── README.md
├── src/
│   ├── App.jsx
│   ├── assets/
│   │   ├── avatar1.png
│   │   ├── avatar2.png
│   │   ├── hero-illustration.svg
│   │   ├── icon.png
│   │   └── loader.json
│   ├── components/
│   │   ├── Applicant/
│   │   │   ├── AppliedJobCard.jsx
│   │   │   ├── Header.jsx
│   │   │   └── JobCard.jsx
│   │   ├── Auth/
│   │   │   └── ResumeUpload.jsx
│   │   ├── Loader.jsx
│   │   └── Recruiter/
│   │       ├── Header.jsx
│   │       └── JobCardRecruiter.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── pages/
│   │   ├── Applicant/
│   │   │   ├── ApplicantDashboard.jsx
│   │   │   ├── ApplicantProfile.jsx
│   │   │   ├── AppliedJobs.jsx
│   │   │   └── JobDetails.jsx
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── Register.jsx
│   │   ├── Landing/
│   │   │   └── LandingPage.jsx
│   │   └── Recruiter/
│   │       ├── ApplicantsList.jsx
│   │       ├── CreateJob.jsx
│   │       ├── RecruiterDashboard.jsx
│   │       ├── RecruiterProfile.jsx
│   │       └── UpdateJob.jsx
│   ├── router/
│   │   └── AppRouter.jsx
│   └── services/
│       └── api.js
├── vercel.json
└── vite.config.js
```

---

## Features

- **User Authentication**: Register, login, and protected routes.
- **Applicant Features**:
  - View dashboard, job details, applied jobs
  - Update profile, upload resumes
- **Recruiter Features**:
  - Create, update, and manage jobs
  - View applicants, shortlist candidates
- **Reusable Components**: Header, Job Cards, Loader animations
- **API Integration**: Axios-based service connecting to Jobsy-Backend
- **Responsive Design**: Mobile-friendly UI using Tailwind CSS
- **Routing**: Protected routes and dynamic routing via React Router

---

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/pkpotter03/Jobsy.git
cd Jobsy
```
2. **Install dependencies**
```bash
npm install
```
3. **Set up environment variables**

Create a `.env` file in the root (optional) if you want to override API base URL:
```bash
VITE_API_URL=
```
4. **Run the development server**
```bash
npm run dev
```
Frontend runs on `http://localhost:5173` (Vite default port).

---
## Pages & Components
### Landing Page

- `LandingPage.jsx` - Public landing page for users and recruiters

### Authentication

- `Login.jsx, Register.jsx` - Forms for login and signup

- `ProtectedRoute.jsx` - Route guard for private pages

- `ResumeUpload.jsx` - Component to upload resumes

### Applicant

- `ApplicantDashboard.jsx` - Applicant home page

- `ApplicantProfile.jsx` - View & update profile

- `AppliedJobs.jsx` - List of jobs applied to

- `JobDetails.jsx` - Detailed job view

- `AppliedJobCard.jsx`, JobCard.jsx - Job cards for listings

### Recruiter

- `RecruiterDashboard.jsx` - Recruiter home page

- `CreateJob.jsx, UpdateJob.jsx` - Job management

- `ApplicantsList.jsx` - View and manage applicants

- `JobCardRecruiter.jsx` - Job card for recruiter view

### Shared Components

- `Header.jsx`(Recruiter & Applicant versions)

- `Loader.jsx` - Loader animations

---
## API Integration

All API calls are handled via Axios in src/services/api.js.
Example usage:
```javascript
import api from '../services/api';

const fetchJobs = async () => {
  try {
    const res = await api.get('/jobs/jobslist');
    console.log(res.data);
  } catch (error) {
    console.error(error);
  }
};
```
- API base URL is set via `VITE_API_URL`

- `withCredentials: true` is enabled to support JWT cookies

---
## Routing

Routes are handled using React Router in `AppRouter.jsx`:

- `/` → Landing page

- `/login, /register` → Auth pages

- `/applicant/dashboard, /applicant/profile, /applicant/applied` → Applicant pages (protected)

- `/recruiter/dashboard, /recruiter/create-job, /recruiter/update-job/:id, /recruiter/applicants` → Recruiter pages (protected)

---
## Deployment

- Frontend can be deployed on Vercel (already configured via `vercel.json`)

- Connect to Jobsy-Backend API for full functionality

- Environment variable `VITE_API_URL` can be set on Vercel dashboard

---
## License

This project is licensed under the MIT License.

---

⭐ If you find this project helpful, give it a star!