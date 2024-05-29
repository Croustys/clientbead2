import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@store/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  useEffect(() => {
    dispatch(logout());
    navigator("/");
  }, []);

  return <button>Loggin out...</button>;
};

export default memo(Logout);
