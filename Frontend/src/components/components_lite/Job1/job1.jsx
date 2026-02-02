import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Bookmark } from "lucide-react";
import "./Job1.css";

const Job1 = ({ job }) => {
  const navigate = useNavigate(); 

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="job-card">
      <div className="job-top">
        <p className="job-time">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="bookmark-btn" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="job-company">
        <Button className="company-avatar-btn" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="company-name">{job?.company?.name}</h1>
          <p className="company-location">India</p>
        </div>
      </div>

      <div className="job-details">
        <h1 className="job-title">{job?.title}</h1>
        <p className="job-description">{job?.description}</p>
      </div>

      <div className="job-badges">
        <Badge className="badge-position" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="badge-type" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="badge-salary" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>

      <div className="job-actions">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
        >
          Details
        </Button>
        <Button className="save-btn">Save For Later</Button>
      </div>
    </div>
  );
};

export default Job1;
