import { memo } from "react";
import { Link } from "react-router-dom";

const Company = () => {
  return (
    <ul>
      <li>
        <Link to="/jobs">Home</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
      <li>
        <Link to="/jobs/create">Create Job</Link>
      </li>
      <li>
        <Link to="/logout">Log out</Link>
      </li>
    </ul>
  );
};

export default memo(Company);
