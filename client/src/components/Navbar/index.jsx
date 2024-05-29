import { memo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.userRole);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Jobhunter</Link>
        </li>
        <li>Főoldal</li>
        {!isAuthenticated && (
          <>
            <li>
              <Link to="/register">Regisztráció </Link>
            </li>
            <li>
              <Link to="/login">Bejelentkezés</Link>
            </li>
          </>
        )}
        {isAuthenticated && (
          <>
            <li>
              <Link to="/profile">Profilom</Link>
            </li>
            <li>
              <Link to="/logout">Kijelentkezés</Link>
            </li>
            {userRole === "employer" && <li>Álláshirdetés hozzáadása</li>}
          </>
        )}
      </ul>
    </nav>
  );
};

export default memo(Navbar);
