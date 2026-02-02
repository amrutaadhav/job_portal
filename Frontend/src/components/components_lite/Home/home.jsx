import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Navbar from "../Navbar/navbar";
import Header from "../Header/header";
import Categories from "../Categories";
import LatestJobs from "../LatestJobs";
import Footer from "../Footer/footer";

import useGetAllJobs from "@/hooks/useGetAllJobs";

import "./home.css";

const Home = () => {
  const { loading, error } = useGetAllJobs();
  const jobs = useSelector((state) => state.jobs.allJobs);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "Recruiter") {
      navigate("/admin/companies");
    }
  }, []);

  return (
    <div className="home">
      <Navbar />
      <Header />
      <Categories />

      {loading && <p className="status-text">Loading jobs...</p>}
      {error && <p className="status-text error">Error: {error}</p>}
      {!loading && !error && <LatestJobs jobs={jobs} />}

      <Footer />
    </div>
  );
};

export default Home;
