import { createBrowserRouter } from "react-router-dom";
import Example from "../components/example/example.component";
import Home from "../components/home";
import { LINKS } from "../constants/links.constant";
import Convocation from "../components/convocation";
import Request from "../components/request";

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
    path: LINKS.example.url,
    element: <Request />,
  },
]);

export default router;
