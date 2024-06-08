import React, { useState } from "react";
import { useLoginUserMutation } from "@lib/api";
import { useDispatch } from "react-redux";
import { setAccessToken } from "@store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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
      const userId = resp.user.id;

      dispatch(setAccessToken({ accessToken, userRole, userId }));
      navigator("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="john@doe.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        Login
      </Button>
      {isError && <p>Login failed. Please try again.</p>}
    </form>
  );
};

export default Login;
