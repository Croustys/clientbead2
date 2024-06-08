import { memo } from "react";
import { Link } from "react-router-dom";

const Jobseeker = () => {
  return (
    <ul>
      <li>
        <Link to="/jobs">Home</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
      <li>
        <Link to="/logout">Log out</Link>
      </li>
    </ul>
  );
};

export default memo(Jobseeker);
