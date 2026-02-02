import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../Navbar/navbar";
import Job1 from "../Job1";

import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

import "./browse.css";

const Browse = () => {
  useGetAllJobs();

  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);

  return (
    <div className="browse">
      <Navbar />

      <div className="browse-container">
        <h1 className="browse-title">
          Search Results {allJobs.length}
        </h1>

        <div className="job-grid">
          {allJobs.map((job) => (
            <Job1 key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
