import React, { useState } from "react";
import { useCreateJobMutation } from "@lib/api";
import CompanyAuthWrapper from "@components/Auth/Authenticated/CompanyAuthWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

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
    }
  };

  return (
    <CompanyAuthWrapper>
      <form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            type="text"
            name="companyName"
            id="companyName"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="positionName">Position Name</Label>
          <Input
            type="text"
            name="positionName"
            id="positionName"
            placeholder="Position Name"
            value={positionName}
            onChange={(e) => setPositionName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Job Description"
            rows="4"
            required
          />
        </div>
        <div>
          <Label htmlFor="salaryFrom">Salary Range (from)</Label>
          <Input
            type="number"
            name="salaryFrom"
            id="salaryFrom"
            placeholder="Salary From"
            value={salaryFrom}
            onChange={(e) => setSalaryFrom(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="salaryTo">Salary Range (to)</Label>
          <Input
            type="number"
            name="salaryTo"
            id="salaryTo"
            placeholder="Salary To"
            value={salaryTo}
            onChange={(e) => setSalaryTo(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="employmentType">Employment Type</Label>
          <Select
            defaultValue={employmentType}
            onValueChange={(t) => setEmploymentType(t)}
          >
            <SelectTrigger
              className="w-[180px]"
              id="employmentType"
              name="employmentType"
            >
              <SelectValue placeholder="Select Employment Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            type="text"
            name="location"
            id="location"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="isRemote">Remote Work Option</Label>
          <Input
            type="checkbox"
            name="isRemote"
            id="isRemote"
            checked={isRemote}
            onChange={(e) => setIsRemote(e.target.checked)}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          Submit
        </Button>
        {isError && <p>Failed to create job. Please try again.</p>}
      </form>
    </CompanyAuthWrapper>
  );
};

export default CreateJobForm;
