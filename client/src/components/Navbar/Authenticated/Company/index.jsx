import { memo } from "react";
import { Link } from "react-router-dom";

const Company = () => {
  return (
    <ul>
      <li>
        <Link to="/feed">Főoldal</Link>
      </li>
      <li>
        <Link to="/profile">Profilom</Link>
      </li>
      <li>
        <Link to="/jobs/create">Álláshirdetés hozzáadása</Link>
      </li>
      <li>
        <Link to="/logout">Kijelentkezés</Link>
      </li>
    </ul>
  );
};

export default memo(Company);
