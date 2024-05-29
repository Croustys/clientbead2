import { memo } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Authenticated = ({ children }) => {
  const isAuthenticated = useSelector((state) => !!state.auth.isAuthenticated);

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default memo(Authenticated);
