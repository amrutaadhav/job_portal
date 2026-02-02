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
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./companiestable.css";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const navigate = useNavigate();
  const [filterCompany, setFilterCompany] = useState(companies);

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) return true;

        return company.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });

    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  if (!companies) {
    return <div>Loading...</div>;
  }

  return (
    <div className="companies-table-wrapper">
      <Table>
        <TableCaption>Your recent registered Companies</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="table-action-head">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterCompany.length === 0 ? (
            <span className="no-companies">No Companies Added</span>
          ) : (
            filterCompany.map((company) => (
              <TableRow key={company.id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={company.logo || "default-logo-url"}
                      alt={`${company.name} logo`}
                    />
                  </Avatar>
                </TableCell>

                <TableCell>{company.name}</TableCell>

                <TableCell>
                  {company.createdAt.split("T")[0]}
                </TableCell>

                <TableCell className="table-action-cell">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="action-icon" />
                    </PopoverTrigger>

                    <PopoverContent className="popover-content">
                      <div
                        onClick={() =>
                          navigate(
                            `/admin/companies/${company._id}`
                          )
                        }
                        className="popover-item"
                      >
                        <Edit2 className="popover-icon" />
                        <span>Edit</span>
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

export default CompaniesTable;
