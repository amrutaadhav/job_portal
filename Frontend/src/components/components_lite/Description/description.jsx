import React, { useEffect, useState } from "react";
import "./Description.css";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import { JOB_API_ENDPOINT, APPLICATION_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";

const Description = () => {
  const params = useParams();
  const jobId = params.id;

  const { singleJob } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const [isApplied, setIsApplied] = useState(false);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        dispatch(
          setSingleJob({
            ...singleJob,
            applications: [...singleJob.applications, { applicant: user?._id }],
          })
        );
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJobs = async () => {
      const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
        withCredentials: true,
      });
      if (res.data.status) {
        dispatch(setSingleJob(res.data.job));
        setIsApplied(
          res.data.job.applications.some(
            (application) => application.applicant === user?._id
          )
        );
      }
    };
    fetchSingleJobs();
  }, [jobId, dispatch, user?._id]);

  if (!singleJob) return <div>Loading...</div>;

  return (
    <div className="description-wrapper">
      <div className="description-container">
        <div className="description-header">
          <div>
            <h1 className="job-title">{singleJob.title}</h1>

            <div className="badge-group">
              <Badge className="badge blue">
                {singleJob.position} Open Positions
              </Badge>
              <Badge className="badge orange">{singleJob.salary} LPA</Badge>
              <Badge className="badge purple">{singleJob.location}</Badge>
              <Badge className="badge black">{singleJob.jobType}</Badge>
            </div>
          </div>

          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={isApplied ? "apply-btn disabled" : "apply-btn"}
          >
            {isApplied ? "Already Applied" : "Apply"}
          </Button>
        </div>

        <h1 className="job-description">{singleJob.description}</h1>

        <div className="job-details">
          <p><strong>Role:</strong> {singleJob.position}</p>
          <p><strong>Location:</strong> {singleJob.location}</p>
          <p><strong>Salary:</strong> {singleJob.salary} LPA</p>
          <p><strong>Experience:</strong> {singleJob.experienceLevel} Year</p>
          <p><strong>Total Applicants:</strong> {singleJob.applications.length}</p>
          <p><strong>Job Type:</strong> {singleJob.jobType}</p>
          <p><strong>Post Date:</strong> {singleJob.createdAt.split("T")[0]}</p>
        </div>
      </div>
    </div>
  );
};

export default Description;
