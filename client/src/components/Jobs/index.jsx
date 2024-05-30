import React, { memo, useState } from "react";
import { useGetJobsQuery } from "@lib/api";

const Jobs = () => {
  const { data: jobsData, error, isLoading } = useGetJobsQuery();
  const [searchTerm, setSearchTerm] = useState("");

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
              <td>{job.position}</td>
              <td>{job.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default memo(Jobs);
