import { memo } from "react";
import { useSelector } from "react-redux";
import Authenticated from "./Authenticated";
import Unauthenticated from "./Unauthenticated";

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.userRole);

  return (
    <nav>
      {isAuthenticated ? <Authenticated role={role} /> : <Unauthenticated />}
    </nav>
  );
};

export default memo(Navbar);
