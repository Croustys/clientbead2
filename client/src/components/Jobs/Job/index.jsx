import React from "react";
import { useParams } from "react-router-dom";
import { useGetJobByIdQuery } from "@lib/api";

const Job = () => {
  const { id } = useParams();
  const { data: jobData, error, isLoading } = useGetJobByIdQuery(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching job data: {error.message}</div>;
  }

  return (
    <div>
      <h1>
        {jobData.position} at {jobData.company}
      </h1>
      <p>{jobData.description}</p>
      <p>Location: {jobData.city}</p>
      <p>Type: {jobData.type}</p>
      <p>
        Salary: {jobData.salaryFrom} - {jobData.salaryTo}
      </p>
      <p>Home Office: {jobData.homeOffice ? "Yes" : "No"}</p>
    </div>
  );
};

export default Job;
