import React, { useState } from "react";
import { memo } from "react";
import Authenticated from "../Authenticated";
import { useSelector } from "react-redux";
import {
  useGetUserByIdQuery,
  useGetExperiencesQuery,
  useUpdateExperienceMutation,
} from "@lib/api";
import { useNavigate } from "react-router-dom";

const Profile = () => {
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
  } = useGetExperiencesQuery();
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
    <Authenticated>
      <div>
        <h2>Személyes adatok</h2>
        <p>Adataid és tapasztalataid egy helyen.</p>
        <p>
          név <span>{userData.fullname}</span>
        </p>
        <p>
          E-mail <span>{userData.email}</span>
        </p>
        <p>
          Státusz <span>{userData.role}</span>
        </p>
        <h3>Previous experiences</h3>
        <ul>
          {userExperiences.map((exp) => (
            <li key={exp.id}>
              {editingExperience === exp.id ? (
                <div>
                  <input
                    type="text"
                    name="company"
                    value={experienceForm.company}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="title"
                    value={experienceForm.title}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="interval"
                    value={experienceForm.interval}
                    onChange={handleInputChange}
                  />
                  <button onClick={handleSaveClick}>Save</button>
                </div>
              ) : (
                <div>
                  <strong>{exp.title}</strong> at {exp.company} ({exp.interval})
                  <button onClick={() => handleEditClick(exp)}>Edit</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Authenticated>
  );
};

export default memo(Profile);
