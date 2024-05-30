import React from "react";
import { memo } from "react";
import Authenticated from "../Authenticated";
import { useSelector } from "react-redux";
import { useGetUserByIdQuery, useGetExperiencesQuery } from "@lib/api";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigation = useNavigate();
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

  if (isUserLoading || isExperiencesLoading) {
    return <div>Loading...</div>;
  }

  if (userError) {
    navigation("/login");
  }

  if (experiencesError) {
    return (
      <div>Error fetching experiences data: {experiencesError.message}</div>
    );
  }

  const userExperiences = experiencesData.data.filter(
    (exp) => exp.userId === userId
  );
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
        <p>Previous experiences</p>
        <ul>
          {userExperiences.map((exp) => (
            <li key={exp.id}>
              <strong>{exp.title}</strong> at {exp.company} ({exp.interval})
            </li>
          ))}
        </ul>
      </div>
    </Authenticated>
  );
};

export default memo(Profile);
