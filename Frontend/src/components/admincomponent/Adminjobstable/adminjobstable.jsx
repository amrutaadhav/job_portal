import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./adminjobstable.css";

const AdminJobsTable = () => {
  const { companies } = useSelector((store) => store.company);
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const navigate = useNavigate();

  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  useEffect(() => {
    const filteredJobs =
      allAdminJobs.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) return true;

        return (
          job.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            .toLowerCase()
            .includes(searchJobByText.toLowerCase())
        );
      });

    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  if (!companies) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-jobs-table-wrapper">
      <Table>
        <TableCaption>Your recent Posted Jobs</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="table-action-head">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs.length === 0 ? (
            <span className="no-jobs">No Job Added</span>
          ) : (
            filterJobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.createdAt.split("T")[0]}</TableCell>

                <TableCell className="table-action-cell">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="action-icon" />
                    </PopoverTrigger>

                    <PopoverContent className="popover-content">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${job._id}`)
                        }
                        className="popover-item"
                      >
                        <Edit2 className="popover-icon" />
                        <span>Edit</span>
                      </div>

                      <hr />

                      <div
                        onClick={() =>
                          navigate(
                            `/admin/jobs/${job._id}/applicants`
                          )
                        }
                        className="popover-item popover-item-top"
                      >
                        <Eye className="popover-icon" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
