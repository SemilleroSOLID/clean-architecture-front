import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { setupAxios } from "./config/axios.config";

// The token goes in every request and a 401 sends the user back to the login (#23).
setupAxios();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
