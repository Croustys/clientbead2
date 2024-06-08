import { memo, useState } from "react";
import { useGetJobsQuery } from "@lib/api";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { getEmploymentType, formatSalary } from "@lib/utils";
import { useSelector } from "react-redux";
import Filter from "./Filter";

const Jobs = () => {
  const [search, setSearch] = useState("");
  const { data: jobsData, error, isLoading } = useGetJobsQuery();
  const filter = useSelector((state) => state.filter);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching jobs data: {error.message}</div>;
  }

  const filteredJobs = jobsData.data;

  const handleSearch = async () => {
    console.log(filter);
  };

  return (
    <>
      <h1>Browse jobs:</h1>
      <div>
        <div>
          <Label htmlFor="search">Search</Label>
          <Input
            type="text"
            id="search"
            name="search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex justify-end pt-2">
          <div className="pr-5">
            <Filter />
          </div>
          <Button onClick={handleSearch}>Search</Button>
        </div>
      </div>
      <div>
        <div className="flex justify-between p-5">
          <h2>JOB NAME</h2>
          <h2>COMPENSATION</h2>
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
