import React, { useState } from "react";
import { useLoginUserMutation } from "@lib/api";
import { useDispatch } from "react-redux";
import { setAccessToken } from "@store/auth/authSlice";
import Navbar from "@components/Navbar";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loginUser, { isLoading, isError }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      const resp = await loginUser({
        email,
        password,
        strategy: "local",
      }).unwrap();

      const accessToken = resp.accessToken;
      const userRole = resp.user.role;

      dispatch(setAccessToken({ accessToken, userRole }));
      navigator("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" disabled={isLoading}>
        Login
      </button>
      {isError && <p>Login failed. Please try again.</p>}
    </form>
  );
};

export default Login;
