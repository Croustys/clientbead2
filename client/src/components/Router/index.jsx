import { memo } from "react";
import { Route } from "react-router-dom";
import { BrowserRouter as Router, Routes } from "react-router-dom";

import App from "../../App.jsx";
import Register from "@components/Auth/Register";
import Login from "@components/Auth/Login";
import Logout from "@components/Auth/Logout";
import Profile from "@components/Auth/Profile";
import Layout from "@components/Layout";

const CustomRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default memo(CustomRouter);
