import { memo } from "react";
import { Link } from "react-router-dom";

const Unauthenticated = () => {
  return (
    <ul>
      <li>
        <Link to="/jobs">Home</Link>
      </li>
      <li>
        <Link to="/register">Registration</Link>
      </li>
      <li>
        <Link to="/login">Sign in</Link>
      </li>
    </ul>
  );
};

export default memo(Unauthenticated);
