import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";

import useGetAllCompanies from "@/hooks/usegetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companyslice";
import "./companies.css";

const Companies = () => {
  const navigate = useNavigate();

  useGetAllCompanies();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div>
      <Navbar />

      <div className="companies-container">
        <div className="companies-header">
          <Input
            className="companies-input"
            placeholder="Filter by Name"
            onChange={(e) => setInput(e.target.value)}
          />

          <Button onClick={() => navigate("/admin/companies/create")}>
            Add Company
          </Button>
        </div>

        <div className="companies-table">
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;
