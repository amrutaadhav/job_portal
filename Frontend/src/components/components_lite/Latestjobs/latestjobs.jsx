import React from "react";
import JobCards from "./JobCards";
import { useSelector } from "react-redux";
import "./LatestJobs.css";

const LatestJobs = () => {
  const allJobs = useSelector((state) => state.jobs?.allJobs || []);

  return (
    <div className="latest-jobs-container">
      <h2 className="latest-jobs-title">
        <span className="highlight">Latest & Top </span>Job Openings
      </h2>

      <div className="latest-jobs-grid">
        {allJobs.length === 0 ? (
          <span>No Job Available</span>
        ) : (
          allJobs
            .slice(0, 6)
            .map((job) =>
              job?._id ? (
                <JobCards key={job._id} job={job}></JobCards>
              ) : (
                <span key={Math.random()}>Invalid Job Data</span>
              )
            )
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
