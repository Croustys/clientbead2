import React, { memo, useState } from "react";
import { useGetJobsQuery } from "@lib/api";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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
      <table>
        <thead>
          <tr>
            <th>ÁLLÁS NEVE</th>
            <th>LEÍRÁS</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobs.map((job) => (
            <tr key={job.id}>
              <td>
                <Link to={`/jobs/${job.id}`}>
                  {job.position}
                  {job.description}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default memo(Jobs);
