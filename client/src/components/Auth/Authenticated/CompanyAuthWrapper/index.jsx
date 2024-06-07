import { memo } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const CompanyAuthWrapper = ({ children }) => {
  const isAuthenticated = useSelector((state) => !!state.auth.isAuthenticated);
  const isCompanyAuthorized = useSelector(
    (state) => state.auth.userRole === "company"
  );

  if (isAuthenticated && isCompanyAuthorized) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default memo(CompanyAuthWrapper);
