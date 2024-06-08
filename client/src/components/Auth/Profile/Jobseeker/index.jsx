import React, { useState } from "react";
import { memo } from "react";
import { useSelector } from "react-redux";
import {
  useGetUserByIdQuery,
  useGetExperiencesQuery,
  useUpdateExperienceMutation,
} from "@lib/api";
import { useNavigate } from "react-router-dom";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";

const JobseekerProfile = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);
  const {
    data: userData,
    error: userError,
    isLoading: isUserLoading,
  } = useGetUserByIdQuery(userId);
  const {
    data: experiencesData,
    error: experiencesError,
    isLoading: isExperiencesLoading,
  } = useGetExperiencesQuery(undefined, { refetchOnMountOrArgChange: 2 });
  const [updateExperience] = useUpdateExperienceMutation();
  const [editingExperience, setEditingExperience] = useState(null);
  const [experienceForm, setExperienceForm] = useState({
    company: "",
    title: "",
    interval: "",
  });

  if (isUserLoading || isExperiencesLoading) {
    return <div>Loading...</div>;
  }

  if (userError) {
    navigate("/login");
  }

  if (experiencesError) {
    return (
      <div>Error fetching experiences data: {experiencesError.message}</div>
    );
  }

  const userExperiences = experiencesData.data.filter(
    (exp) => exp.userId === userId
  );

  const handleEditClick = (experience) => {
    setEditingExperience(experience.id);
    setExperienceForm({
      company: experience.company,
      title: experience.title,
      interval: experience.interval,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExperienceForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSaveClick = async () => {
    await updateExperience({ id: editingExperience, ...experienceForm });
    setEditingExperience(null);
  };

  return (
    <div className="flex-col">
      <div className="flex justify-between p-5">
        <div>
          <h1>Personal Information</h1>
          <h2>Your details and experiences in one place.</h2>
        </div>
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
      <h3 className="mt-5 mb-2">Previous Experiences</h3>
      <ul>
        {userExperiences.map((exp) => (
          <li key={exp.id} className="mb-4">
            {editingExperience === exp.id ? (
              <div className="p-4 bg-slate-100">
                <Input
                  type="text"
                  name="company"
                  value={experienceForm.company}
                  onChange={handleInputChange}
                  className="mb-2"
                />
                <Input
                  type="text"
                  name="title"
                  value={experienceForm.title}
                  onChange={handleInputChange}
                  className="mb-2"
                />
                <Input
                  type="text"
                  name="interval"
                  value={experienceForm.interval}
                  onChange={handleInputChange}
                  className="mb-2"
                />
                <Button onClick={handleSaveClick}>Save</Button>
              </div>
            ) : (
              <div className="p-4 bg-slate-100 flex justify-between">
                <div>
                  <strong>{exp.title}</strong> at {exp.company} ({exp.interval})
                </div>
                <Button onClick={() => handleEditClick(exp)}>Edit</Button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(JobseekerProfile);
