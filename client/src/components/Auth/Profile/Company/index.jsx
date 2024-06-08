import { useState } from "react";
import { memo } from "react";
import { useSelector } from "react-redux";
import {
  useGetUserByIdQuery,
  useGetJobsByCompanyQuery,
  useDeleteJobMutation,
  useGetApplicantsByJobIdQuery,
} from "@lib/api";
import { useNavigate } from "react-router-dom";
import { Button } from "@components/ui/button";
import { formatSalary } from "@/lib/utils";

const CompanyProfile = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);
  const {
    data: userData,
    error: userError,
    isLoading: isUserLoading,
  } = useGetUserByIdQuery(userId);
  const {
    data: jobsData,
    error: jobsError,
    isLoading: isJobsLoading,
    refetch: refetchJobsData,
  } = useGetJobsByCompanyQuery(userId);
  const [deleteJob] = useDeleteJobMutation();
  const [selectedJobId, setSelectedJobId] = useState(null);
  const {
    data: applicantsData,
    error: applicantsError,
    isLoading: isApplicantsLoading,
  } = useGetApplicantsByJobIdQuery(selectedJobId, {
    skip: selectedJobId === null,
    refetchOnMountOrArgChange: 0,
  });

  if (isUserLoading || isJobsLoading) {
    return <div>Loading...</div>;
  }

  if (userError) {
    navigate("/login");
  }

  if (jobsError) {
    return <div>Error fetching jobs data: {jobsError.message}</div>;
  }

  const handleDeleteClick = async (jobId) => {
    await deleteJob(jobId);
    refetchJobsData();
  };

  const handleViewClick = (jobId) => {
    setSelectedJobId(jobId);
  };

  return (
    <div className="flex-col">
      <div className="flex justify-between p-5">
        <div>
          <h1>Company Information</h1>
          <h2>Your jobs and applicants in one place.</h2>
        </div>
        <Button onClick={() => navigate("/jobs/create")}>Add Job</Button>
      </div>
      <hr className="mb-5" />
      <div className="flex justify-between p-5 bg-slate-100">
        <p>Name</p>
        <p>{userData.fullname}</p>
      </div>
      <div className="flex justify-between p-5">
        <p>Email</p>
        <p>{userData.email}</p>
      </div>
      <div className="flex justify-between p-5 bg-slate-100">
        <p>Status</p>
        <p>{userData.role}</p>
      </div>
      <h3 className="mt-5 mb-2">Jobs</h3>
      <ul>
        {jobsData.data.map((job) => (
          <li
            key={job.id}
            className="mb-4 p-4 bg-slate-100 flex justify-between items-center"
          >
            <div>
              <strong>{job.position}</strong> at {job.company} ({job.city})
              <p>{job.description}</p>
              <p>{formatSalary(job.salaryFrom, job.salaryTo)}</p>
            </div>
            <div>
              <Button onClick={() => handleViewClick(job.id)}>View</Button>
              <Button
                onClick={() => navigate(`/jobs/${job.id}/edit`)}
                className="ml-2"
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDeleteClick(job.id)}
                className="ml-2"
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {selectedJobId && (
        <div>
          <h3 className="mt-5 mb-2">Applicants for the selected job:</h3>
          {isApplicantsLoading ? (
            <div>Loading applicants...</div>
          ) : applicantsError ? (
            <div>Error fetching applicants: {applicantsError.message}</div>
          ) : (
            <ul>
              {applicantsData?.map((applicant) => (
                <li
                  key={applicant.userId}
                  className="mb-4 p-4 bg-slate-100 flex justify-between items-center"
                >
                  <div>
                    <strong>{applicant.user.fullname}</strong>
                    <p>{applicant.user.email}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(CompanyProfile);
