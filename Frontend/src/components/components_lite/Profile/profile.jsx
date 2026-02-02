import React, { useState } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import AppliedJob from "./AppliedJob";
import EditProfileModal from "./EditProfileModal";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAllAppliedJobs";

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="profile-page">
      <Navbar />

      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-info">
            <Avatar className="profile-avatar">
              <AvatarImage src={user?.profile?.profilePhoto} alt="@profile" />
            </Avatar>
            <div>
              <h1 className="profile-name">{user?.fullname}</h1>
              <p className="profile-bio">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="edit-btn" variant="outline">
            <Pen />
          </Button>
        </div>

        <div className="profile-contact">
          <div className="contact-item">
            <Mail />
            <a href={`mailto:${user?.email}`} className="contact-link">
              {user?.email}
            </a>
          </div>
          <div className="contact-item">
            <Contact />
            <a href={`tel:${user?.phoneNumber}`} className="contact-link">
              {user?.phoneNumber}
            </a>
          </div>
        </div>

        <div className="profile-skills">
          <h1>Skills</h1>
          <div className="skills-list">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>

        <div className="profile-resume">
          <label>Resume</label>
          <div>
            {isResume ? (
              <a
                target="_blank"
                href={user?.profile?.resume}
                className="resume-link"
              >
                Download {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span>No Resume Found</span>
            )}
          </div>
        </div>
      </div>

      <div className="applied-jobs-section">
        <h1>Applied Jobs</h1>
        <AppliedJob />
      </div>

      <EditProfileModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
