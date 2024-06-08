import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { getEmploymentType, formatSalary } from "@lib/utils";
import { useSelector } from "react-redux";
import Filter from "./Filter";
import { API_URL } from "@lib/constants";

const Jobs = () => {
  const [search, setSearch] = useState("");
  const filter = useSelector((state) => state.filter);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    const { salaryMin, salaryMax, type, city, homeOffice } = filter;
    const queryParams = new URLSearchParams();

    if (salaryMin) queryParams.append("salaryFrom[$gt]", salaryMin);
    if (salaryMax) queryParams.append("salaryTo[$lt]", salaryMax);
    if (city) queryParams.append("city", city);
    if (type) queryParams.append("type", type);
    if (homeOffice) queryParams.append("homeOffice", homeOffice);
    if (search) queryParams.append("position", search);

    const queryString = queryParams.toString();
    const url = `${API_URL}/jobs${queryString ? `?${queryString}` : ""}`;

    try {
      const resp = await fetch(url);
      const body = await resp.json();
      setJobs(body.data);
    } catch (error) {
      console.error(error);
    }
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
        {jobs?.map((job) => (
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
