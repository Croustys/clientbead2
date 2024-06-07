import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetJobByIdQuery, useApplyForJobMutation } from "@lib/api";
import Success from "@components/Success";

const Job = () => {
  const { id } = useParams();
  const { data: jobData, error, isLoading } = useGetJobByIdQuery(id);
  const [applyForJob, { isError }] = useApplyForJobMutation();
  const [isSuccess, setIsSuccess] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching job data: {error.message}</div>;
  }

  const handleJobApplication = async () => {
    try {
      await applyForJob({
        jobId: parseInt(id),
      }).unwrap();
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

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
      <button onClick={() => handleJobApplication()}>Apply for job</button>
      {isSuccess && !isError && (
        <Success message="Sikeresen jelentkeztél a munkára!" />
      )}
    </div>
  );
};

export default Job;
