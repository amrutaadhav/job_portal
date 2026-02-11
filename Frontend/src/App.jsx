import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components
import Navbar from "./components/components_lite/Navbar/navbar.jsx";
import Home from "./components/components_lite/Home/home.jsx";
import Jobs from "./components/components_lite/Jobs/jobs.jsx";
import Browse from "./components/components_lite/Browse/browse.jsx";
import Profile from "./components/components_lite/Profile/profile.jsx";
import Description from "./components/components_lite/Description/description.jsx";
import PrivacyPolicy from "./components/components_lite/Privacypolicy/privacypolicy.jsx";
import TermsofService from "./components/components_lite/Termsofservice/termsofservice.jsx";

// Authentication
import Login from "./components/authentication/Login/login.js";
import Register from "./components/authentication/Register/register.js";

// Admin Components
import Companies from "./components/admincomponent/Companies/companies.jsx";
import CompanyCreate from "./components/admincomponent/CompanyCreate/companycreate.jsx";
import CompanySetup from "./components/admincomponent/CompanySetup/companysetup.jsx";
import AdminJobs from "./components/admincomponent/AdminJobs/adminjobs.jsx";
import PostJob from "./components/admincomponent/PostJob/postjob.jsx";
import Applicants from "./components/admincomponent/Applicants/applicants.jsx";
import ProtectedRoute from "./components/admincomponent/ProtectedRoute/protectedroute.jsx";

// Creator
import Creator from "./components/creator/creator.jsx";

const appRouter = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/description/:id", element: <Description /> },
  { path: "/profile", element: <Profile /> },
  { path: "/privacy-policy", element: <PrivacyPolicy /> },
  { path: "/terms-of-service", element: <TermsofService /> },
  { path: "/jobs", element: <Jobs /> },
  { path: "/home", element: <Home /> },
  { path: "/browse", element: <Browse /> },
  { path: "/creator", element: <Creator /> },

  // Admin Routes
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <CompanyCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        <CompanySetup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <AdminJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectedRoute>
        <PostJob />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
