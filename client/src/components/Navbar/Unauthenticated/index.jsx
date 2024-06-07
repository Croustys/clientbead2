import { memo } from "react";
import { Link } from "react-router-dom";

const Unauthenticated = () => {
  return (
    <ul>
      <li>
        <Link to="/jobs">Főoldal</Link>
      </li>
      <li>
        <Link to="/register">Regisztráció</Link>
      </li>
      <li>
        <Link to="/login">Bejelentkezés</Link>
      </li>
    </ul>
  );
};

export default memo(Unauthenticated);
