import { createBrowserRouter } from "react-router-dom";
import Example from "../components/example/example.component";
import Home from "../components/home";
import { links } from "../constants/links.constant";
import Convocation from "../components/convocation";
import Request from "../components/request";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: links.example,
    element: <Example />,
  },
  {
    path: links.convocation,
    element: <Convocation />,
  },
  {
    path: links.request,
    element: <Request />,
  },
]);

export default router;
