import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/data";

import "./navbar.css";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `${USER_API_ENDPOINT}/logout`,
        {},
        { withCredentials: true }
      );

      if (res?.data?.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <h1 className="navbar-logo">
          <span className="logo-job">Job</span>
          <span className="logo-portal">Portal</span>
        </h1>

        {/* Right side */}
        <div className="navbar-right">
          <ul className="navbar-links">
            {user?.role === "Recruiter" ? (
              <>
                <li><Link to="/admin/companies">Companies</Link></li>
                <li><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/Home">Home</Link></li>
                <li><Link to="/Browse">Browse</Link></li>
                <li><Link to="/Jobs">Jobs</Link></li>
                <li><Link to="/Creator">About</Link></li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="navbar-auth">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="register-btn">Register</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="avatar">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="popover-box">
                <div className="popover-header">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} />
                  </Avatar>
                  <div>
                    <h3>{user?.fullname}</h3>
                    <p>{user?.profile?.bio}</p>
                  </div>
                </div>

                <div className="popover-actions">
                  {user?.role === "Student" && (
                    <div className="action-item">
                      <User2 />
                      <Link to="/Profile">Profile</Link>
                    </div>
                  )}

                  <div className="action-item" onClick={logoutHandler}>
                    <LogOut />
                    <span>Logout</span>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
