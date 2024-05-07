import { createBrowserRouter } from "react-router-dom";
import Example from "../components/example/example.component";

const router = createBrowserRouter([
  {
    path: "/example",
    element: <Example />,
  },
]);

export default router;
