import { memo } from "react";
import { Link } from "react-router-dom";

const Jobseeker = () => {
  return (
    <ul>
      <li>
        <Link to="/feed">Főoldal</Link>
      </li>
      <li>
        <Link to="/profile">Profilom</Link>
      </li>
      <li>
        <Link to="/logout">Kijelentkezés</Link>
      </li>
    </ul>
  );
};

export default memo(Jobseeker);
