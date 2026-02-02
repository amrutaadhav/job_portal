import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useNavigate, Link } from "react-router-dom";
import { RadioGroup } from "../ui/radio-group";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data.js";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import "./Login.css";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error("Login failed");
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

      <div className="login-container">
        <form className="login-form" onSubmit={submitHandler}>
          <h1 className="login-title">Login</h1>

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

          {loading ? (
            <div className="loader">Loading...</div>
          ) : (
            <button type="submit" className="login-btn">
              Login
            </button>
          )}

          <p className="register-text">
            Create new Account
            <Link to="/register">
              <button className="register-btn">Register</button>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
