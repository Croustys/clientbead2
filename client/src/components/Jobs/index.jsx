import React, { memo, useState } from "react";
import { useGetJobsQuery } from "@lib/api";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { getEmploymentType, formatSalary } from "@lib/utils";

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userId, setUserId] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [company, setCompany] = useState("");

  const {
    data: jobsData,
    error,
    isLoading,
  } = useGetJobsQuery({ userId, salaryFrom, company });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching jobs data: {error.message}</div>;
  }

  const filteredJobs = jobsData.data.filter((job) =>
    job.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h1>Böngéssz az állások között:</h1>
      <div>
        <Label htmlFor="search">Search</Label>
        <Input
          type="text"
          id="search"
          name="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={() => setSearchTerm("")}>Törlés</Button>
      </div>
      <div>
        <Input
          type="text"
          placeholder="Felhasználó ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Minimális fizetés"
          value={salaryFrom}
          onChange={(e) => setSalaryFrom(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Cég"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <Button
          onClick={() => {
            setUserId("");
            setSalaryFrom("");
            setCompany("");
          }}
        >
          Törlés
        </Button>
      </div>
      <div>
        <div className="flex justify-between p-5">
          <h2>ÁLLÁS NEVE</h2>
          <h2>KOMPENZÁCIÓ</h2>
        </div>
        <hr />
        {filteredJobs.map((job) => (
          <div key={job.id}>
            <Link to={`/jobs/${job.id}`}>
              <div className="p-5 hover:bg-slate-100 hover:text-black">
                <div className="flex justify-between">
                  <div>
                    <p>{job.position}</p>
                    <p className="text-gray-400">{job.city}</p>
                  </div>
                  <div className="text-right">
                    <p>{formatSalary(job.salaryFrom, job.salaryTo)}</p>
                    <p>{getEmploymentType(job.type)}</p>
                  </div>
                </div>
              </div>
            </Link>
            <hr />
          </div>
        ))}
      </div>
    </>
  );
};

export default memo(Jobs);
