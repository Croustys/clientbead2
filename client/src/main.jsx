import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import "./index.css";

import App from "./App.jsx";
import Register from "@components/Auth/Register";
import Login from "@components/Auth/Login";
import Logout from "@components/Auth/Logout";
import Profile from "@components/Auth/Profile";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
];

const router = createBrowserRouter(routes);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
