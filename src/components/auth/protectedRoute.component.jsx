import PropTypes from "prop-types";
import { Link, Navigate, useLocation } from "react-router-dom";
import { Button, Result } from "antd";
import { useAuth } from "../../hooks/useAuth";
import { LINKS } from "../../constants/links.constant";

// Without a session only the login can be seen; with the wrong role the page is not shown even typing its URL (#23).
const ProtectedRoute = ({ roles, children }) => {
  const { session, endedReason } = useAuth();
  const location = useLocation();

  if (!session) {
    const reason = endedReason ? `?reason=${endedReason}` : "";
    return <Navigate to={`${LINKS.login.url}${reason}`} replace state={{ from: location.pathname }} />;
  }
  if (roles && !roles.includes(session.role)) {
    return (
      <Result
        status="403"
        title="No tiene permiso para ver esta página"
        subTitle="Esta sección es para otro tipo de usuario."
        extra={
          <Link to="/">
            <Button type="primary">Ir al inicio</Button>
          </Link>
        }
      />
    );
  }
  return children;
};

ProtectedRoute.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,
};

export default ProtectedRoute;
