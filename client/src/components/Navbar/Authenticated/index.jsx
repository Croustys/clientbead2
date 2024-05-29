import { memo } from "react";
import Jobseeker from "./Jobseeker";
import Company from "./Company";

const Authenticated = ({ role }) => {
  return role === "jobseeker" ? <Jobseeker /> : <Company />;
};

export default memo(Authenticated);
