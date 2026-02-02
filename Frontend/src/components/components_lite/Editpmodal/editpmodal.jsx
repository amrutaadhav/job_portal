import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data";
import { setUser } from "@/redux/authSlice";
import "./EditProfileModal.css";

const EditProfileModal = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.join(", "), // convert array to string
    file: user?.profile?.resume,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const FileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_ENDPOINT}/profile/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser({ ...res.data.user, skills: input.skills.split(",").map(s => s.trim()) }));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Edit Profile</h2>
          <button className="close-btn" onClick={() => setOpen(false)}>×</button>
        </div>

        <form className="modal-body" onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" name="fullname" value={input.fullname} onChange={changeEventHandler} />
          </label>
          <label>
            Email
            <input type="email" name="email" value={input.email} onChange={changeEventHandler} />
          </label>
          <label>
            Phone
            <input type="tel" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} />
          </label>
          <label>
            Bio
            <input type="text" name="bio" value={input.bio} onChange={changeEventHandler} />
          </label>
          <label>
            Skills (comma separated)
            <input type="text" name="skills" value={input.skills} onChange={changeEventHandler} />
          </label>
          <label>
            Resume (PDF)
            <input type="file" name="file" accept="application/pdf" onChange={FileChangeHandler} />
          </label>

          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? "Please wait..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
