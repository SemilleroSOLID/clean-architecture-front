import { createBrowserRouter } from "react-router-dom";
import Example from "../components/example/example.component";
import Home from "../components/home";
import { links } from "../constants/links.constant";
import Convocation from "../components/convocation";


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
]);

export default router;
