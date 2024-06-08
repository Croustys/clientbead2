import { memo } from "react";
import { Route } from "react-router-dom";
import { BrowserRouter as Router, Routes } from "react-router-dom";

import App from "../../App.jsx";
import Register from "@components/Auth/Register";
import Login from "@components/Auth/Login";
import Logout from "@components/Auth/Logout";
import Profile from "@components/Auth/Profile";
import Layout from "@components/Layout";
import Jobs from "@components/Jobs";
import CreateJobForm from "@components/Jobs/Create";
import Job from "@components/Jobs/Job";
import EditJob from "@components/Jobs/Edit";

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
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/create" element={<CreateJobForm />} />
          <Route path="/jobs/:id" element={<Job />} />
          <Route path="/jobs/:id/edit" element={<EditJob />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default memo(CustomRouter);
