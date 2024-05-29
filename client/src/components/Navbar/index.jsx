import React, { memo } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.userRole);

  return (
    <div>
      <ul>
        <li>
          <a href="/">Jobhunter</a>
        </li>
        <li>Főoldal</li>
        {!isAuthenticated && (
          <>
            <li>
              <a href="/register">Regisztráció</a>
            </li>
            <li>
              <a href="/login">Bejelentkezés</a>
            </li>
          </>
        )}
        {isAuthenticated && (
          <>
            <li>
              <a href="/profile">Profilom</a>
            </li>
            <li>
              <a href="/logout">Kijelentkezés</a>
            </li>
            {userRole === "employer" && <li>Álláshirdetés hozzáadása</li>}
          </>
        )}
      </ul>
    </div>
  );
};

export default memo(Navbar);
