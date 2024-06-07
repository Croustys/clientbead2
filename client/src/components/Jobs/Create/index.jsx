import React, { useState } from "react";
import { useCreateJobMutation } from "@lib/api";
import CompanyAuthWrapper from "@components/Auth/Authenticated/CompanyAuthWrapper";

const CreateJobForm = () => {
  const [createJob, { isLoading, isError }] = useCreateJobMutation();

  const [companyName, setCompanyName] = useState("");
  const [positionName, setPositionName] = useState("");
  const [description, setDescription] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [employmentType, setEmploymentType] = useState("full-time");
  const [location, setLocation] = useState("");
  const [isRemote, setIsRemote] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createJob({
        company: companyName,
        position: positionName,
        description,
        salaryFrom: parseFloat(salaryFrom),
        salaryTo: parseFloat(salaryTo),
        type: employmentType,
        city: location,
        homeOffice: isRemote,
      });
      console.log("New job created:", data);
    } catch (error) {
      console.error("Error creating job:", error);
      // Hiba kezelése, pl. felhasználó értesítése
    }
  };

  return (
    <CompanyAuthWrapper>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Company Name:</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div>
          <label>Position Name:</label>
          <input
            type="text"
            value={positionName}
            onChange={(e) => setPositionName(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Salary Range (from):</label>
          <input
            type="number"
            value={salaryFrom}
            onChange={(e) => setSalaryFrom(e.target.value)}
          />
        </div>
        <div>
          <label>Salary Range (to):</label>
          <input
            type="number"
            value={salaryTo}
            onChange={(e) => setSalaryTo(e.target.value)}
          />
        </div>
        <div>
          <label>Employment Type:</label>
          <select
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <label>Remote Work Option:</label>
          <input
            type="checkbox"
            checked={isRemote}
            onChange={(e) => setIsRemote(e.target.checked)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </CompanyAuthWrapper>
  );
};

export default CreateJobForm;
