import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetJobByIdQuery, useApplyForJobMutation } from "@lib/api";
import Success from "@components/Success";
import { Button } from "@components/ui/button";
import { formatSalary, getEmploymentType } from "@/lib/utils";

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
    <div className="flex-col">
      <div className="flex justify-between p-5">
        <div>
          <h1>Company details</h1>
          <h2>Interested? Apply!</h2>
        </div>
        <Button onClick={() => handleJobApplication()}>Apply for job</Button>
      </div>
      <hr className="mb-5" />
      <div className="flex justify-between p-5 bg-slate-100">
        <p>Name</p>
        <p>{jobData.company}</p>
      </div>
      <div className="flex justify-between p-5">
        <p>Position</p>
        <p>{jobData.position}</p>
      </div>
      <div className="flex justify-between p-5 bg-slate-100">
        <p>Description</p>
        <p>{jobData.description}</p>
      </div>
      <div className="flex justify-between p-5">
        <p>Salary</p>
        <p>{formatSalary(jobData.salaryFrom, jobData.salaryTo)}</p>
      </div>
      <div className="flex justify-between p-5 bg-slate-100">
        <p>Employment type</p>
        <p>{getEmploymentType(jobData.type)}</p>
      </div>
      <div className="flex justify-between p-5">
        <p>City</p>
        <p>{jobData.city}</p>
      </div>
      <div className="flex justify-between p-5 bg-slate-100">
        <p>Home Office</p>
        <p>{jobData.homeOffice ? "Yes" : "No"}</p>
      </div>

      {isSuccess && !isError && (
        <Success message="Successfully applied for the job!" />
      )}
    </div>
  );
};

export default Job;
