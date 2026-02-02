import React from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "../ui/badge";
import "./JobCards.css";

const JobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="job-card"
    >
      <div className="company-info">
        <h1 className="company-name">{job.name}</h1>
        <p className="company-location">India</p>
      </div>

      <div className="job-details">
        <h2 className="job-title">{job.title}</h2>
        <p className="job-description">{job.description}</p>
      </div>

      <div className="job-badges">
        <Badge className="badge-position" variant="ghost">
          {job.position} Open Positions
        </Badge>
        <Badge className="badge-salary" variant="ghost">
          {job.salary} LPA
        </Badge>
        <Badge className="badge-location" variant="ghost">
          {job.location}
        </Badge>
        <Badge className="badge-type" variant="ghost">
          {job.jobType}
        </Badge>
      </div>
    </div>
  );
};

export default JobCards;
