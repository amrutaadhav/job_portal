import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";

import "./appliedJob.css";

const AppliedJob = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div className="applied-job">
      <Table>
        <TableCaption>Recent Applied Jobs</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="table-right">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="no-data">
                You have not applied any job yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id}>
                <TableCell>
                  {appliedJob?.createdAt.split("T")[0]}
                </TableCell>
                <TableCell>{appliedJob.job?.title}</TableCell>
                <TableCell>{appliedJob.job?.company.name}</TableCell>
                <TableCell className="table-right">
                  <Badge
                    className={`status-badge ${
                      appliedJob?.status === "rejected"
                        ? "rejected"
                        : appliedJob?.status === "accepted"
                        ? "accepted"
                        : "pending"
                    }`}
                  >
                    {appliedJob?.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJob;
