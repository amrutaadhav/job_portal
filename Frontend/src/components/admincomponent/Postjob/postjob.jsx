import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import "./PostJob.css";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="postjob-wrapper">
        <form className="postjob-form" onSubmit={submitHandler}>
          <div className="postjob-grid">
            <div>
              <Label>Title</Label>
              <Input
                name="title"
                value={input.title}
                placeholder="Enter job title"
                onChange={changeEventHandler}
                className="postjob-input"
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                name="description"
                value={input.description}
                placeholder="Enter job description"
                onChange={changeEventHandler}
                className="postjob-input"
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                name="location"
                value={input.location}
                placeholder="Enter job location"
                onChange={changeEventHandler}
                className="postjob-input"
              />
            </div>

            <div>
              <Label>Salary</Label>
              <Input
                type="number"
                name="salary"
                value={input.salary}
                placeholder="Enter job salary"
                onChange={changeEventHandler}
                className="postjob-input"
              />
            </div>

            <div>
              <Label>Position</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                placeholder="Enter job position"
                onChange={changeEventHandler}
                className="postjob-input"
              />
            </div>

            <div>
              <Label>Requirements</Label>
              <Input
                name="requirements"
                value={input.requirements}
                placeholder="Enter job requirements"
                onChange={changeEventHandler}
                className="postjob-input"
              />
            </div>

            <div>
              <Label>Experience</Label>
              <Input
                type="number"
                name="experience"
                value={input.experience}
                placeholder="Enter job experience"
                onChange={changeEventHandler}
                className="postjob-input"
              />
            </div>

            <div>
              <Label>Job Type</Label>
              <Input
                name="jobType"
                value={input.jobType}
                placeholder="Enter job type"
                onChange={changeEventHandler}
                className="postjob-input"
              />
            </div>

            {companies.length > 0 && (
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger className="company-select">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company) => (
                      <SelectItem
                        key={company._id}
                        value={company.name.toLowerCase()}
                      >
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="postjob-btn-wrapper">
            <Button type="submit" className="postjob-btn">
              {loading ? (
                <>
                  <Loader2 className="loader" /> Please wait
                </>
              ) : (
                "Post Job"
              )}
            </Button>
          </div>

          {companies.length === 0 && (
            <p className="warning-text">
              *Please register a company to post jobs.*
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
