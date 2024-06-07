import React, { memo, useState } from "react";
import { useGetJobsQuery } from "@lib/api";
import { Link } from "react-router-dom";

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
        <input
          type="text"
          placeholder="Keresés..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => setSearchTerm("")}>Törlés</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Felhasználó ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="number"
          placeholder="Minimális fizetés"
          value={salaryFrom}
          onChange={(e) => setSalaryFrom(e.target.value)}
        />
        <input
          type="text"
          placeholder="Cég"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <button
          onClick={() => {
            setUserId("");
            setSalaryFrom("");
            setCompany("");
          }}
        >
          Törlés
        </button>
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
