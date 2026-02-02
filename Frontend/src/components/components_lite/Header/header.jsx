import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

import "./header.css";

const Header = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchjobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="header">
      <div className="header-content">
        <span className="header-badge">
          <span className="badge-icon">
            <PiBuildingOfficeBold />
          </span>
          No.1 Job Hunt Website
        </span>

        <h2 className="header-title">
          Search Apply & <br />
          Get Your <span className="highlight">Dream Job</span>
        </h2>

        <p className="header-desc">
          Start your hunt for the best, life-changing career opportunities
          from here in your <br />
          selected areas conveniently and get hired quickly.
        </p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Find Your Dream Job"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button onClick={searchjobHandler} className="search-btn">
            <Search />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
