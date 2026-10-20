import { createBrowserRouter } from "react-router-dom";
import Example from "../components/example/example.component";
import Home from "../components/home";
import { LINKS } from "../constants/links.constant";
import Convocation from "../components/convocation";
import Request from "../components/request";
import RequestAdmin from "../components/requestAdmin";
import StudentRequests from "../components/studentRequests";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: LINKS.example.url,
    element: <Example />,
  },
  {
    path: LINKS.convocation.url,
    element: <Convocation />,
  },
  {
    path: LINKS.request.url,
    element: <Request />,
  },
  {
    path: LINKS.myRequests.url,
    element: <StudentRequests />,
  },
  {
    path: LINKS.requestAdmin.url,
    element: <RequestAdmin />,
  },
]);

export default router;
