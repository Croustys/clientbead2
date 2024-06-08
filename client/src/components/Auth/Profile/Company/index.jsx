import { memo } from "react";
import { useSelector } from "react-redux";
import {
  useGetUserByIdQuery,
  useGetJobsByCompanyQuery,
  useDeleteJobMutation,
} from "@lib/api";
import { useNavigate } from "react-router-dom";
import { Button } from "@components/ui/button";

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
  } = useGetJobsByCompanyQuery(userId);
  const [deleteJob] = useDeleteJobMutation();

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
  };

  const handleViewClick = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  const handleAddJobClick = () => {
    navigate("/jobs/create");
  };

  return (
    <div className="flex-col">
      <div className="flex justify-between p-5">
        <div>
          <h1>Personal Information</h1>
          <h2>Your details and experiences in one place.</h2>
        </div>
        <Button onClick={handleAddJobClick}>Add Job</Button>
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
      <h3 className="mt-5 mb-2">Job Listings</h3>
      <ul>
        {jobsData.data.map((job) => (
          <li
            key={job.id}
            className="mb-4 p-4 bg-slate-100 flex justify-between items-center"
          >
            <div>
              <strong>{job.position}</strong> at {job.company} ({job.city})
              <p>{job.description}</p>
              <p>
                {job.salaryFrom} - {job.salaryTo}
              </p>
            </div>
            <div>
              <Button onClick={() => handleViewClick(job.id)}>View</Button>
              <Button onClick={() => handleDeleteClick(job.id)}>Delete</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(CompanyProfile);
