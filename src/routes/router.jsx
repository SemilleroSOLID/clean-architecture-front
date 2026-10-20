import { Navigate, createBrowserRouter } from "react-router-dom";
import Example from "../components/example/example.component";
import Home from "../components/home";
import { LINKS } from "../constants/links.constant";
import Convocation from "../components/convocation";
import Request from "../components/request";
import RequestAdmin from "../components/requestAdmin";
import StudentRequests from "../components/studentRequests";
import ContentLayout from "../components/layout";
import AuthProvider from "../components/auth/authProvider.component";
import ProtectedRoute from "../components/auth/protectedRoute.component";
import Login from "../components/auth/login";

// Every page but the login needs a session; LINKS says which roles can open each one (#23).
const protect = (element, roles) => <ProtectedRoute roles={roles}>{element}</ProtectedRoute>;

const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <ContentLayout />
      </AuthProvider>
    ),
    children: [
      {
        path: LINKS.login.url,
        element: <Login />,
      },
      {
        path: "/",
        element: protect(<Home />),
      },
      {
        path: LINKS.example.url,
        element: protect(<Example />, LINKS.example.roles),
      },
      {
        path: LINKS.convocation.url,
        element: protect(<Convocation />, LINKS.convocation.roles),
      },
      {
        path: LINKS.request.url,
        element: protect(<Request />, LINKS.request.roles),
      },
      {
        path: LINKS.myRequests.url,
        element: protect(<StudentRequests />, LINKS.myRequests.roles),
      },
      {
        path: LINKS.requestAdmin.url,
        element: protect(<RequestAdmin />, LINKS.requestAdmin.roles),
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

export default router;
