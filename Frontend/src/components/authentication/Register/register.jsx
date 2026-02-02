import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import "./Register.css";

const Register = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
    pancard: "",
    adharcard: "",
    file: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const ChangeFilehandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("pancard", input.pancard);
    formData.append("adharcard", input.adharcard);
    formData.append("role", input.role);
    formData.append("phoneNumber", input.phoneNumber);
    if (input.file) formData.append("file", input.file);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      const msg = error.response
        ? error.response.data.message
        : "An unexpected error occurred";
      toast.error(msg);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, []);

  return (
    <div>
      <Navbar />

      <div className="register-container">
        <form className="register-form" onSubmit={submitHandler}>
          <h1 className="register-title">Register</h1>

          <div className="form-group">
            <Label>Fullname</Label>
            <Input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="John Doe"
            />
          </div>

          <div className="form-group">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="johndoe@gmail.com"
            />
          </div>

          <div className="form-group">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="********"
            />
          </div>

          <div className="form-group">
            <Label>PAN Card Number</Label>
            <Input
              type="text"
              name="pancard"
              value={input.pancard}
              onChange={changeEventHandler}
              placeholder="ABCDEF1234G"
            />
          </div>

          <div className="form-group">
            <Label>Adhar Card Number</Label>
            <Input
              type="text"
              name="adharcard"
              value={input.adharcard}
              onChange={changeEventHandler}
              placeholder="123456789012"
            />
          </div>

          <div className="form-group">
            <Label>Phone Number</Label>
            <Input
              type="tel"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="+1234567890"
            />
          </div>

          <RadioGroup className="radio-group">
            <label className="radio-item">
              <input
                type="radio"
                name="role"
                value="Student"
                checked={input.role === "Student"}
                onChange={changeEventHandler}
              />
              Student
            </label>

            <label className="radio-item">
              <input
                type="radio"
                name="role"
                value="Recruiter"
                checked={input.role === "Recruiter"}
                onChange={changeEventHandler}
              />
              Recruiter
            </label>
          </RadioGroup>

          <div className="file-group">
            <Label>Profile Photo</Label>
            <Input type="file" accept="image/*" onChange={ChangeFilehandler} />
          </div>

          {loading ? (
            <div className="loader">Loading...</div>
          ) : (
            <button type="submit" className="register-btn">
              Register
            </button>
          )}

          <p className="login-link">
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
