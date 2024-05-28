import { memo } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.userRole);
  return (
    <div>
      <ul>
        <li>Jobhunter</li>
        <li>Főoldal</li>
        {!isAuthenticated && (
          <>
            <li>Regisztráció</li>
            <li>Bejelentkezés</li>
          </>
        )}
        {isAuthenticated && (
          <>
            <li>Profilom</li>
            <li>Kijelentkezés</li>
            {userRole === "munkavállaló" && <li>Álláshirdetés hozzáadása</li>}
            {userRole === "munkáltató" && <li>Profilom</li>}
          </>
        )}
      </ul>
    </div>
  );
};

export default memo(Navbar);
