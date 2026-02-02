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
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";

// Admin Components
import Companies from "./components/admincomponent/Companies";
import CompanyCreate from "./components/admincomponent/CompanyCreate";
import CompanySetup from "./components/admincomponent/CompanySetup";
import AdminJobs from "./components/admincomponent/AdminJobs";
import PostJob from "./components/admincomponent/PostJob";
import Applicants from "./components/admincomponent/Applicants";
import ProtectedRoute from "./components/admincomponent/ProtectedRoute";

// Creator
import Creator from "./components/creator/Creator";

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
