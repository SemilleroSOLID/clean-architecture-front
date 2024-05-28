import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import ContentLayout from "./components/layout";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContentLayout>
      <RouterProvider router={router} />
    </ContentLayout>
  </React.StrictMode>
);
