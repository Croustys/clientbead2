import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetJobByIdQuery, useUpdateJobMutation } from "@lib/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import CompanyAuthWrapper from "@components/Auth/Authenticated/CompanyAuthWrapper";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: jobData,
    error: jobError,
    isLoading: isJobLoading,
    refetch: refetchJobData,
  } = useGetJobByIdQuery(id);
  const [updateJob] = useUpdateJobMutation();
  const [formData, setFormData] = useState({
    position: "",
    company: "",
    city: "",
    description: "",
    salaryFrom: "",
    salaryTo: "",
  });

  useEffect(() => {
    if (jobData) {
      setFormData({
        position: jobData.position,
        company: jobData.company,
        city: jobData.city,
        description: jobData.description,
        salaryFrom: parseInt(jobData.salaryFrom),
        salaryTo: parseInt(jobData.salaryTo),
      });
    }
  }, [jobData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = {
      ...formData,
      salaryFrom: parseInt(formData.salaryFrom),
      salaryTo: parseInt(formData.salaryTo),
    };
    await updateJob({ id, ...updateData });
    refetchJobData();
    navigate("/profile");
  };

  if (isJobLoading) return <div>Loading...</div>;
  if (jobError) return <div>Error fetching job data: {jobError.message}</div>;

  return (
    <CompanyAuthWrapper>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Position</label>
          <Input
            name="position"
            value={formData.position}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Company</label>
          <Input
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>City</label>
          <Input name="city" value={formData.city} onChange={handleChange} />
        </div>
        <div>
          <label>Description</label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Salary From</label>
          <Input
            name="salaryFrom"
            value={formData.salaryFrom}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Salary To</label>
          <Input
            name="salaryTo"
            value={formData.salaryTo}
            onChange={handleChange}
          />
        </div>
        <Button type="submit" className="mt-5">
          Save
        </Button>
      </form>
    </CompanyAuthWrapper>
  );
};

export default EditJob;
