import { memo } from "react";
import { useSelector } from "react-redux";
import Authenticated from "@components/Auth/Authenticated";
import JobseekerProfile from "@components/Auth/Profile/Jobseeker";
import CompanyProfile from "@components/Auth/Profile/Company";
import CompanyAuthWrapper from "../Authenticated/CompanyAuthWrapper";

const Profile = () => {
  const isCompanyAuthorized = useSelector(
    (state) => state.auth.userRole === "company"
  );
  if (isCompanyAuthorized)
    return (
      <CompanyAuthWrapper>
        <CompanyProfile />
      </CompanyAuthWrapper>
    );

  return (
    <Authenticated>
      <JobseekerProfile />
    </Authenticated>
  );
};

export default memo(Profile);
